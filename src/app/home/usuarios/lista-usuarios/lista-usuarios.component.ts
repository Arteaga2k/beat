import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/api/usuarios.service';
import { PermisosService } from 'src/app/services/api/permisos.service';
import { BaseComponent } from 'src/app/comun/base/base.component';
import { PERMISOS } from 'src/app/comun/constantes';
import { MatSnackBar, MatTableDataSource, MatSort } from '@angular/material';
import { Usuario } from 'src/app/classes/usuario';
import { PopoverController } from '@ionic/angular';


import { UsuariosPopoverComponent } from '../../../forms/usuarios-popover/usuarios-popover.component';

@Component({
  selector: 'beatApp-listausuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuarios_filtrado: Usuario[] = [];
  filtro_field: string = 'nombre';
  filtro_orden: string = 'ascendente';


  // displayedColumns: string[] = ['nombre', 'email', 'cargo', 'activo'];
  verInactivos: string;
  cargando: boolean = false;
  dataSource = null;
  modoBusqueda = false;
  textoBusqueda: string;

  private fabRef;
  private storedScroll: number = 0;
  private threshold: number = 10;
  displayedColumns = [];
  columnNames = [{
    id: "nombre",
    value: "nombre"

  }, {
    id: "email",
    value: "email"
  },
  {
    id: "cargo",
    value: "cargo"
  },
  {
    id: "activo",
    value: "activo"
  }];


  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private usuariosSvc: UsuariosService,
    private router: Router,
    private snackBar: MatSnackBar,
    protected permisosSvc: PermisosService,
    private element: ElementRef,
    private renderer: Renderer2,
    public popoverCtrl: PopoverController

  ) {
    //  super(permisosSvc);
  }

  ngOnInit() {
    this.displayedColumns = this.columnNames.map(x => x.id);
    // Lo primero será completar el array de permisos requeridos (obligatorios)
    // para este componente. Este array se hereda del componente base
    //   this.permisosRequeridos.push(PERMISOS.USUARIOS_VER);

    this.cargando = true;
    this.cargaListaUsuarios();

    // Luego comprobamos que tenemos permisos para este componente, con una función heredada
    /* if (!this.hasPermisos()) {
      // TODO: habrá que guardar los intentos de acceder a zonas que no se tienen permisos?   
      // Mostramos un mensaje de error
      setTimeout(() => {

        let snackBarRef = this.snackBar.open(
          'ACCESO NO PERMITIDO. No tienes permisos para acceder a esa zona.', 'Aceptar',
          { verticalPosition: 'top' });

        snackBarRef.afterDismissed().subscribe(info => {
          if (info.dismissedByAction === true) {
            //todo hacer cosas al clickear el botón aceptar
            // Navegamos a lista usuarios
            this.router.navigate(['/']);
          }
        }
        );
      });

    } else {
      this.cargando = true;
      this.actualizarListaUsuarios();
    } */
  }

  filtrarListaUsuarios() {
    if (this.textoBusqueda) {
      console.log('textobusqueda', this.textoBusqueda);

      this.usuarios_filtrado = this.usuarios.filter(x =>
        (x.getNombre().trim().toLowerCase().indexOf(this.textoBusqueda.trim().toLowerCase()) != -1) ||
        (x.getEmail().trim().toLowerCase().indexOf(this.textoBusqueda.trim().toLowerCase()) != -1)
      );
    }

    this.ordenaListaUsuarios();
    console.log('lista filtrada ', this.usuarios_filtrado);
  }



  cargaListaUsuarios() {
    this.usuariosSvc
      .listaUsuarios(this.verInactivos === 'si')
      .subscribe(
        data => {
          this.usuarios = [];
          if (data.data) {
            for (const u of data.data) {
              this.usuarios.push(new Usuario(u));
            }
          }
          console.log('usuarios ', this.usuarios);
          this.usuarios_filtrado = this.usuarios;
          this.cargando = false;
        },
        err => {
          this.cargando = false;
          // Mostramos un mensaje de error
          let snackBarRef = this.snackBar.open(
            'Error.  Ha ocurrido un error al intentar cargar los usuarios. Si persiste contacte con el administrador.',
            'Aceptar',
            { verticalPosition: 'top' });
        }
      );
  }

  usuarioSeleccionado(usuario) {

  }

  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      componentProps: { orden: this.filtro_orden, field: this.filtro_field },
      animated: true,
      cssClass: 'popover-usuarios',
      translucent: true,
      component: UsuariosPopoverComponent,
      event: ev
    });

    popover.onDidDismiss()
      .then((result) => {

        this.usuarios_filtrado = this.usuarios;

        console.log(result);

        if (result['data']) {
          this.filtro_field = result['data'];
        }

        if (result['role'] != 'backdrop') {
          this.filtro_orden = result['role'];
        }


        console.log(' filtro orden ', this.filtro_orden);
        this.filtrarListaUsuarios();
        //actualizar lista filtrando   
      });

    return await popover.present();

  }

  /**
 * Animación botón crear cliente cuando hacemos scroll
 * @param event 
 */
  scrolling(event: any) {

    if (event.detail.scrollTop - this.storedScroll > this.threshold) {
      //console.log("Scrolling down");
      this.renderer.setStyle(this.fabRef, 'bottom', '80px');
      this.renderer.setStyle(this.fabRef, 'webkitTransform', 'scale3d(0,0,0)');
    } else if (event.detail.scrollTop - this.storedScroll < 0) {
      //console.log("Scrolling up");
      this.renderer.setStyle(this.fabRef, 'bottom', '0');
      this.renderer.setStyle(this.fabRef, 'webkitTransform', 'scale3d(1,1,1)');
    }

    this.storedScroll = event.detail.scrollTop;
  }

  limpiaBusqueda() {
    this.usuarios_filtrado = this.usuarios;
  }

  cancelarBusqueda() {
    this.modoBusqueda = !this.modoBusqueda;
  }

  abrirBusqueda() {
    this.modoBusqueda = !this.modoBusqueda;
  }

  inputBusqueda() {
    this.filtrarListaUsuarios();
  }

  ordenaListaUsuarios() {

    console.log('ordenaListaUsuarios field', this.filtro_field);
    console.log('ordenaListaUsuarios filtro_orden', this.filtro_orden);


    if (this.filtro_orden == 'ascendente') {

      if (this.filtro_field == 'nombre') {
        console.log('asc nombre');
        this.usuarios_filtrado.sort(this.compareNombreAsc);
      }
      if (this.filtro_field == 'email') {
        console.log('asc email');
        this.usuarios_filtrado.sort(this.compareEmailAsc);
      }

    } else {
      if (this.filtro_field == 'nombre') {
        console.log('desc nombre');
        this.usuarios_filtrado.sort(this.compareNombreDesc);
      }
      if (this.filtro_field == 'email') {
        console.log('desc email');
        this.usuarios_filtrado.sort(this.compareEmailDesc);
      }
    }
  }

  compareEmailAsc(a, b) {
    if (a.getNombre() < b.getNombre())
      return -1;
    if (a.getNombre() > b.getNombre())
      return 1;
    return 0;
  }

  compareEmailDesc(a, b) {
    if (a.getNombre() < b.getNombre())
      return 1;
    if (a.getNombre() > b.getNombre())
      return -1;
    return 0;

  }
  compareNombreAsc(a, b) {

    if (a.getNombre() < b.getNombre())
      return -1;
    if (a.getNombre() > b.getNombre())
      return 1;
    return 0;
  }

  compareNombreDesc(a, b) {

    if (a.getNombre() < b.getNombre())
      return 1;
    if (a.getNombre() > b.getNombre())
      return -1;
    return 0;
  }

}
