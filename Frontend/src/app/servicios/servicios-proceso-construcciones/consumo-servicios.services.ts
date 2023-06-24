import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'environments/environment.prod';
import { ProcesoConstrucciones } from './interface-proceso-construcciones'
import { throwError } from 'rxjs';
import { Recurso } from '../recursos.interface';

@Injectable({
    providedIn: 'root'
  })
export class ConsumoServiciosService{
    private baseUrl:string = environment.baseUrl;
    constructor(private http: HttpClient) {}

 /**
 * Obtiene todas las herramientas con sus procesos de construcción.
 * @returns Un Observable que emite un arreglo de objetos de tipo MitosHistorias.
 */
 getProcesosConstrucciones():Observable<ProcesoConstrucciones[]>{
  let  url =this.baseUrl+'procesos_construcciones';
  let header=new HttpHeaders();
  header.append('Content-Type', 'application/json');
  header.append('Access-Control-Allow-Origin', 'http://localhost');
  return this.http.get<ProcesoConstrucciones[]>(url, { headers: header }).pipe(
    catchError(error => {
      console.log('Error en la solicitud:', error);
      // Puedes realizar acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
      return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
  }));    
}
/**
 * Obtiene los detalles de unas historia y mito específica.
 * @param idProcesosContrucciones El ID del dios del cual se desean obtener los detalles.
 * @returns Un Observable que emite un arreglo de objetos de tipo MitosHistorias.
 */

    getDetailsProcesosConstrucciones(idProcesosContrucciones):Observable<ProcesoConstrucciones[]>{
        let  url =this.baseUrl+'getProcesoConstruccionesById/'+idProcesosContrucciones;
        let header=new HttpHeaders();
        header.append('Content-Type', 'application/json');
        header.append('Access-Control-Allow-Origin', 'http://localhost');
        return this.http.get<ProcesoConstrucciones[]>(url, { headers: header }).pipe(
          catchError(error => {
            console.log('Error en la solicitud:', error);
            return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
        }));    
    }

    /**
 * Obtiene los detalles de las imágenes asociadas a un dios específico.
 * @param idProcesosContrucciones El ID del dios del cual se desean obtener los detalles de las imágenes.
 * @returns Un Observable que emite un arreglo de objetos de tipo Recurso.
 */

    getImagenesDetails(idProcesosContrucciones):Observable<Recurso>{
      let  url =this.baseUrl+'getProcesoConstruccionesImgById/'+idProcesosContrucciones;
      let header=new HttpHeaders();
      header.append('Content-Type', 'application/json');
      header.append('Access-Control-Allow-Origin', 'http://localhost');
      return this.http.get<Recurso>(url, { headers: header }).pipe(
        catchError(error => {
          console.log('Error en la solicitud:', error);
          return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
        }));    
  }




}