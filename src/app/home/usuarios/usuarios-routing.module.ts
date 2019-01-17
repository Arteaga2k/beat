import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListausuariosComponent } from './listausuarios/listausuarios.component';


const routes: Routes = [
  { path: '', redirectTo: '/usuarios/listar', pathMatch: 'full' },
  { path: 'listar', component: ListausuariosComponent },
/*   { path: 'crear', component: AltaClienteComponent },
  { path: 'editar/:id', component: EditarClientesComponent } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
