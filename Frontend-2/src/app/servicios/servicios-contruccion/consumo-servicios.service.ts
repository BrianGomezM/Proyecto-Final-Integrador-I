import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'environments/environment.prod';
import {Construccion } from '../servicios-contruccion/interface-construccion';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumoServiciosService {
  private baseUrl:string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getConstrucciones():Observable<Construccion[]>{
    let  url =this.baseUrl+'arquitectura';
    let header=new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', 'http://localhost');
    return this.http.get<Construccion[]>(url, { headers: header }).pipe(
      catchError(error => {
        console.log('Error en la solicitud:', error);
        // Puedes realizar acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
        return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
      }));    
    }
}
