import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ClientesModule } from './clientes/clientes.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { LocalizacionesModule } from './localizaciones/localizaciones.module';
 
const routes: Routes = [
  { path: '', redirectTo: '/gestion/clientes', pathMatch: 'full' },
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'clientes', loadChildren: () => ClientesModule },
      { path: 'usuarios', loadChildren: () => UsuariosModule },
      { path: 'localizaciones', loadChildren: () => LocalizacionesModule }     
    ]
  } 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }


