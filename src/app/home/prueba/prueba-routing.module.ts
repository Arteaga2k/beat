import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPruebaComponent } from './lista-prueba/lista-prueba.component';

//import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';

const routes: Routes = [
  { path: '', redirectTo: '/listar', pathMatch: 'full' },
  { path: 'listar', component: ListaPruebaComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PruebaRoutingModule { }
