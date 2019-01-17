import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaService } from '../services/api/empresa.service';
import { LocalizacionService } from '../services/api/localizacion.service';
import { DireccionService } from '../services/api/direccion.service';
import { FormAltaEmpresaComponent } from './form-alta-empresa/form-alta-empresa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule, MatButtonToggleModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule, MatProgressBarModule, MatCardModule } from '@angular/material';
import { IonicModule } from '@ionic/angular';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatSelectModule,
    IonicModule

  ],
  providers: [EmpresaService, LocalizacionService, DireccionService],
  declarations: [
    FormAltaEmpresaComponent,

  ],
  exports: [
    FormAltaEmpresaComponent,

  ]
})
export class CustomFormModule { }
