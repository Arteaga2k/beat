import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { PruebaModule } from './prueba/prueba.module';
import { ClientesModule } from './clientes/clientes.module';
 
const routes: Routes = [
  { path: '', redirectTo: '/gestion/clientes', pathMatch: 'full' },
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'clientes', loadChildren: () => ClientesModule }   
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }


