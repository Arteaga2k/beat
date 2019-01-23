import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaService } from '../services/api/empresa.service';
import { LocalizacionService } from '../services/api/localizacion.service';
import { DireccionService } from '../services/api/direccion.service';
import { FormAltaEmpresaComponent } from './form-alta-empresa/form-alta-empresa.component';
import { FormDireccionComponent } from './form-direccion/form-direccion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule, MatButtonToggleModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule, MatProgressBarModule, MatCardModule, MatTableModule, MatSortModule } from '@angular/material';
import { IonicModule } from '@ionic/angular';
import { ListaUsuariosComponent } from '../home/usuarios/lista-usuarios/lista-usuarios.component';
import { UsuariosPopoverComponent } from './usuarios-popover/usuarios-popover.component';


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
    MatTableModule,
    MatSortModule,
    IonicModule

  ],
  providers: [EmpresaService, LocalizacionService, DireccionService],
  declarations: [
    FormAltaEmpresaComponent,
    FormDireccionComponent,
    ListaUsuariosComponent,
    UsuariosPopoverComponent

  ],
  exports: [
    FormAltaEmpresaComponent,
    FormDireccionComponent,
    ListaUsuariosComponent
  ]
})
export class CustomFormModule { }

