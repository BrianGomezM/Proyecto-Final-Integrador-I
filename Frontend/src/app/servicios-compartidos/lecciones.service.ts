import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'environments/environment.prod';
import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LeccionesService {
  private baseUrl:string = environment.baseUrl;
  constructor(private http: HttpClient) {}

    getLecciones(correo, modulo):Observable<any[]>{
    let  url =this.baseUrl+'leccionesVistas/' + correo + '/' + modulo;
    let header=new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', 'http://localhost');
    return this.http.get<any[]>(url, { headers: header }).pipe(
      catchError(error => {
        console.log('Error en la solicitud:', error);
        return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
      }));    
    }


    insertarLecciones(id_tabla,id_leccion,correo){
      var data = {
        id_tabla: id_tabla,
        id_leccion: id_leccion,
        correo: correo,
      };

      let  url =this.baseUrl+'registrar_leccion';
      let header=new HttpHeaders();
      header.append('Content-Type', 'application/json');
      header.append('Access-Control-Allow-Origin', 'http://localhost');
      return this.http.post(url, data, { headers: header }).pipe(
        catchError(error => {
          console.log('Error en la solicitud:', error);
          // Puedes realizar acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
          return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
        })
      );
    }

}
