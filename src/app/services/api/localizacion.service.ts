import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class LocalizacionService {

    constructor(private http: HttpClient) { }

    getLocalizacion(id: any): Observable<any> {
        let url = environment.servidor + 'localizaciones/'+ id;
        return this.http.get<String[]>(url);

    }

    getTiposLocalizacion(): Observable<any> {
        let url = environment.servidor + 'localizaciones/listaTiposLocalizacion';
        return this.http.get<String[]>(url);
    }

    getColoresLocalizacion(): Observable<any> {
        let url = environment.servidor + 'localizaciones/getColores';
        return this.http.get<String[]>(url);
    }

    altaLocalizacion(datos): Observable<any> {
        return this.http
            .post(environment.servidor + 'localizacion', datos)
            .pipe(
                map(data => {
                    return data;
                }));
    }

    editaLocalizacion(id: number, datos) {
        const action = 'localizaciones/' + id;
        return this.http.put(environment.servidor + action, datos).pipe(
            map(data => {
                return data;
            }));
    }

    bajaLocalizacion(id: number): Observable<any> {
        const action = 'localizaciones/' + id;
        return this.http.delete(environment.servidor + action).pipe(
            map(data => {
                return data;
            }));
    }


}
