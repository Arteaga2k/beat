import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Municipio } from 'src/app/classes/municipio';
import { Provincia } from 'src/app/classes/provincia';
import { environment } from 'src/environments/environment';
import { TipoVia } from 'src/app/classes/tipoVia';

@Injectable({
    providedIn: 'root'
})
export class DireccionService {

    constructor(private http: HttpClient) { }

    getTiposVia(): Observable<any> {
        let url = environment.servidor + 'direcciones/listaTiposVia';     
        return this.http.get<TipoVia[]>(url).pipe(
            map((data: any) => {
                const tipos_via: TipoVia[] = [];
                for (const tipo_via of data) {
                    tipos_via.push(new TipoVia(tipo_via));
                }
                return tipos_via;
            }));
    }

    getProvincias(): Observable<any> {
        let url = environment.servidor + 'direcciones/listaProvincias';       
        return this.http.get(url).pipe(
            map((data: any) => {
                const provincias: Provincia[] = [];
                for (var i in data) {
                    provincias.push(new Provincia(data[i]));
                }
                return provincias;
            }));
    }

    getMunicipios(provincia: number): Observable<any> {
        let url = environment.servidor + 'direcciones/listaMunicipios/' + provincia;      
        return this.http.get<Municipio[]>(url).pipe(
            map((data: any) => {
                const municipios: Municipio[] = [];
                for (const municipio of data) {
                    municipios.push(new Municipio(municipio));
                }
                return municipios;
            }));
    }

    getDatosDireccionForm(): Observable<any> {

        let url_1 = environment.servidor + 'direcciones/listaTiposVia'; 
        let url_2 = environment.servidor + 'direcciones/listaProvincias';       

        let response1 = this.http.get<TipoVia[]>(url_1).pipe(
            map((data: any) => {
                const tipos_via: TipoVia[] = [];
                for (const tipo_via of data) {
                    tipos_via.push(new TipoVia(tipo_via));
                }
                return tipos_via;
            }));

        let response2= this.http.get(url_2).pipe(
            map((data: any) => {
                const provincias: Provincia[] = [];
                for (var i in data) {
                    provincias.push(new Provincia(data[i]));
                }
                return provincias;
            }));
        

        return forkJoin([response1, response2]);
      }

    
}
