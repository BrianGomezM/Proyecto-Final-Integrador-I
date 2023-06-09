import { Injectable } from '@angular/core';
import { Usuario } from "../../models/usuario";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment'
//import { RespuestaToken } from '../../models/respuestaToken';
import { catchError, throwError  } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class LoginService{

    constructor(private http: HttpClient) { }

    UrlBase:string = environment.baseUrl;

    public login(usuario: Usuario) {
        //console.log(usuario);
        let url = this.UrlBase + 'login';
        let header = new HttpHeaders();
        header = header.append('Content-Type', 'application/json');
        header = header.append('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
        header = header.append('Access-Control-Allow-Origin', 'http://localhost');
        
        return this.http.post<Usuario[]>(url, usuario, { headers: header }).pipe(
            catchError(error => {
                console.log('Error en la solicitud:', error);
                // Puedes realizar acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
                return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
            })
        ); 
    }
}

//     public login(usuario:Usuario){
//         //defino la url donde esta el servicio
//         console.log(usuario);
//         let  url = this.UrlBase + '/login';
//         let header=new HttpHeaders();
//         header.append('Content-Type','aplication/json')
//         header.append('Access-Control-Allow-Methods','"POST, GET,DELETE,PUT"')
//         header.append('Access-Control-Allow-Origin','http://localhost:8080');
//         //return this.http.post(url,JSON.stringify(usuario),{headers:this.tokenService.obtenerHeaders()}).pipe(
//             return this.http.post<Usuario[]>(url, usuario, { headers: header }).pipe(
//                 catchError(error => {
//                   console.log('Error en la solicitud:', error);
//                   // Puedes realizar acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
//                   return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
//             })); 
//     } 
// 
