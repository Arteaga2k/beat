import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
  HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Localizacion } from '../classes/localizacion';
import { Observable, from, forkJoin, throwError } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private storage: Storage
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.indexOf('/usuarios/login') !== -1) {
      return next.handle(req);
    }

    var token;
    var localizacion;

    // agrupamos las promises en una sola
    var values = forkJoin(
      this.storage.get("token"),
      this.storage.get("localizacion")
    ).pipe(
      map(([_token, _localizacion]) => {
        return { _token, _localizacion };
      })
    );

    // devolvemos un observable http usando operador from
    return from(values).pipe(
      mergeMap(values => {

        var _loc = JSON.parse(values._localizacion);

        let newHeaders = req.headers
          .set('X-Auth', values._token)
          .set('Accept', 'application/json')
          .set('X-Requested-With', 'XMLHttpRequest');

        console.log('intercept', values);

        if (_loc) {
          //newHeaders = newHeaders.set('X-Location', _loc.getId().toString());
        }
        const authReq = req.clone({ headers: newHeaders });
        return next.handle(authReq).pipe(
          map(resp => {
            // capturamos respuesta del servidor
            if (resp instanceof HttpResponse) {
              // podemos hacer lo que queramos con la respuesta
              return resp;
            }
          }),
          catchError(err => {
            // onError
            console.log(err);
            if (err instanceof HttpErrorResponse) {
              console.log(err.status);
              console.log(err.statusText);
              //todo podemos capturar los errores por codigo
              // if (err.status === 401) { console.log('error status 401)}
            }
            return throwError('Something bad happened; please try again later.');
          })
        );
      }
      ));
  }


}
