import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
// import { HttpHeaders} from '@angular/common/http';
// import { BehaviorSubject } from 'rxjs';
 import { Token } from '../../models/token';
//import { Usuario } from 'app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private estaLogueado = new BehaviorSubject<boolean>(false);
  estaLogueado$ = this.estaLogueado.asObservable();

  constructor(private http: HttpClient) { }

  private baseUrl:string = environment.baseUrl;

  obtenerToken() {
      let  url =this.baseUrl+'token';
      let header=new HttpHeaders();
      header.append('Content-Type', 'application/json');
      header.append('Access-Control-Allow-Origin', 'http://localhost');
      return this.http.get<Token[]>(url, { headers: header }).pipe(
        catchError(error => {
          console.log('Error en la solicitud:', error);
          // Puedes realizar acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
          return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
        }));    
      }

  // procesarToken() {

  //   this.obtenerToken().subscribe(
  //     (token: Token[]) => {
  //       return token;
  //     },
  //     (error) => {
  //       console.log('Error al obtener el token:', error);
  //     }
  //   );
  // }
  
  

    // guardarToken() {
    //   this.obtenerToken().subscribe(
    //     (token: Token[]) => {
    //       const item = JSON.stringify(token);
    //       localStorage.setItem('token', item);
    //       this.estaLogueado.next(true);
    //     },
    //     (error) => {
    //       console.log('Error al obtener el token:', error);
    //     }
    //   );
    // }

    guardarTokenAlLocal(tokenA: string) {
      console.log(tokenA);
      const item = JSON.stringify({ tokenA });
      localStorage.setItem('token', item);
    }

}


  // private estaLogueado = new BehaviorSubject<boolean>(false);
  // estaLogueado$ = this.estaLogueado.asObservable();


  // guardarToken(valor:string, idUsuario:number) {
  //   const item = JSON.stringify({ valor, idUsuario });
  //   localStorage.setItem('token', item);
  //   this.estaLogueado.next(true);
  // }

  // quitarToken() {
  //   localStorage.removeItem('token');
  //   this.estaLogueado.next(false);
  // }

  // obtenerToken() :string {
  //   let respuesta = "";
  //   const item = localStorage.getItem('token');
  //   if (item) {
  //     this.estaLogueado.next(true);
  //     //respuesta = JSON.parse(item);
  //     respuesta = item;
  //   }
  //   else {
  //     this.estaLogueado.next(false);
  //   }

  //   return respuesta;
  // }

  // obtenerHeaders() :HttpHeaders {
  //   return new HttpHeaders({
  //     'Content-Type': 'aplication/json',
  //     'x-token': this.obtenerToken(),
  //     'Access-Control-Allow-Methods': '"POST, GET,DELETE,PUT"',
  //     'Access-Control-Allow-Origin': 'http://localhost',
  //   });
  // }

  // obtenerTokenToken() :Token {
  //   let respuesta = new Token(0,'','');
  //   const item = localStorage.getItem('token');
  //   if (item) {
  //     //this.estaLogueado.next(true);
  //     respuesta = JSON.parse(item);
  //     //respuesta = item;
  //   }
  //   else {
  //     //this.estaLogueado.next(false);
  //   }
  
  //   return respuesta;
  // }
