import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalizacionService } from 'src/app/services/api/localizacion.service';
import { FormGroup } from '@angular/forms';
import { Localizacion } from 'src/app/classes/localizacion';

@Component({
  selector: 'app-editar-localizacion',
  templateUrl: './editar-localizacion.component.html',
  styleUrls: ['./editar-localizacion.component.scss']
})
export class EditarLocalizacionComponent implements OnInit {

  public localizacionForm: FormGroup;
  id_empresa: string;
  id_localizacion: string;
  localizacion: Localizacion;
  cargando: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localizacionSvc: LocalizacionService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      console.log('params ', params);
      this.id_empresa = params.get("id_empresa");
      this.id_localizacion = params.get('localizacion');

      if (this.id_localizacion != 'null') {

        //todo pedir localizacion y pasarlo al formulario
        this.localizacionSvc.getLocalizacion(this.id_localizacion).subscribe(
          datos => {

            //   this.localizacion = new Localizacion(datos.data);
            //    console.log(' localizacion data es ', this.localizacion);    

            if (datos.data) {
              this.localizacion = new Localizacion(datos.data);
              this.cargando = false;
              console.log(' localizacion data es ', this.localizacion);
            }
          },
          err => {
            this.cargando = false;
            console.log(' error getLocalizacion ', err);

          }

        );
      }
    });
  }

  guardarLocalizacion() {
    console.log(this.localizacionForm.value);
  }


  /**
 * Cuando el subform es inicializado, lo asociamos al formulario principal (cliente form)
 *
 * @param name Nombre del campo del formulario
 * @param form El formulario construido por inyección
 */
  formLocalizacionInicializado(form: FormGroup) {
    this.localizacionForm = form;
    console.log('formulario alta localizacion', this.localizacionForm);
  }

  volverClick() {

    this.router.navigate(['/gestion/clientes/editar/' + this.id_empresa], { queryParams: { tab: 'lista_localizaciones_tab' } });

   /*  if (this.id_localizacion == 'null') {
      console.log(' entra ');
      //todo venimos de opción alta localizacion - editar cliente     
      this.router.navigate(['/gestion/clientes/editar/' + this.id_empresa], { queryParams: { tab: 'lista_localizaciones_tab' } });
    }else {
      this.router.navigate(['/gestion/clientes/editar/' + this.id_empresa], { queryParams: { tab: '' } });
    } */

    console.log(this.id_localizacion);
    console.log(this.id_empresa);
  }

}
