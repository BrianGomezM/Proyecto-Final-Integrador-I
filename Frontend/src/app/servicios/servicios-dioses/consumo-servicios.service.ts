import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'environments/environment.prod';
import {Dioses } from '../servicios-dioses/interface-dioses';
import { throwError } from 'rxjs';
import { Recurso } from '../recursos.interface';


@Injectable({
  providedIn: 'root'
})
export class ConsumoServiciosService {
  private baseUrl:string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  /**
 * Obtiene todos los dioses.
 * @returns Un Observable que emite un arreglo de objetos de tipo Dioses.
 */
  getAllGods():Observable<Dioses[]>{
    let  url =this.baseUrl+'dioses';
    let header=new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', 'http://localhost');
    return this.http.get<Dioses[]>(url, { headers: header }).pipe(
      catchError(error => {
        console.log('Error en la solicitud:', error);
        return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
      }));    
    }
/**
 * Obtiene los detalles de un dios específico.
 * @param idDios El ID del dios del cual se desean obtener los detalles.
 * @returns Un Observable que emite un arreglo de objetos de tipo Dioses.
 */

    getGodDetails(idDios):Observable<Dioses[]>{
      let  url =this.baseUrl+'diosesById/'+idDios;
      let header=new HttpHeaders();
      header.append('Content-Type', 'application/json');
      header.append('Access-Control-Allow-Origin', 'http://localhost');
      return this.http.get<Dioses[]>(url, { headers: header }).pipe(
        catchError(error => {
          console.log('Error en la solicitud:', error);
          return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
        }));    
      }

/**
 * Obtiene los detalles de las imágenes asociadas a un dios específico.
 * @param idDios El ID del dios del cual se desean obtener los detalles de las imágenes.
 * @returns Un Observable que emite un arreglo de objetos de tipo Recurso.
 */
      getImagenesDetails(idDios):Observable<Recurso[]>{
        let  url =this.baseUrl+'diosesImgById/'+idDios;
        let header=new HttpHeaders();
        header.append('Content-Type', 'application/json');
        header.append('Access-Control-Allow-Origin', 'http://localhost');
        return this.http.get<Recurso[]>(url, { headers: header }).pipe(
          catchError(error => {
            console.log('Error en la solicitud:', error);
            return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
          }));    
        }

}
