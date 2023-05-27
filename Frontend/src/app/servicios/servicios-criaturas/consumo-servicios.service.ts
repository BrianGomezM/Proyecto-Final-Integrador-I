import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'environments/environment.prod';
import { Criatura } from '../servicios-criaturas/interface-criaturas';
import { throwError } from 'rxjs';
import { Recurso } from '../recursos.interface';

@Injectable({
  providedIn: 'root'
})
export class ConsumoServiciosService {

  private baseUrl:string = environment.baseUrl;
  constructor(private http: HttpClient) {}

/**
 * Obtiene todas las criaturas.
 * @returns Un Observable que emite un arreglo de objetos de tipo Criatura.
 */

  getAllCriaturas():Observable<Criatura[]>{
    let  url =this.baseUrl+'criaturas';
    let header=new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', 'http://localhost');
    return this.http.get<Criatura[]>(url, { headers: header }).pipe(
      catchError(error => {
        console.log('Error en la solicitud:', error);
        return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
      }));    
    }

/**
 * Obtiene los detalles de una criatura específica.
 * @param idCriatura El ID de la criatura del cual se desean obtener los detalles.
 * @returns Un Observable que emite un arreglo de objetos de tipo Criatura.
 */

    getCriaturaDetails(idCriatura):Observable<Criatura[]>{
      let  url =this.baseUrl+'criaturasById/'+idCriatura;
      let header=new HttpHeaders();
      header.append('Content-Type', 'application/json');
      header.append('Access-Control-Allow-Origin', 'http://localhost');
      return this.http.get<Criatura[]>(url, { headers: header }).pipe(
        catchError(error => {
          console.log('Error en la solicitud:', error);
          return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
        }));    
      }
/**
 * Obtiene los detalles de las imágenes asociadas a una criatura específica.
 * @param idCriatura El ID de la criatura del cual se desean obtener los detalles de las imágenes.
 * @returns Un Observable que emite un arreglo de objetos de tipo Recurso.
 */

      getImagenesDetails(idCriatura):Observable<Recurso[]>{
        let  url =this.baseUrl+'criaturasImgById/'+idCriatura;
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
