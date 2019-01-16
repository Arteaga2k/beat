import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
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

    getTiposVia(token: string): Observable<any> {
        let url = environment.servidor + 'direcciones/listaTiposVia';
        url += '?token=' + token;
        return this.http.get<TipoVia[]>(url).pipe(
            map((data: any) => {
                const tipos_via: TipoVia[] = [];
                for (const tipo_via of data) {
                    tipos_via.push(new TipoVia(tipo_via));
                }
                return tipos_via;
            }), catchError(this.handleError));
    }

    getProvincias(token: string): Observable<any> {
        let url = environment.servidor + 'direcciones/listaProvincias';
        url += '?token=' + token;
        return this.http.get(url).pipe(
            map((data: any) => {
                const provincias: Provincia[] = [];
                for (var i in data) {
                    provincias.push(new Provincia(data[i]));
                }
                return provincias;
            }), catchError(this.handleError));
    }

    getMunicipios(token: string, provincia: number): Observable<any> {
        let url = environment.servidor + 'direcciones/listaMunicipios/' + provincia;
        url += '?token=' + token;
        return this.http.get<Municipio[]>(url).pipe(
            map((data: any) => {
                const municipios: Municipio[] = [];
                for (const municipio of data) {
                    municipios.push(new Municipio(municipio));
                }
                return municipios;
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
