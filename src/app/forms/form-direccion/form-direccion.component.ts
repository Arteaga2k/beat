import { Component, OnInit, Inject, EventEmitter, Output, Input, } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/classes/customValidators';
import { TipoVia } from 'src/app/classes/tipoVia';
import { HomeComponent } from 'src/app/home/home.component';
import { Direccion } from 'src/app/classes/direccion';
import { LocalizacionService } from 'src/app/services/api/localizacion.service';
import { DireccionService } from 'src/app/services/api/direccion.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'beatForm-direccion',
  templateUrl: './form-direccion.component.html',
  styleUrls: ['./form-direccion.component.scss']
})
export class FormDireccionComponent implements OnInit {
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() mostrarErrores: boolean;
  @Input() conTipoLocalizacion: boolean;

  private _tipoLocalizacion: number;
  @Input()
  get tipoLocalizacion(): number {
    return this._tipoLocalizacion;
  }

  @Output() tipoLocalizacionChange = new EventEmitter<number>();
  set tipoLocalizacion(tipoLocalizacion: number) {
    this._tipoLocalizacion = tipoLocalizacion;
    this.tipoLocalizacionChange.emit(this._tipoLocalizacion);
  }

  @Input() set direccion(direccion: Direccion) {
    if (direccion) {
      // Rellenamos los datos del formulario
      this._direccion = direccion;
      this.municipio_sin_poner = this._direccion.getMunicipioId();
      this.direccionForm.patchValue({
        tipo_via_id: this._direccion.getTipoVia(),
        nombre_via: this._direccion.getNombreVia(),
        numero: this._direccion.getNumero(),
        escalera: this._direccion.getEscalera(),
        piso: this._direccion.getPiso(),
        codigo_postal: this._direccion.getCodigoPostal(),
        provincia_id: this._direccion.getProvinciaId(),
        observaciones: this._direccion.getObservaciones()
      });
    }
    this.obtenerMunicipios();
  }

  get direccion(): Direccion {
    return this._direccion;
  }

  private _direccion: Direccion;
  private municipio_sin_poner: number = null;

  private cargando: boolean = false;
  public direccionForm: FormGroup;
  //cargando_municipios = false;
  tipos_localizacion = [];
  provincias = [];
  municipios = [];
  tipos_via: Array<TipoVia> = [];

  constructor(
    private localizacionSvc: LocalizacionService,
    private direccionSvc: DireccionService,
   // @Inject(HomeComponent) private parent: HomeComponent
  ) {
    this.crearFormulario();
  }

  ngOnInit() {
    this.cargando = true;


    this.direccionSvc.getDatosDireccionForm()
      .subscribe(res => {
        console.log('res ', res);
        this.tipos_via = res[0];

        this.provincias = [];
        for (const provincia of res[1]) {
          this.provincias.push({
            value: provincia.getId(),
            label: provincia.getNombre()
          });
        }
        this.cargando = false;       
      });

    // Cargamos los tipos de localización existentes
    if (this.conTipoLocalizacion) {
      this.localizacionSvc
        .getTiposLocalizacion()
        .subscribe(data => {
          this.tipos_localizacion = data;
          this.direccionForm.get('tipo_localizacion').setValue(this._tipoLocalizacion);
        });
    }

    /* // Cargamos los tipos de vía existentes
    this.direccionSvc.getTiposVia()
      .subscribe(data => {
        this.tipos_via = data;
      });

    // Cargamos las provincias
    this.direccionSvc.getProvincias()
      .subscribe(data => {
        this.provincias = [];
        for (const provincia of data) {
          this.provincias.push({
            value: provincia.getId(),
            label: provincia.getNombre()
          });
        }
      }); */

    // Creamos el formulario
    this.crearFormulario();

    // Indicamos al padre que ya tenemos el formulario montado
    this.formReady.emit(this.direccionForm); 
  }



  crearFormulario() {
    this.direccionForm = new FormGroup({
      tipo_via_id: new FormControl(
        this._direccion ? this._direccion.getTipoVia() : '',
        Validators.required
      ),
      nombre_via: new FormControl(
        this._direccion ? this._direccion.getNombreVia() : '',
        Validators.required
      ),
      numero: new FormControl(
        this._direccion ? this._direccion.getNumero() : '',
        [Validators.required, Validators.maxLength(20)]
      ),
      escalera: new FormControl(
        this._direccion ? this._direccion.getEscalera() : '',
        Validators.maxLength(20)
      ),
      piso: new FormControl(
        this._direccion ? this._direccion.getPiso() : '',
        Validators.maxLength(20)
      ),
      codigo_postal: new FormControl(
        this._direccion ? this._direccion.getCodigoPostal() : '',
        [Validators.required, CustomValidator.codigoPostalValidator]
      ),
      provincia_id: new FormControl(
        this._direccion ? this._direccion.getProvinciaId() : ''
      ),
      municipio_id: new FormControl(
        this._direccion ? this._direccion.getMunicipioId() : '',
        Validators.required
      ),
      observaciones: new FormControl(
        this._direccion ? this._direccion.getObservaciones() : ''
      )
    });

    if (this.conTipoLocalizacion) {
      this.direccionForm.addControl('tipo_localizacion', new FormControl('', [Validators.required]));
    }
    //this.cargando = false;
  }

  obtenerMunicipios() {
    let id_provincia = null;
    try {
      id_provincia = this.direccionForm.get('provincia_id').value;
      console.log(' provincia id es ', id_provincia);
      if (id_provincia == null) {
        id_provincia = this.provincias[0].value;
      }
    } catch (err) {
      return;
    }
    this.municipios = [];
    if (!isNaN(id_provincia)) {
      //this.cargando_municipios = true;
      this.direccionSvc.getMunicipios(id_provincia)
        .subscribe(
          data => {
            this.municipios = [];
            for (const municipio of data) {
              this.municipios.push({
                value: municipio.getId(),
                label: municipio.getNombre()
              });
            }
            //this.cargando_municipios = false;
            if (this.municipio_sin_poner) {
              this.direccionForm.patchValue({
                municipio_id: this._direccion.getMunicipioId(),
              });
              this.municipio_sin_poner = null;
            }
          },
          err => {
            //this.cargando_municipios = false;
          }
        );
    }
  }

  comprobarCP(municipios: any) {
    let cpostales_input;
    try {
      cpostales_input = this.direccionForm.get('codigo_postal');
    } catch (err) {
      return;
    }
    let cpostales_municipio = municipios.options[municipios.selectedIndex].dataset.cp;
    if (
      typeof cpostales_municipio !== 'undefined' &&
      cpostales_municipio.length > 0 &&
      (cpostales_input.value.length === 0 || isNaN(cpostales_input.value))
    ) {
      cpostales_municipio = cpostales_municipio.split(',');
      cpostales_input.setValue(cpostales_municipio[0]);
    }
  }
}
