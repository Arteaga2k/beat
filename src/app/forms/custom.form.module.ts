import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaService} from '../services/api/empresa.service';
import { LocalizacionService } from '../services/api/localizacion.service';
import { DireccionService } from '../services/api/direccion.service';
import { FormAltaEmpresaComponent } from './form-alta-empresa/form-alta-empresa.component';


@NgModule({
  imports: [
    CommonModule,
  
  ],
  providers: [EmpresaService, LocalizacionService, DireccionService],
  declarations: [
    FormAltaEmpresaComponent,
  
  ],
  exports: [
    FormAltaEmpresaComponent,

  ]
})
export class CustomFormModule {}
