import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { MatTableModule, MatSortModule, MatSnackBarModule } from '@angular/material';
import { CustomFormModule } from 'src/app/forms/custom.form.module';
import { ListausuariosComponent } from './listausuarios/listausuarios.component';

@NgModule({
  imports: [
    CommonModule,
    UsuariosRoutingModule,   
    FormsModule,
    IonicModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    CustomFormModule
  ],
  declarations: [ListausuariosComponent]
})
export class UsuariosModule {}
