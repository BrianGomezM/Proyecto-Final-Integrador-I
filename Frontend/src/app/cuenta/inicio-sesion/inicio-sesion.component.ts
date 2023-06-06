import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Usuario } from 'app/models/usuario';
import { LoginService } from 'app/servicios/servicios-login/login.service';
import { TokenService } from 'app/servicios/servicios-login/tokenService';
//import { Token } from '../../models/token';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  @Output() usuarioLogueado = new EventEmitter<Usuario>();

  usuario:Usuario = new Usuario("","","","","","","");

  //tokenRandom:Token = this.tokenService.procesarToken();

  ngOnInit(): void {
    console.log(this.usuario)
    //this.obtenerToken();
  }

      hacerLogin() {
        
      this.loginService.login(this.usuario).subscribe(respuesta => {
        console.log(respuesta);
        if (respuesta['respuesta']['status'] === 200){
          this.router.navigate(["dashboard"]);
          this.tokenService.guardarTokenAlLocal(respuesta['respuesta']['token']);
        }
        else{
          alert("Verifique sus credenciales de acceso")
        }
      });
    }
  

//   hacerLogin() {
//     this.tokenService.guardarToken();
//     this.loginService.login(this.usuario).subscribe(respuesta => {
//       if (this.tokenService.obtenerToken() ) {
//         this.tokenService.guardarToken(respuesta.respuesta.token, respuesta.respuesta.idUsuario);
//         this.router.navigate([""]);
//       }
//       else {
//         alert("No se pudo iniciar sesión");
//       }
//     });
//   }
// }

//   obtenerToken() {
//     this.tokenService.proc().subscribe(
//       (token: Token) => {
//         this.tokenRandom = token;
//         // Aquí puedes realizar las acciones necesarias con el token
//       },
//       (error) => {
//         console.log('Error al obtener el token:', error);
//       }
//     );
//   }
// }

    

    // hacerLogin() {
    //   this.loginService.login(this.usuario).subscribe(respuesta => {
        
    //   });
    // }
  

  }


