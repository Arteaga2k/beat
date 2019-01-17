import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from 'src/app/classes/empresa';
import { map, catchError } from 'rxjs/operators';
import { Usuario } from 'src/app/classes/usuario';
import { Observable, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class UsuariosService {
    constructor(
        private http: HttpClient
    ) { }

    listaUsuarios(verInactivos: boolean, empresa: Empresa = null) {
        const params: any = {
            ver_inactivos: verInactivos
        };
        const url = 'usuarios/listaPorEmpresa';
        if (empresa !== null) {
            params.empresa = empresa.getId().toString();
        }
        return this.http.post(url, params).pipe(
            map((data: any) => {
                return data;
            }), catchError(this.handleError));
    }

    /**
     * Devuelve los datos personales de un usuario.
     * Si id_usuario es 0, devuelve los datos
     * del usuario logueado.
     */
    getUsuario(id_usuario = 0) {
        // TODO: hay que controlar si el usuario no se pone, para que sea el usuario activo el que se edite.
        const url = 'usuarios/' + id_usuario;
        return this.http.get(url).pipe(
            map((data: any) => {
                return new Usuario(data.data);
            }), catchError(this.handleError));
    }

    /**
     * Devuelve un array con los cargos existentes
     * en base de datos
     */
    getCargos(token) {
        const url = environment.servidor + 'usuarios/listaCargos';
        return this.http.post<any>(url, {
            token: token
        });
    }

    /**
     * Actualiza los datos personales del usuario
     */
    actualizaUsuario(id, usuario: any): Observable<any> {
        const url = 'usuarios/editaDatosPersonales/' + id;
        return this.http.post(url, usuario).pipe(
            map(data => {
                return data;
            }), catchError(this.handleError));
    }

    /**
     * Cambia la clave de un usuario
     */
    /*  cambiaClaveUsuario(token, id, clave: any): Observable<any> {
         // const url = environment.servidor + 'usuarios/cambiaClave';
         const action = 'usuarios/cambiaClave';
         // clave.token = token;
         clave.usuario = id;
         return this.peticionesSvc.post(action, clave).map(data => {
             return data;
         });    
     } */

    /**
     * Da de baja el usuario
     */
    /*   bajaUsuario(token: string, id: number): Observable<any> {
          const action = 'usuarios/baja';
          return this.peticionesSvc.post(action, {
              usuario: id
          }).map(data => {
              return data;
          });
      } */

    creaUsuario(token, usuario: any): Observable<any> {
        usuario.token = token;
        return this.http
            .post(environment.servidor + 'usuarios', usuario).pipe(
                map(data => {
                    return data;
                }), catchError(this.handleError));
    }


    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }
}
