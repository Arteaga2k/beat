import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeguridadModule } from './seguridad/seguridad.module';

import { HomeModule } from './home/home.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/clientes',
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
