import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'app/models/usuario';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from 'app/servicios/servicios-login/login.service';
declare var $: any;
@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {
  usuario: Usuario = new Usuario("", "", "", "", "", "");
  emailInvalid: boolean = false;
  
  constructor(private router: Router,private recuperarC: LoginService) { }
  email = new FormControl('', [Validators.required, Validators.email]);
  ngOnInit(): void {
  }

  recuperarClave() {
    if (this.usuario.correo) {
      if (this.validarEmail(this.usuario.correo)) {
        this.recuperarC.recuperarClave(this.usuario.correo)
          .subscribe(
            (resultado: any) => {
              if (resultado.estado === 200) {
                this.showNotification('top','center', 'success', 'Contraseña restablecida, verificar el correo', 'download_done')
              } else {
                this.showNotification('top','center', 'warning', 'Problemas al restablecer la contraseña, verificar los datos', 'error')
              }
            },
            (error: any) => {
              this.showNotification('top','center', 'danger', 'Error del sistema', 'dangerous')             
            }
          );
      }
    } else {
      this.emailInvalid = true;
    }
  }
  
  
  validarEmail(valor) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(valor); 
  }
  regresar() {
    this.router.navigate(["login"]);
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Campo Requerido';
    }
    return this.email.hasError('email') ? 'No es un correo electrónico válido' : '';
  }

  validarCorreo() {
    this.emailInvalid = true;
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
