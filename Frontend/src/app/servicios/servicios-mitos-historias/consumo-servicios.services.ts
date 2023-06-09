import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'environments/environment.prod';
import { MitosHistorias } from './interface-mitos-historias'
import { throwError } from 'rxjs';
import { Recurso } from '../recursos.interface';

@Injectable({
    providedIn: 'root'
  })
export class ConsumoServiciosService{
    private baseUrl:string = environment.baseUrl;
    constructor(private http: HttpClient) {}

 /**
 * Obtiene todas las historias y mitos.
 * @returns Un Observable que emite un arreglo de objetos de tipo MitosHistorias.
 */
    getMitosHistorias():Observable<MitosHistorias[]>{
        let  url =this.baseUrl+'arquitectura';
        let header=new HttpHeaders();
        header.append('Content-Type', 'application/json');
        header.append('Access-Control-Allow-Origin', 'http://localhost');
        return this.http.get<MitosHistorias[]>(url, { headers: header }).pipe(
          catchError(error => {
            console.log('Error en la solicitud:', error);
            // Puedes realizar acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
            return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
        }));    
    }

/**
 * Obtiene los detalles de unas historia y mito específica.
 * @param idHistoriasMitos El ID del dios del cual se desean obtener los detalles.
 * @returns Un Observable que emite un arreglo de objetos de tipo MitosHistorias.
 */

    getDetailsMitosHistorias(idHistoriasMitos):Observable<MitosHistorias[]>{
        let  url =this.baseUrl+'mitosDiosesById/'+idHistoriasMitos;
        let header=new HttpHeaders();
        header.append('Content-Type', 'application/json');
        header.append('Access-Control-Allow-Origin', 'http://localhost');
        return this.http.get<MitosHistorias[]>(url, { headers: header }).pipe(
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
    getImagenesDetails(idHistoriasMitos):Observable<Recurso[]>{
        let  url =this.baseUrl+'diosesImgById/'+idHistoriasMitos;
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

