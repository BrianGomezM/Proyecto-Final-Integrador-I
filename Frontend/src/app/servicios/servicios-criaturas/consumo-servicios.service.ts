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

  getAllCriaturas():Observable<Criatura[]>{
    let  url =this.baseUrl+'criaturas';
    let header=new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', 'http://localhost');
    return this.http.get<Criatura[]>(url, { headers: header }).pipe(
      catchError(error => {
        console.log('Error en la solicitud:', error);
        // Puedes realizar acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
        return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
      }));    
    }
    getCriaturaDetails(idCriatura):Observable<Criatura[]>{
      let  url =this.baseUrl+'criaturasById/'+idCriatura;
      let header=new HttpHeaders();
      header.append('Content-Type', 'application/json');
      header.append('Access-Control-Allow-Origin', 'http://localhost');
      return this.http.get<Criatura[]>(url, { headers: header }).pipe(
        catchError(error => {
          console.log('Error en la solicitud:', error);
          // Puedes realizar acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
          return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
        }));    
      }

      getImagenesDetails(idCriatura):Observable<Recurso[]>{
        let  url =this.baseUrl+'criaturasImgById/'+idCriatura;
        let header=new HttpHeaders();
        header.append('Content-Type', 'application/json');
        header.append('Access-Control-Allow-Origin', 'http://localhost');
        return this.http.get<Recurso[]>(url, { headers: header }).pipe(
          catchError(error => {
            console.log('Error en la solicitud:', error);
            // Puedes realizar acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
            return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
          }));    
        }


}
