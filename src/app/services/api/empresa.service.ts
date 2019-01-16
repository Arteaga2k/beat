import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Empresa } from 'src/app/classes/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }
  
  creaEmpresa(token, empresa: any): Observable<any> {
    empresa.token = token;
    return this.http
      .post(environment.servidor + 'empresas', empresa).pipe(
      map(data => {
        return data;
      }), catchError(this.handleError));
  }

  editaEmpresa(token, empresa: any): Observable<any> {
    return null;
  }

  getCliente(id_empresa): any {
    let url = environment.servidor + 'empresas/getCliente/';
    url += id_empresa;
    return this.http.post<any>(url, {}).pipe(map(data => {
      return new Empresa(data.data);
    }));
  }

  getClientes(): any {
    return this.http.post<any>(environment.servidor + 'empresas/listaClientes', {}).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError));
  }

  /**
   * En base a un token para saber de que empresa proviene la petición,
   * y de un rol opcional (Cliente o Proveedor), devuelve el nivel que
   * tendría una empresa. Si el rol es nulo, devuelve el rol de la empresa
   * a la que pertenece el usuario que realiza la petición.
   *   
   * @param rol: String nullable
   */
  getTipoEmpresa( rol = null): any {
    return this.http.post<{ tipo: string; }>(environment.servidor + 'empresas/getTipoEmpresa', {
      rol: rol
    }).pipe(
      map(data => {
        return data.tipo;
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
