import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login/login.page';
import { SeleccionLocalizacionComponent } from './seleccion-localizacion/seleccion-localizacion.component';
import { MatButtonModule, MatCheckboxModule, MatProgressBarModule, MatIconModule, MatInputModule, MatCardModule } from '@angular/material';
import { SeguridadRoutingModule } from './seguridad-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SeguridadRoutingModule, 
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule
  ],
  declarations: [LoginPage, SeleccionLocalizacionComponent]
})
export class SeguridadModule { }
