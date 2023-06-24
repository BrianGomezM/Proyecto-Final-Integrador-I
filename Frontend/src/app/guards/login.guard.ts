import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Usuario } from 'app/models/usuario';
import { TokenService } from 'app/servicios/servicios-login/tokenService';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {

  }

  //método que impide acceder a login cuando el usuario esté logeado (haya token), para evitar doble acceso a la aplicación.
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenService.obtenerToken()) {
      // Si hay un token presente, redirige a la página de inicio (dashboard)
      return this.router.parseUrl('/dashboard');
    } else {
      // Si no hay token, permite el acceso normalmente
      return true;
    }
  }
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //     console.log(this.tokenService.obtenerToken());
  //     if (!this.tokenService.obtenerToken()) {   
  //       return false;
  //     }
  //     this.router.navigate(["dashboard"]);
  //     return true;
  // }
  
}
