import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Localizacion } from '../../classes/localizacion';
import { Observable, throwError, Observer, from } from 'rxjs';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private storage: Storage) { }

  login(params) {    

    return this.http.post(environment.servidor + 'usuarios/login', params).pipe(
      map(data => {
        return data;
      }),
      catchError(this.handleError));
  }

  prueba(): Observable<any> {  
    const httpOptions = {
      headers: new HttpHeaders(
        {'Content-Type': 'application/json', 'x-auth': 'sdsdsdssd'})
    };

    return this.http.get(environment.servidor + 'usuarios/1/localizacionesConPermisos').pipe(
      map(data => {
        console.log('data ', data);

      }),
      catchError(this.handleError));
  }

  getLocalizacionesUsuario(usuario: any): Observable<any> {
    const url = environment.servidor + 'usuarios/' + usuario.id + '/localizacionesConPermisos';    
       
    return this.http.get(url)
      .pipe(
        map(data => {       

          const localizaciones = [];
          for (const localizacion of data['data']) {
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
