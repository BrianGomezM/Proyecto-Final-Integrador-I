import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Usuario } from 'app/models/usuario';
import { TokenService } from 'app/servicios/servicios-login/tokenService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {

  }

  resultado:Usuario[];

  obtenerInfo(usuario: Usuario[]){
      this.resultado = usuario;
  }

  //método que impide acceder a rutas específicas de la página cuando el usuario no esté logeado (no haya token)
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //console.log(this.tokenService.obtenerToken());
      if (!this.tokenService.obtenerToken()) {
        this.router.navigate(["login"]);
        return false;
      }
      return true;
  }
  
}
