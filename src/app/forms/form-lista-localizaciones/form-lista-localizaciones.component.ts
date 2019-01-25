import { Component, OnInit, Inject, Input, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Direccion } from 'src/app/classes/direccion';
import { LocalizacionService } from 'src/app/services/api/localizacion.service';
import { EmpresaService } from 'src/app/services/api/empresa.service';
import { HomeComponent } from 'src/app/home/home.component';
import { MatSnackBar } from '@angular/material';
import { Localizacion } from 'src/app/classes/localizacion';
import { Empresa } from 'src/app/classes/empresa';

@Component({
  selector: 'beatForm-localizaciones',
  templateUrl: './form-lista-localizaciones.component.html',
  styleUrls: ['./form-lista-localizaciones.component.scss']
})

export class FormListaLocalizacionesComponent implements OnInit {

  @Input() showToolbar: boolean = true;
  @Input() localizaciones;

  @Input()
  set empresa(empresa: Empresa) {
    if (empresa) {
      this._empresa = empresa;
      console.log('FormListaLocalizacionesComponent ', empresa);
    
    }
  }

  get empresa(): Empresa {
    return this._empresa;
  }

  private _empresa: Empresa;
  cargando: boolean = false;

  tipoLocalizacion = null;
  public localizacionForm: FormGroup;
  private localizacion_id = null;

  direccion: Direccion;
  form_localizacion_titulo = '';
  mostrarErrores = false;
  loading: boolean;
  paginar: boolean;
  itemspag: number;
  opcionesItems = [10, 25, 50, 100];
  rutaImgs: string;
  noImg: string;
  sinDatos: string;
  display = false;
  paleta_colores = [];
  color_localizacion: string;
  router: any;

  private fabRef;
  private storedScroll: number = 0;
  private threshold: number = 10;

  constructor(
    @Inject(HomeComponent) private parent: HomeComponent,
    private localizacionesSvc: LocalizacionService,
    private empresasSvc: EmpresaService,
    private snackBar: MatSnackBar,
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  onClick() {
    alert(this._empresa);
  }

  ngOnInit() {
    this.localizacionesSvc.getColoresLocalizacion().subscribe(
      data => {
        const colores = Object.keys(data);
        for (const i of colores) {
          this.paleta_colores.push({
            label: i,
            value: data[i]
          });
        }
      },
      err => {
        this.mensajeSnackBar('Ha ocurrido un error al cargar la lista de colores.', 'Error');
      }
    );
    this.localizacionForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      color: new FormControl('', Validators.required),
      telefono: new FormControl(''),
      imagen: new FormControl('')
    });

    //TODO REHACER 
    /* this.parent.confirmDialog = function (conf: boolean) {
      if (conf) {
        // TODO: Esto hay que buscar otra forma de hacerlo
        $('#confirm-bajalocalizacion').trigger('click');
      }
    }; */
  }

  ngAfterViewInit() {

    console.log('showtoolbar ', this.showToolbar);

    this.fabRef = this.element.nativeElement.querySelectorAll("ion-fab")[0];
    if (this.fabRef) {
      this.renderer.setStyle(this.fabRef, 'bottom', this.showToolbar == true ? '80px' : '130px');
      this.renderer.setStyle(this.fabRef, 'webkitTransition', 'transform 500ms,top 500ms');
    }
  }


  showDialog(_localizacion: Localizacion) {
    if (_localizacion) {
      this.form_localizacion_titulo = 'Edición';
      this.editarLocalizacion(_localizacion);
    } else {
      this.form_localizacion_titulo = 'Alta';
      this.localizacionForm.reset();
      this.localizacion_id = null;
      this.direccion = null;
    }
    this.display = true;
  }

  editarLocalizacion(_localizacion: Localizacion): void {
    this.tipoLocalizacion = _localizacion[0].getTipo();
    this.direccion = _localizacion[0].getDireccion();
    this.localizacion_id = _localizacion[0].getId();
    this.localizacionForm.patchValue({
      nombre: _localizacion[0].getNombre(),
      email: _localizacion[0].getEmail(),
      color: _localizacion[0].getColor(),
      telefono: _localizacion[0].getTelefono(),
      imagen: _localizacion[0].getImagen(),
      tipo: _localizacion[0].getTipo()
    });
    this.color_localizacion = _localizacion[0].getColor();
  }

  cargaLocalizaciones() {
    console.log('cargaLocalizaciones', this.empresa);
    this.empresasSvc.getLocalizaciones(this.empresa).subscribe(
      datos => {
        this.localizaciones = [];
        if (datos.data && datos.data.length > 0) {
          datos.data.forEach(loc => {
            this.localizaciones.push(new Localizacion(loc));
          });
        }
      },
      err => {
        console.log(' error get cliente ', err);
        this.mensajeSnackBar('Ha ocurrido un error al intentar cargar los clientes. Si persiste contacte con el administrador.', 'Error');
      }
    );
  }

  creaLocalizacion() {
    this.localizacionesSvc
      .altaLocalizacion(this.localizacionForm.value)
      .subscribe(data => {
        this.mensajeSnackBar('Localización creada con éxito.', ' Éxito');
        // TODO recargar lista
      });
  }

  guardarLocalizacion() {

    // Validamos el formulario
    if (this.localizacionForm.invalid) {
      this.mensajeSnackBar('Hay errores en el formulario que debe corregir.', 'Error');
      this.mostrarErrores = true;
      return;
    }
    this.mostrarErrores = false;

    if (this.localizacion_id) {
      // editar localizacion
      this.localizacionForm.addControl(
        'tipo',
        new FormControl(this.tipoLocalizacion)
      );
      this.localizacionForm.patchValue({
        tipo: this.tipoLocalizacion
      });
      this.localizacionesSvc
        .editaLocalizacion(this.localizacion_id, this.localizacionForm.value)
        .subscribe(
          data => {
            this.mensajeSnackBar('Localización editada creado con éxito.', 'Éxito');
            this.tipoLocalizacion = null;
            this.display = false;
            // TODO necesito id de la empresa con la que estoy trabajando
            this.cargaLocalizaciones();
          },
          error => {
            this.mensajeSnackBar('Ha ocurrido un error al intentar editar la localización. Si persiste contacte con el administrador.', 'Error');
          }
        );
    } else {
      console.log('creando localizacion');
      // alta localizacion
      // TODO Alta localización
      this.display = false;
      this.cargaLocalizaciones();
    }
  }

  baja(_localizacion: Localizacion) {
    this.localizacion_id = _localizacion[0].getId();

    /*  this.parent.toastSvc.dialog(
       'Baja de Localización',
       '¿Está seguro de querer dar de baja la localización?'
     ); */
  }

  bajaConfirmada() {
    //TODO bloquear pantalla

    this.localizacionesSvc.bajaLocalizacion(this.localizacion_id).subscribe(
      data => {

        this.mensajeSnackBar('La localización ha sido dada de baja correctamente.', 'Éxito');
        this.cargaLocalizaciones();
      },
      err => {
        this.mensajeSnackBar('Ha ocurrido un error al intentar dar de baja la localización. Si persiste contacte con el administrador.', 'Error');

      }
    );
  }

  /**
   * Cuando el subform es inicializado, lo asociamos al formulario principal (cliente form)
   *
   * @param name Nombre del campo del formulario
   * @param form El formulario construido por inyección
   */
  formDireccionInicializado(name: string, form: FormGroup) {
    this.localizacionForm.setControl(name, form);
  }

  mensajeSnackBar(mensaje: string, estado: string) {

    let snackBarRef = this.snackBar.open(
      estado + '. ' + mensaje,
      'Aceptar',
      { verticalPosition: 'top' });

    snackBarRef.afterDismissed().subscribe(info => {
      if (info.dismissedByAction === true) {
        //todo hacer cosas   
        this.cargando = false;
      }
    }
    );
  }

  /**
* Animación botón crear cliente cuando hacemos scroll
* @param event 
*/
  scrolling(event: any) {

    if (event.detail.scrollTop - this.storedScroll > this.threshold) {
      console.log("Scrolling down");
      this.renderer.setStyle(this.fabRef, 'bottom', this.showToolbar == true ? '80px' : '130px');
      this.renderer.setStyle(this.fabRef, 'webkitTransform', 'scale3d(0,0,0)');
    } else if (event.detail.scrollTop - this.storedScroll < 0) {
      console.log("Scrolling up");
      this.renderer.setStyle(this.fabRef, 'bottom', this.showToolbar == true ? '80px' : '130px');
      this.renderer.setStyle(this.fabRef, 'webkitTransform', 'scale3d(1,1,1)');
    }

    this.storedScroll = event.detail.scrollTop;
  }
}

