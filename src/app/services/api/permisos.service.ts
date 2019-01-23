import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/classes/usuario';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  constructor(
    private storage: Storage,
    private http: HttpClient
  ) { }

  public hasPermiso(permisos: Array<string>): boolean {
    let interseccion = [];
    const permisosUsuario = this.getPermisosUsuario();

    interseccion = [...permisos].filter(x => permisosUsuario.includes(x));
    return interseccion.length > 0;
  }

  private getPermisosUsuario(): Array<string> {
    const permisos = [];
    var localizacion = null;

    this.storage.get('token').then((val) => {
      localizacion = JSON.parse(val);
      console.log(' LOCALIZACION ', localizacion);

      localizacion.permisos.forEach(permiso => {
        permisos.push(permiso.codigo);
      })
    })
    return permisos;
  }

  public getAllPermisos(): Observable<any> {
    return this.http.get('autorizacion/permisos').pipe(
      map(data => {
        return data;
      }));
  }

  public getPermisosLocalizaciones(usuario: Usuario): Observable<any> {
    // TODO falta que pille los datos del usuario pasado, cuando esté preparado el método de la API.
    return this.http
      .get('usuarios/' + usuario.getId() + '/localizacionesConPermisos').pipe(
        map(data => {
          // console.log('data');
          return data;
        }));
  }

  /**
   * setPermisosUsuario
   */
  public setPermisosUsuario(usuario: Usuario, permisos: any): Observable<any> {
    return this.http.post('usuarios/' + usuario.getId() + '/setPermisos', permisos).pipe(
      map(data => {
        return data;
      }));
  }
}
