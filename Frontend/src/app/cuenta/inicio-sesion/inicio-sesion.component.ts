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
declare var google:any;


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
      google.accounts.id.initialize({
        client_id:
          "961138140283-f807uodndst52h1vjtrufm086ihope4h.apps.googleusercontent.com",
        callback: this.handleCredentialResponse
      });
    };
  
    const script = document.createElement("script");
    script.onload = onGoogleSignInLoad;
    script.src = "https://accounts.google.com/gsi/client";
    document.head.appendChild(script);
  }
  

  loginWithGoogle() {
    try {
      console.log("doy click");
  
      google.accounts.id.prompt();
      google.accounts.id.get({ callback: this.handleCredentialResponse });
//      google.accounts.id.get({ callback: this.handleGoogleSignIn });
  
    } catch (e) {
      console.log(e);
    }
  }

  handleCredentialResponse(response:any){
    console.log(response);
    console.log(this.router);
    if(response.credential){
      localStorage.setItem("token",response.credential);
      document.location.href = "/#/dashboard";
    }
  }

  
  // handleGoogleSignIn(response: google.accounts.id.Respone) {
  //   const token = response.credential;
  
  //   // Aquí puedes realizar acciones adicionales con el token, como enviarlo al servidor
  //   console.log("respuesta de google:", token);
  //   // Ejemplo de redirección a la página principal después de iniciar sesión
  //   window.location.href = "#/dashboard";
  // }
}  

