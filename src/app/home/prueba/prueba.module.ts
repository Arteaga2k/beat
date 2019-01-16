import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ListaPruebaComponent } from './lista-prueba/lista-prueba.component';
import { PruebaRoutingModule } from './prueba-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material';
import { MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    PruebaRoutingModule,   
    FormsModule,
    IonicModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule
    
  ],
  providers: [ ],
  declarations: [ListaPruebaComponent]
})
export class PruebaModule {}
