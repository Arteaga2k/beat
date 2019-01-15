import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeguridadModule } from './seguridad/seguridad.module';

const routes: Routes = [
  {
    path: 'seguridad',
    loadChildren: () => SeguridadModule
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
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
export class AppRoutingModule {}
