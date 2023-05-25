import { Injectable } from '@angular/core';
import { HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Token } from '../../models/token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  private estaLogueado = new BehaviorSubject<boolean>(false);
  estaLogueado$ = this.estaLogueado.asObservable();


  guardarToken(valor:string, idUsuario:number) {
    const item = JSON.stringify({ valor, idUsuario });
    localStorage.setItem('token', item);
    this.estaLogueado.next(true);
  }

  quitarToken() {
    localStorage.removeItem('token');
    this.estaLogueado.next(false);
  }

  obtenerToken() :string {
    let respuesta = "";
    const item = localStorage.getItem('token');
    if (item) {
      this.estaLogueado.next(true);
      //respuesta = JSON.parse(item);
      respuesta = item;
    }
    else {
      this.estaLogueado.next(false);
    }

    return respuesta;
  }

  obtenerHeaders() :HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'aplication/json',
      'x-token': this.obtenerToken(),
      'Access-Control-Allow-Methods': '"POST, GET,DELETE,PUT"',
      'Access-Control-Allow-Origin': 'http://localhost',
    });
  }

  obtenerTokenToken() :Token {
    let respuesta = new Token(0,'','');
    const item = localStorage.getItem('token');
    if (item) {
      //this.estaLogueado.next(true);
      respuesta = JSON.parse(item);
      //respuesta = item;
    }
    else {
      //this.estaLogueado.next(false);
    }
  
    return respuesta;
  }
  
}