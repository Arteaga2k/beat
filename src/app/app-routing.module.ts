import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeguridadModule } from './seguridad/seguridad.module';

import { HomeModule } from './home/home.module';
import { ClientesModule } from './home/clientes/clientes.module'; 
import { UsuariosModule } from './home/usuarios/usuarios.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/seguridad/login',
    pathMatch: 'full'
  },
  {
    path: 'seguridad',
    loadChildren: () => SeguridadModule
  },
  {
    path: 'gestion',
    loadChildren: () => HomeModule
  }, 
  { path: 'clientes', loadChildren: () => ClientesModule },
  { path: 'usuarios', loadChildren: () => UsuariosModule },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'albaranes', loadChildren: './home/albaranes/albaranes.module#AlbaranesPageModule' }
  // { path: 'login', loadChildren: './seguridad/login/login.module#LoginPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
