import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Localizacion } from 'src/app/classes/localizacion';
import { FormGroup } from '@angular/forms';
import { LocalizacionService } from 'src/app/services/api/localizacion.service';

@Component({
  selector: 'app-alta-localizacion',
  templateUrl: './alta-localizacion.component.html',
  styleUrls: ['./alta-localizacion.component.scss'],
})
export class AltaLocalizacionComponent implements OnInit {

  public localizacionForm: FormGroup;
  id_empresa: string;
  id_localizacion: string;
  localizacion: Localizacion;

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

        alert('sdsds');


        
        //todo pedir localizacion y pasarlo al formulario
        this.localizacionSvc.getLocalizacion(this.id_localizacion).subscribe(
          datos => {

         //   this.localizacion = new Localizacion(datos.data);
          //    console.log(' localizacion data es ', this.localizacion);    
           
            if (datos.data) {
              this.localizacion = new Localizacion(datos.data);
              console.log(' localizacion data es ', this.localizacion);             
            }
          },
          err => {
            console.log(' error getLocalizacion ', err);
           
          }

        );





      }
    });
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

    if (this.id_localizacion == 'null') {
      console.log(' entra ');
      //todo venimos de opción alta localizacion - editar cliente     
      this.router.navigate(['/gestion/clientes/editar/' + this.id_empresa], { queryParams: { tab: 'lista_localizaciones_tab' } });


    }

    console.log(this.id_localizacion);
    console.log(this.id_empresa);
  }

}
