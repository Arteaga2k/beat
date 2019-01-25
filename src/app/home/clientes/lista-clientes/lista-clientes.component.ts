import { Component, OnInit, ViewChild, ElementRef, Renderer, Renderer2 } from '@angular/core';
import { EmpresaService } from 'src/app/services/api/empresa.service';
import { Empresa } from 'src/app/classes/empresa';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { NavController, IonFab, IonFabButton } from '@ionic/angular';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit {


  cargando: boolean = false;
  clientes: Empresa[] = [];
  displayedColumns: string[] = ['nombre', 'cif', 'email', 'tipo'];
  dataSource = null;
  modoBusqueda = false;
  textoBusqueda: string;

  private fabRef;
  private storedScroll: number = 0;
  private threshold: number = 10;


  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private empresaSvc: EmpresaService,
    private router: Router,
    private navCtrl: NavController,
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.actualizarListaClientes();

  }

  ngAfterViewInit() {

    this.fabRef = this.element.nativeElement.querySelectorAll("ion-fab")[0];
    this.renderer.setStyle(this.fabRef, 'webkitTransition', 'transform 500ms,top 500ms');
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

  actualizarListaClientes() {

    this.cargando = true;

    this.empresaSvc.getClientes().subscribe(
      data => {
        this.clientes = [];
        if (data.clientes) {
          for (const c of data.clientes) {
            /* for (let index = 0; index < 500; index++) {
              this.clientes.push(new Empresa(c));              
            } */
            this.clientes.push(new Empresa(c));
          }
        }

        console.log('data', this.clientes);
        this.dataSource = new MatTableDataSource<Empresa>(this.clientes);
        this.dataSource.sort = this.sort;
        this.cargando = false;
      },
      err => {
        alert('error' + err);

      }
    );
  }


  clienteSeleccionado(cliente) {
    console.log('fila seleccionada', cliente);
    //this.router.navigate(['/gestion/clientes/editar/'+ cliente.getId() ]);  
    this.router.navigate(['/gestion/clientes/editar/' + cliente.getId()]);

    
  }

  limpiaBusqueda() {
    this.dataSource.filter = this.textoBusqueda.trim().toLowerCase();
  }

  cancelarBusqueda() {
    this.modoBusqueda = !this.modoBusqueda;
    this.dataSource.filter = "";

  }

  abrirBusqueda() {
    this.modoBusqueda = !this.modoBusqueda;
  }

  inputBusqueda() {
    this.dataSource.filter = this.textoBusqueda.trim().toLowerCase();
  }

}
