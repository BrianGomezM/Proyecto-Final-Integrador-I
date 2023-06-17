import { Component, EventEmitter, OnInit, Output, AfterViewInit } from "@angular/core";
import { Usuario } from "app/models/usuario";
import { LoginService } from "app/servicios/servicios-login/login.service";
import { TokenService } from "app/servicios/servicios-login/tokenService";
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
    // Configura la cookie "g_state" con un valor vacío
    

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
    const handleClientLoad = () => {
      google.accounts.id.initialize({
        client_id: "961138140283-f807uodndst52h1vjtrufm086ihope4h.apps.googleusercontent.com", // Reemplaza con tu propio Client ID de Google
        callback: this.loginWithGoogle.bind(this)
      });
    };
  
    const script = document.createElement("script");
    script.onload = handleClientLoad;
    script.src = "https://accounts.google.com/gsi/client"
    document.head.appendChild(script);
  }


  loginWithGoogle() {
    document.cookie = "g_state=; domain=localhost; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    const handleCredentialResponse = (response: any) => {
      const credential = response.credential;
      const token = credential ? credential.id : null;
  
      if (token) {
        // Aquí puedes realizar acciones adicionales con el token, como enviarlo al servidor
        console.log("Respuesta de Google:", token);
        // Ejemplo de redirección a la página principal después de iniciar sesión
        this.router.navigate(["dashboard"]);
      } else {
        console.log("No se pudo obtener el token de ID de Google");
      }

      if(response.credential){
        localStorage.setItem("token",response.credential);
        document.location.href = "/#/dashboard";
      }

    };
    
  
    google.accounts.id.initialize({
      client_id: "961138140283-f807uodndst52h1vjtrufm086ihope4h.apps.googleusercontent.com", // Reemplaza con tu propio Client ID de Google
      callback: handleCredentialResponse
    });
  
    google.accounts.id.prompt();
  }
}

