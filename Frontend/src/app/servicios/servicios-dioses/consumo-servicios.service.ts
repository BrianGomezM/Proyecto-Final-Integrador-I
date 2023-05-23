import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'environments/environment.prod';
import {Dioses } from '../servicios-dioses/interface-dioses';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConsumoServiciosService {
  private baseUrl:string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getAllGods():Observable<Dioses[]>{
    let  url =this.baseUrl+'dioses';
    let header=new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', 'http://localhost');
    return this.http.get<Dioses[]>(url, { headers: header }).pipe(
      catchError(error => {
        console.log('Error en la solicitud:', error);
        // Puedes realizar acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
        return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
      }));    
    }
    getGodDetails(idDios):Observable<Dioses[]>{
      let  url =this.baseUrl+'diosesById/'+idDios;
      let header=new HttpHeaders();
      header.append('Content-Type', 'application/json');
      header.append('Access-Control-Allow-Origin', 'http://localhost');
      return this.http.get<Dioses[]>(url, { headers: header }).pipe(
        catchError(error => {
          console.log('Error en la solicitud:', error);
          // Puedes realizar acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
          return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
        }));    
      }

}
