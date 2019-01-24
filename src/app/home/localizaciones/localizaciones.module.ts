import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { LocalizacionesRoutingModule } from './localizaciones-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material';
import { MatSnackBarModule} from '@angular/material/snack-bar';

import { CustomFormModule } from 'src/app/forms/custom.form.module';
import { MatProgressBarModule } from '@angular/material';

import { AltaLocalizacionComponent }from './alta-localizacion/alta-localizacion.component';
import { ListaLocalizacionComponent } from './lista-localizacion/lista-localizacion.component' ;



@NgModule({
  imports: [
    CommonModule,
    LocalizacionesRoutingModule,   
    FormsModule,
    CustomFormModule,
    IonicModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    CustomFormModule,
    MatProgressBarModule
    
  ],
  providers: [ ],
  declarations: [AltaLocalizacionComponent]
})
export class LocalizacionesModule {}
