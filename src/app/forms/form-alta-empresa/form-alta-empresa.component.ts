import { Component, OnInit, Inject, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

import { HomeComponent } from '../../home/home.component';

import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/classes/customValidators';
import { Empresa } from 'src/app/classes/empresa';
import { Direccion } from 'src/app/classes/direccion';
import { Localizacion } from 'src/app/classes/localizacion';
import { EmpresaService } from 'src/app/services/api/empresa.service';
import { MatSnackBar } from '@angular/material';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'beatForm-alta-empresa',
  templateUrl: './form-alta-empresa.component.html',
  styleUrls: ['./form-alta-empresa.component.scss']
})
export class FormAltaEmpresaComponent implements OnInit {

  @Input() rol_empresa: string;
  @Input() redireccion: string;

  empresaLocalizaciones: Array<Localizacion>;

  @Input() set empresa(empresa: Empresa) {
    if (empresa) {
      this.modoEdicion = true;
      this.empresaLocalizaciones = empresa.getLocalizaciones();
      this.direccion = empresa.getDireccion();
      this.empresaForm.patchValue({
        nombre: empresa.getNombre(),
        email: empresa.getEmail(),
        cif: empresa.getCif(),
        fax: empresa.getFax(),
        telefono: empresa.getTelefono()
      });
    }
  }

  localizaciones = [];
  direccion: Direccion = null;
  modoEdicion = false;
  asociarUsuario = false;
  mostrarErrores = false; 
  empresaForm: FormGroup;
  contactos: FormArray;
  tipo_empresa: String = '';

  constructor(
    private empresasSvc: EmpresaService,
    private router: Router,
    @Inject(HomeComponent) private parent: HomeComponent,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // Bloqueamos el formulario
    //todo bloquear pantalla y mostrar cargando datos

    // Diseñamos el formulario
    this.empresaForm = new FormGroup({
      rol: new FormControl(this.rol_empresa),
      tipo: new FormControl(this.tipo_empresa),
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      cif: new FormControl('', [
        Validators.required,
        CustomValidator.cifNifValidator
      ]),
      codigo: new FormControl('', Validators.maxLength(30)),
      fax: new FormControl(''),
      telefono: new FormControl('', Validators.required),
      direccion: new FormGroup({}),
      usuario: new FormGroup({
        clave: new FormControl('')
      }),
      contactos: new FormArray([this.createContacto()])
    });

    // Obtenemos el tipo de empresa según el rol
    this.empresasSvc
      .getTipoEmpresa(this.rol_empresa)
      .subscribe(
        data => {
          this.tipo_empresa = data;
          this.empresaForm.patchValue({
            tipo: this.tipo_empresa
          });
          //todo parar pantalla cargando

        },
        err => {
          //todo parar pantalla cargando 
          //
          let snackBarRef = this.snackBar.open(
            'Error. Ha ocurrido un error en el alta de clientes.. Si persiste contacte con el administrador.',
            'Aceptar',
            { verticalPosition: 'top' }
          );

          snackBarRef.afterDismissed().subscribe(info => {
            if (info.dismissedByAction === true) {
              //todo hacer cosas   
              this.router.navigate(['/gestion']); 
            }
          });         
        }
      );

    this.estadoAsociarUsuario(false);
  }

  /**
   * Cuando el subform es inicializado, lo asociamos al formulario principal (cliente form)
   *
   * @param name Nombre del campo del formulario
   * @param form El formulario construido por inyección
   */
  formDireccionInicializado(name: string, form: FormGroup) {
    this.empresaForm.setControl(name, form);
  }

  get contactoForms() {
    return this.empresaForm.get('contactos') as FormArray;
  }

  createContacto(): FormGroup {
    return new FormGroup({
      nombre: new FormControl(''),
      telefono: new FormControl(''),
      cargo: new FormControl(''),
      email: new FormControl()
    });
  }

  addContacto() {
    const contacto = new FormGroup({
      nombre: new FormControl(''),
      telefono: new FormControl(''),
      cargo: new FormControl(''),
      email: new FormControl()
    });
    this.contactoForms.push(contacto);
  }

  deleteContacto(index: number) {
    const control = <FormArray>this.contactoForms;
    control.removeAt(index);
  }

  contactoTieneDatos(index: number) {
    const item = this.contactoForms.at(index);
    if (
      item.get('nombre').value ||
      item.get('telefono').value ||
      item.get('cargo').value ||
      item.get('email').value
    ) {
      return true;
    }
    return false;
  }

  guardarEmpresa() {
    console.log('formulario ' + JSON.stringify(this.empresaForm.value));
    
    // Validamos el formulario
    if (this.empresaForm.invalid) {
      this.snackBar.open('Error!. Hay errores en el formulario que debe corregir.');     
      this.mostrarErrores = true;
      return;
    }
    this.mostrarErrores = false;
    console.log(this.empresaForm.value);
    //arrancar pantalla cargando
    //this.parent.blockUI.start();

    // controlamos si estamos editando o dando de alta una nueva empresa
    if (this.empresa) {
      //todo descomentar
      //this.editarEmpresa();
    } else {
     // this.altaEmpresa();
    }
  }

  /* altaEmpresa() {
    this.empresasSvc
      .creaEmpresa(this.empresaForm.value)
      .subscribe(
        data => {
          this.parent.messageSvc.mensajeSencillo(
            this.parent.messageSvc.MSG_SUCCESS,
            'Éxito',
            this.rol_empresa + ' creado con éxito.',
            15
          );
          this.parent.blockUI.stop();
          this.router.navigate(['/gestion/' + this.redireccion + '/listar']);
        },
        err => {
          this.parent.messageSvc.mensajeSencillo(
            this.parent.messageSvc.MSG_ERROR,
            'Éxito',
            'Ha ocurrido un error al intentar dar de alta al ' +
            this.rol_empresa +
            '. Si persiste contacte con el administrador.',
            15
          );
          this.parent.blockUI.stop();
        }
      );
  } */

/*   editarEmpresa() {

    this.empresasSvc
      .editaEmpresa(this.parent.token, this.empresaForm.value)
      .subscribe(
        data => {
          this.parent.messageSvc.mensajeSencillo(
            this.parent.messageSvc.MSG_SUCCESS,
            'Éxito',
            this.rol_empresa + ' creado con éxito.',
            15
          );
          this.parent.blockUI.stop();
          this.router.navigate(['/gestion/' + this.redireccion + '/listar']);
        },
        err => {
          this.parent.messageSvc.mensajeSencillo(
            this.parent.messageSvc.MSG_ERROR,
            'Éxito',
            'Ha ocurrido un error al intentar dar de alta al ' +
            this.rol_empresa +
            '. Si persiste contacte con el administrador.',
            15
          );
          this.parent.blockUI.stop();
        }
      );

  } */

  estadoAsociarUsuario(estado: boolean) {
    const claveControl = this.empresaForm.get('usuario').get('clave');
    this.asociarUsuario = estado;
    this.empresaForm
      .get('usuario')
      .get('clave')
      .setValue('');
    if (this.asociarUsuario === false) {
      this.empresaForm
        .get('usuario')
        .get('clave')
        .disable();
      claveControl.clearValidators();
    } else {
      this.empresaForm
        .get('usuario')
        .get('clave')
        .enable();
      claveControl.setValidators([
        Validators.required,
        Validators.minLength(6)
      ]);
    }
    claveControl.updateValueAndValidity();
  }

  swipe(eType){
    console.log(eType);
    /*if(eType === this.SWIPE_ACTION.LEFT && this.selected > 0){
      console.log("movin left")
      this.selected--;
    }
    else if(eType === this.SWIPE_ACTION.RIGHT && this.selected < this.tab_num){
      console.log("movin right")
      this.selected++;
    }*/
   // console.log(this.selected)
  }
}
