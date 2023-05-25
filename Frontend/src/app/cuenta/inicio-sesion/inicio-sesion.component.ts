import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Usuario } from 'app/models/usuario';
import { LoginService } from 'app/servicios/servicios-login/login.service';
import { TokenService } from 'app/servicios/servicios-login/tokenService';
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
    private router: Router
  ) { }

  @Output() usuarioLogueado = new EventEmitter<Usuario>();

  usuario:Usuario = new Usuario("","","","","","")

  ngOnInit(): void {

    console.log(this.usuario)

  }
    

    hacerLogin() {
      this.loginService.login(this.usuario).subscribe(respuesta => {
        if (respuesta.respuesta.valida == 'S') {
          this.tokenService.guardarToken(respuesta.respuesta.token, respuesta.respuesta.idUsuario);
          this.router.navigate([""]);
        }
        else {
          alert("No se pudo iniciar sesión");
        }
      });
    }
  

  }


