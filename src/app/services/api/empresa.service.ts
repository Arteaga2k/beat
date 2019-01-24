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
        }));
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
      }));
  }


  bajaCliente(id_empresa: number): Observable<any> {
    const action = 'empresas/bajaCliente/' + id_empresa;
    return this.http.post(action, {}).pipe(map(data => {
      return data;
    }));
  }

  /**
   * En base a un token para saber de que empresa proviene la petición,
   * y de un rol opcional (Cliente o Proveedor), devuelve el nivel que
   * tendría una empresa. Si el rol es nulo, devuelve el rol de la empresa
   * a la que pertenece el usuario que realiza la petición.
   *   
   * @param rol: String nullable
   */
  getTipoEmpresa(rol = null): any {
    return this.http.post<{ tipo: string; }>(environment.servidor + 'empresas/getTipoEmpresa', {
      rol: rol
    }).pipe(
      map(data => {
        return data.tipo;
      }));
  }

  getLocalizaciones(empresa: Empresa = null): any {
    if (empresa == null) {
      empresa = new Empresa(JSON.parse(localStorage.getItem('empresa')));
    }
    const id_empresa = empresa != null ? empresa.getId() : null;
    if (id_empresa !== null) {
      // TODO: llamada al action de la API.
      return this.http.get('empresas/' + id_empresa + '/localizaciones').pipe(
        map(data => {
          return data;
        }));
    } else {
      // Si no propocionamos empresa, deberemos lanzar una excepción
      throw new Error('Es necesario especificar una empresa');
    }
  }




}
