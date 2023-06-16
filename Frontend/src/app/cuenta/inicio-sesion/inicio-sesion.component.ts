import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  AfterViewInit,
} from "@angular/core";
import { Usuario } from "app/models/usuario";
import { LoginService } from "app/servicios/servicios-login/login.service";
import { TokenService } from "app/servicios/servicios-login/tokenService";
//import { Token } from '../../models/token';
import { Router } from "@angular/router";

declare const gapi: any; // Declara gapi para evitar errores de tipo

@Component({
  selector: "app-login",
  templateUrl: "./inicio-sesion.component.html",
  styleUrls: ["./inicio-sesion.component.css"],
})
export class InicioSesionComponent implements OnInit, AfterViewInit {
  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  @Output() usuarioLogueado = new EventEmitter<Usuario>();

  usuario: Usuario = new Usuario("", "", "", "", "", "", "");

  //tokenRandom:Token = this.tokenService.procesarToken();

  ngOnInit(): void {
    console.log(this.usuario);
    //this.obtenerToken();
  }

  ngAfterViewInit() {
    this.loadGoogleSignIn();
  }

  hacerLogin() {
    this.loginService.login(this.usuario).subscribe((respuesta) => {
      console.log(respuesta);
      if (respuesta["respuesta"]["status"] === 200) {
        this.router.navigate(["dashboard"]);
        this.tokenService.guardarTokenAlLocal(respuesta["respuesta"]["token"]);
      } else {
        alert("Verifique sus credenciales de acceso");
      }
    });
  }

  loadGoogleSignIn() {
    const onGoogleSignInLoad = () => {
      gapi.load("auth2", () => {
        gapi.auth2.init({
          client_id:
            "961138140283-f807uodndst52h1vjtrufm086ihope4h.apps.googleusercontent.com", // Reemplaza con tu propio Client ID de Google
        });
      });
    };

    const script = document.createElement("script");
    script.onload = onGoogleSignInLoad;
    script.src = "https://apis.google.com/js/platform.js";
    document.head.appendChild(script);
  }

  loginWithGoogle() {
    try {
      console.log("doy click");
      const auth2 = gapi.auth2.getAuthInstance();

      auth2
        .signIn()
        .then((googleUser: any) => {
          const token = googleUser.getAuthResponse().id_token;

          // Aquí puedes realizar acciones adicionales con el token, como enviarlo al servidor
          console.log("respuesta de google:", token);
          // Ejemplo de redirección a la página principal después de iniciar sesión
          window.location.href = "#/dashboard";
        })
        .catch((error: any) => {
          console.log('error: ', error)
        });
    } catch (e) {
      console.log(e);
    }
  }
}
