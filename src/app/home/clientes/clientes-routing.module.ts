import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { AltaClienteComponent } from './alta-cliente/alta-cliente.component';
import { EditarClientesComponent } from './editar-clientes/editar-clientes.component';
//import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';

const routes: Routes = [
  { path: '', redirectTo: '/clientes/listar', pathMatch: 'full' },
  { path: 'listar', component: ListaClientesComponent },
  { path: 'crear', component: AltaClienteComponent },
  { path: 'editar/:id', component: EditarClientesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
