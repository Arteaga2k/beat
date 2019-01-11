import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Localizacion } from '../classes/localizacion';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(params) {

    return this.http.post(environment.servidor + 'usuarios/login', params).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError));
  }

  getLocalizacionesUsuario(token: string): Observable<any> {
    const url = environment.servidor + 'usuarios/localizacionesConPermisos';
    return this.http.post(url, {
      'token': token
    }).pipe(
      map(data => {
        const localizaciones = [];
        for (const localizacion of data['localizaciones_con_permisos']) {
          localizaciones.push(new Localizacion(localizacion));
        }

        return localizaciones;

      }),
      catchError(this.handleError));
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
