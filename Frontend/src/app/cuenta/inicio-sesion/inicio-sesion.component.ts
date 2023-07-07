import { Component, EventEmitter, OnInit, Output, AfterViewInit } from "@angular/core";
import { Usuario } from "app/models/usuario";
import { LoginService } from "app/servicios/servicios-login/login.service";
import { TokenService } from "app/servicios/servicios-login/tokenService";
import { Router } from "@angular/router";
import { UsuarioService } from "app/servicios/servicios-usuarios/usuarioService";

declare var google:any;
declare var $: any;

//declare const gapi: any; // Declara gapi para evitar errores de tipo

@Component({
  selector: "app-login",
  templateUrl: "./inicio-sesion.component.html",
  styleUrls: ["./inicio-sesion.component.css"],
})
export class InicioSesionComponent implements OnInit, AfterViewInit {
  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private servicioUsuario: UsuarioService,
    private router: Router
  ) {}

  @Output() usuarioLogueado = new EventEmitter<Usuario>();

  usuario: Usuario = new Usuario("", "", "", "", "", "", "");

  //Con esta variable vamos a registrar implícitamente el usuario que inicie sesión con google
  //siempre y cuando no esté registrado.
  usuarioGoogleToRegistrar: Usuario = new Usuario();

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
      //console.log(respuesta);
      if (respuesta["respuesta"]["status"] === 200) {
        this.router.navigate(["dashboard"]);
        this.tokenService.guardarTokenAlLocal(respuesta["respuesta"]["token"]);
      } else {
        this.showNotification('top','center', 'danger', 'Verifique sus credenciales de acceso', 'dangerous')    
        //alert("Verifique sus credenciales de acceso");
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

  decodeJwtResponse(credential) {
    const tokenParts = credential.split('.');
    const payload = tokenParts[1];
    const decodedPayload = atob(payload);
    const parsedPayload = JSON.parse(decodedPayload);
    return parsedPayload;
  }
  


  loginWithGoogle() {
    document.cookie = "g_state=; domain=localhost; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    const handleCredentialResponse = (response: any) => {
      //const credential = response.credential;
      const token = response.credential;
      const responsePayload = this.decodeJwtResponse(response.credential);
  
      if (token) {
        // Aquí puedes realizar acciones adicionales con el token, como enviarlo al servidor
        console.log("Respuesta de Google:", token);
        // Ejemplo de redirección a la página principal después de iniciar sesión
        //this.router.navigate(["dashboard"]);

  
        console.log("ID: " + responsePayload.sub);
        console.log('Full Name: ' + responsePayload.name);
        console.log('Given Name: ' + responsePayload.given_name);
        console.log('Family Name: ' + responsePayload.family_name);
        console.log("Image URL: " + responsePayload.picture);
        console.log("Email: " + responsePayload.email);

        this.usuarioGoogleToRegistrar.nombre = responsePayload.given_name;
        this.usuarioGoogleToRegistrar.apellido = responsePayload.family_name;
        this.usuarioGoogleToRegistrar.correo = responsePayload.email;
        this.usuarioGoogleToRegistrar.urlAvatar = responsePayload.picture;
        this.usuarioGoogleToRegistrar.estado = 1;
        this.servicioUsuario.crearUsuario(this.usuarioGoogleToRegistrar).subscribe(respuesta => {
          console.log(respuesta['mensaje'])
          if(respuesta['mensaje'] === "El correo electrónico ya está registrado"){
            //alert("No es necesario registrar");
            this.loginService.guardarUsuarioAlLocalStorage(this.usuarioGoogleToRegistrar);
          }
          else{
            console.log(this.usuarioGoogleToRegistrar);
            this.usuario = new Usuario("", "", "", "", "", "");
            //alert("Cuenta creada exitosamente!");
            this.loginService.guardarUsuarioAlLocalStorage(this.usuarioGoogleToRegistrar);
          }
        });

      } else {
        console.log("No se pudo obtener el token de ID de Google");
      }

      if(response.credential){
        localStorage.setItem("token",response.credential);
        //window.location.href = '/#/dashboard';
        //document.location.href = "dashboard";
        this.router.navigate(["dashboard"]);
      }

    };
    
    
  
    google.accounts.id.initialize({
      client_id: "961138140283-f807uodndst52h1vjtrufm086ihope4h.apps.googleusercontent.com", // Reemplaza con tu propio Client ID de Google
      callback: handleCredentialResponse
    });
  
    google.accounts.id.prompt();
  }


  showNotification(from, align, type, mensaje, icon){
    // const type = ['','info','success','warning','danger'];

     const color = Math.floor((Math.random() * 4) + 1);

     $.notify({
         icon: "Notificación",
         message: mensaje
     },{
         type:  type,
         timer: 4000,
         placement: {
             from: from,
             align: align
         },
         template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
           '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
           '<i class="material-icons" data-notify="icon">'+icon+'</i> ' +
           '<span data-notify="title">{1}</span> ' +
           '<span data-notify="message">{2}</span>' +
           '<div class="progress" data-notify="progressbar">' +
             '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
           '</div>' +
           '<a href="{3}" target="{4}" data-notify="url"></a>' +
         '</div>'
     });
 }
}

