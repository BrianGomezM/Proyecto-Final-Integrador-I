import { Injectable } from '@angular/core';
import { Usuario } from "../../models/usuario";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { RespuestaToken } from '../../models/respuestaToken';

@Injectable({
    providedIn: 'root'
})

export class LoginService{

    constructor(private http: HttpClient) { }

    UrlBase:string = environment.baseUrl;

    public login(usuario:Usuario){
        //defino la url donde esta el servicio
        let  url = this.UrlBase + '/login';
        let header=new HttpHeaders();
        header.append('Content-Type','aplication/json')
        header.append('Access-Control-Allow-Methods','"POST, GET,DELETE,PUT"')
        header.append('Access-Control-Allow-Origin','http://localhost:8080');
        return this.http.post<RespuestaToken>(url,JSON.stringify(usuario),{headers:header});
    }
}
