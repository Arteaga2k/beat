import { Injectable } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const obj: any = {};
const httpOptions = {
  headers: null,
  params: obj
};

export class AlbaranesService {



  constructor(private http: HttpClient) { }

  getListApi(token: string, filtro?): Observable<any> {
    // TODO: Documentación
    httpOptions.params.token = token;

    if (filtro && filtro.est_documento) {
      httpOptions.params.est_documento = filtro.est_documento;
    }

    if (filtro && filtro.fec_ini) {
      httpOptions.params.fec_ini = filtro.fec_ini;
    }

    if (filtro && filtro.fec_fin) {
      httpOptions.params.fec_fin = filtro.fec_fin;

    }

    return this.http.get(environment.servidor + 'albaranes', httpOptions);
    

  }
}
