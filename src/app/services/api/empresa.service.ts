import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  getClientes(): any {

    return this.http.get(environment.servidor + 'empresas/listaClientes').pipe(
      map(data => {
        return data;
      }),
      catchError(null));
  }
}
