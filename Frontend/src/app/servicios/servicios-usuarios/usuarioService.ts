import { Injectable } from '@angular/core';
import { Usuario } from "../../models/usuario";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { TokenService } from '../servicios-login/tokenService';
import { catchError, throwError  } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })

export class UsuarioService{

    public usuarios:Array<Usuario> = [];

    constructor(
      private http: HttpClient,
      private tokenService: TokenService
    ) { }

    UrlBase:string = environment.baseUrl;

    public agregar(usuario : Usuario){
        this.usuarios.push(usuario); //agregando el usuario al arreglo
    }



    public crearUsuario(usuario:Usuario){

      console.log(usuario);
        //defino la url donde esta el servicio
        let  url = this.UrlBase + 'registrar_usuario';
        let header=new HttpHeaders();
        header.append('Content-Type','application/json')
        header.append('Access-Control-Allow-Origin','http://localhost');

           
        //return this.http.post(url,JSON.stringify(usuario),{headers:this.tokenService.obtenerHeaders()}).pipe(
        return this.http.post<Usuario[]>(url, usuario, { headers: header }).pipe(
          catchError(error => {
            console.log('Error en la solicitud:', error);
            // Puedes realizar acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
            return throwError('Ocurrió un error en la solicitud. Por favor, intenta nuevamente más tarde.');
          }));    
    }







    // public getUsuarios(){
    //     //defino la url donde esta el servicio
    //    let  url =this.UrlBase + '/admin/usuarios';
    //    return this.http.get<Usuario[]>(url,{headers:this.tokenService.obtenerHeaders()});
    // }
  

    // public editarUsuario(usuario:Usuario){

    //     //defino la url donde esta el servicio
    //     let  url = this.UrlBase + '/admin/usuarios/' + usuario.id;
    //     return this.http.put(url,JSON.stringify(usuario),{headers:this.tokenService.obtenerHeaders()});
    //   }

    // eliminarUsuario(usuario:Usuario){
    //     //defino la url donde esta el servicio
    //     let  url = this.UrlBase + '/admin/usuarios/'+ usuario.id;
    //     let header=new HttpHeaders();
    //     header.append('Content-Type','aplication/json')
    //     header.append('Access-Control-Allow-Origin','http://localhost');
     
    //     return this.http.get<Usuario[]>(url,{headers:header});
    //   }

}


