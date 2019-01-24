import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltaLocalizacionComponent } from './alta-localizacion/alta-localizacion.component';


const routes: Routes = [
  //{ path: '', redirectTo: '/localizacion/listar', pathMatch: 'full' },
  //{ path: 'listar', component: ListaClientesComponent },
  { path: 'crear/:localizacion/:id_empresa', component: AltaLocalizacionComponent },
 // { path: 'editar/:id', component: EditarClientesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalizacionesRoutingModule { }
