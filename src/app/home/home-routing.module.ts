import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { PruebaModule } from './prueba/prueba.module';
import { ClientesModule } from './clientes/clientes.module';
import { UsuariosModule } from './usuarios/usuarios.module';
 
const routes: Routes = [
  { path: '', redirectTo: '/gestion/clientes', pathMatch: 'full' },
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'clientes', loadChildren: () => ClientesModule },
      { path: 'usuarios', loadChildren: () => UsuariosModule }      
    ]
  },
 // { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosPageModule' }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }


