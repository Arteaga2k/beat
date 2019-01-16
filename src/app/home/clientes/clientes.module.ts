import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { AltaClienteComponent } from './alta-cliente/alta-cliente.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material';
import { MatSnackBarModule} from '@angular/material/snack-bar';

import { EditarClientesComponent } from './editar-clientes/editar-clientes.component';



@NgModule({
  imports: [
    CommonModule,
    ClientesRoutingModule,   
    FormsModule,
    IonicModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule
    
  ],
  providers: [ ],
  declarations: [AltaClienteComponent, ListaClientesComponent, EditarClientesComponent,]
})
export class ClientesModule {}
