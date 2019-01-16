import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeleccionLocalizacionComponent } from './seleccion-localizacion/seleccion-localizacion.component';
import { LoginPage } from './login/login.page';

const routes: Routes = [
  { path: '', redirectTo: '/seguridad/login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'seleccion_localizacion', component: SeleccionLocalizacionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
