import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalizacionService } from 'src/app/services/api/localizacion.service';
import { EmpresaService } from 'src/app/services/api/empresa.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'beatForm-alta-localizacion',
  templateUrl: './form-alta-localizacion.component.html',
  styleUrls: ['./form-alta-localizacion.component.scss']
})
export class FormAltaLocalizacionComponent implements OnInit {

  @Output() formReady = new EventEmitter<FormGroup>();

  public localizacionForm: FormGroup;
  mostrarErrores = false;
  paleta_colores = [];



  constructor(
    private localizacionesSvc: LocalizacionService,
    private empresasSvc: EmpresaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.cargaPaletaColores();
    this.crearFormulario();
    this.formReady.emit(this.localizacionForm); 
  }

  crearFormulario() {

    this.localizacionForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      color: new FormControl('', Validators.required),
      telefono: new FormControl(''),
      imagen: new FormControl('')
    });
  }

  cargaPaletaColores() {

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
      })
  }

  mensajeSnackBar(mensaje: string, estado: string) {

    let snackBarRef = this.snackBar.open(
      estado + '. ' + mensaje,
      'Aceptar',
      { verticalPosition: 'top' });

    snackBarRef.afterDismissed().subscribe(info => {
      if (info.dismissedByAction === true) {
        //todo hacer cosas   
        //  this.cargando = false;
      }
    }
    );
  }

}
