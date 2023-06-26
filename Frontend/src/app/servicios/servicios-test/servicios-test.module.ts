import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Pregunta } from './interface-test';
import { TestUser } from './interface-test-usu';
import { UserLogin } from './interface-user-login';




@Injectable({
  providedIn: 'root'
})
export class ServiciosTestModule { 
  private baseUrl:string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getPreguntas():Observable<Pregunta[]>{
    let  url =this.baseUrl+'listarPreguntas';
    let header=new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', 'http://localhost');
    return this.http.get<Pregunta[]>(url, { headers: header }).pipe(
      catchError(error => {
        console.log('Error en la solicitud:', error);
        // Puedes realizar acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
        return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
      }));    
    }

  getUsuarioTest():Observable<TestUser[]>{
      let  url =this.baseUrl+'listarPodio';
      let header=new HttpHeaders();
      header.append('Content-Type', 'application/json');
      header.append('Access-Control-Allow-Origin', 'http://localhost');
      return this.http.get<TestUser[]>(url, { headers: header }).pipe(
        catchError(error => {
          console.log('Error en la solicitud:', error);
          // Puedes realizar acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
          return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
        }));    
      }

  insertarPodio(datos: any): Observable<any> {
      let url = this.baseUrl + 'registrarTest';
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.post(url, datos, { headers: headers }).pipe(
        catchError(error => {
          console.log('Error en la solicitud:', error);
          // Puedes realizar acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
          return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
        })
      );
    }
    
    userGetLogin(coduser):Observable<UserLogin[]>{
      let  url =this.baseUrl+'listUserTest/'+coduser;
      let header=new HttpHeaders();
      header.append('Content-Type', 'application/json');
      header.append('Access-Control-Allow-Origin', 'http://localhost');
      return this.http.get<UserLogin[]>(url, { headers: header }).pipe(
        catchError(error => {
          console.log('Error en la solicitud:', error);
          // Puedes realizar acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
          return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
        }));    
      }

}
