import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'environments/environment.prod';
import { throwError } from 'rxjs';
import { Recurso } from '../recursos.interface';
import { Practicas } from './interface-practicas';
@Injectable({
  providedIn: 'root'
})
export class ConsumoServiciosService {

  private baseUrl:string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  /**
 * Obtiene todas las prácticas religiosas.
 * @returns Un Observable que emite un arreglo de objetos de tipo practicas.
 */
  getPracticas():Observable<Practicas[]>{
    let  url =this.baseUrl+'practicas';
    let header=new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', 'http://localhost');
    return this.http.get<Practicas[]>(url, { headers: header }).pipe(
      catchError(error => {
        console.log('Error en la solicitud:', error);
        // Puedes realizar acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
        return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
    }));    
}

  /**
 * Obtiene los detalles de unas historia y mito específica.
 * @param idPracticas El ID del dios del cual se desean obtener los detalles.
 * @returns Un Observable que emite un arreglo de objetos de tipo MitosHistorias.
 */

  getDetailsPracticas(idPracticas):Observable<Practicas[]>{
    let  url =this.baseUrl+'getPracticasById/'+idPracticas;
    let header=new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', 'http://localhost');
    return this.http.get<Practicas[]>(url, { headers: header }).pipe(
      catchError(error => {
        console.log('Error en la solicitud:', error);
        return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
    }));    
  }

      /**
 * Obtiene los detalles de las imágenes asociadas a una práctica religiosa específica.
 * @param idPracticas El ID de la práctica religiosa del cual se desean obtener los detalles de las imágenes.
 * @returns Un Observable que emite un arreglo de objetos de tipo Recurso.
 */

      getImagenesDetails(idPracticas):Observable<Recurso>{
        let  url =this.baseUrl+'getPracticasImgById/'+idPracticas;
        let header=new HttpHeaders();
        header.append('Content-Type', 'application/json');
        header.append('Access-Control-Allow-Origin', 'http://localhost');
        return this.http.get<Recurso>(url, { headers: header }).pipe(
          catchError(error => {
            console.log('Error en la solicitud:', error);
            return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
          }));    
    }

          /**
 * Obtiene todos los practicas.
 * @returns Un Observable que emite un arreglo de objetos de tipo Practicas.
 */
  getFiltro(id):Observable<Practicas[]>{
    let  url =this.baseUrl+'filtrarPracticas/'+id;
    let header=new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', 'http://localhost');
    return this.http.get<Practicas[]>(url, { headers: header }).pipe(
      catchError(error => {
        console.log('Error en la solicitud:', error);
        return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
      }));    
    }
  




}
