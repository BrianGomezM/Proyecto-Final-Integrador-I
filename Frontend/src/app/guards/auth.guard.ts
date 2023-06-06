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

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.resultado);
      if (this.tokenService.obtenerToken() !== null) {
        this.router.navigate(["#/login"]);
        return false;
      }
      return true;
  }
  
}
