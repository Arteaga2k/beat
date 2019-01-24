import { PERMISOS } from './../constantes';
import { Component } from '@angular/core';
import { PermisosService } from 'src/app/services/api/permisos.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-base',
  template: '',
  styles: []
})
export class BaseComponent {
  permisosRequeridos: Array<string>;

  constructor(
    protected permisosSvc: PermisosService
  ) {
    // Ponemos que el permiso de administrador pueda acceder a todos los componentes
    this.permisosRequeridos = [PERMISOS.ADMIN];
  }

  /**
   * Función que llama la servicio de permisos para que compruebe si los permisos del usuario logueado
   * coinciden con los permisos requeridos.
   * @param permisos array de permisos a comprobar, si es null toma los permisosRequeridos
   * @returns boolean si tiene los permisos o no.
   */
  protected hasPermisos(permisos: Array<string> = null): boolean {
    if (permisos === null) {
      // si no se especifican permisos usa los requeridos.
      return this.permisosSvc.hasPermiso(this.permisosRequeridos);
    } else {
      return this.permisosSvc.hasPermiso(permisos);
    }
  }  
  
}
