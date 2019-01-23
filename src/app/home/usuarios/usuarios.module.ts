import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { MatTableModule, MatSortModule, MatSnackBarModule, MatProgressBarModule } from '@angular/material';
import { CustomFormModule } from 'src/app/forms/custom.form.module';

import { UsuariosPopoverComponent } from 'src/app/forms/usuarios-popover/usuarios-popover.component';

@NgModule({
  imports: [
    CommonModule,
    UsuariosRoutingModule,   
    FormsModule,
    IonicModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    CustomFormModule,
    MatProgressBarModule

    
  ],
  declarations: [],
  entryComponents: [UsuariosPopoverComponent]
})
export class UsuariosModule {}
