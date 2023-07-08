import { Component, Input, NgModule, OnInit, Output } from '@angular/core';
import { Usuario } from 'app/models/usuario';
import { EventEmitter } from '@angular/core';
import { UsuarioService } from 'app/servicios/servicios-usuarios/usuarioService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})
export class RegistrarUsuarioComponent implements OnInit {

  @Output() usuarioCreado = new EventEmitter<Usuario>();
  @Output() usuarioEditado = new EventEmitter<Usuario>();

  @Input() usuario:Usuario = new Usuario("","","","","","","",1);

  usuarioForm: FormGroup;


  constructor(private router: Router, public servicioUsuario:UsuarioService, private formBuilder:FormBuilder) {
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: [Validators.nullValidator],
      correo: ['', Validators.required],
      password: [['', Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      urlAvatar: [Validators.nullValidator],
      sexo: [Validators.nullValidator],
    },{ validators: this.passwordMatchValidator });
   }

   passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
  
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  }

  ngOnInit(): void {

    console.log(this.usuario);

    // Reiniciar el campo "contraseña" al cargar la página
    this.usuarioForm.patchValue({
      password: ''
    });
  }

  archivoCargado(event:any): void {
    let archivo:File = event.target.files[0];
    console.log(archivo);

    (new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = () => resolve(reader.result?.toString() ?? "");
      reader.onerror = error => reject(error);
    })).then(result => this.usuario.urlAvatar = result);
  }


  //funciones 
  
  // agregarUsuario(): void {
    
  //   this.servicioUsuario.crearUsuario(this.usuario).subscribe(resp => {
  //     //console.log(this.usuario);
  //     this.usuarioCreado.emit(this.usuario);
  //     this.usuario = new Usuario("", "", "", "", "", "");
  //     alert("Cuenta creada exitosamente!");
  //   });
    
  // }

  agregarUsuario(): void {
    if (this.usuarioForm.valid) {
        this.servicioUsuario.crearUsuario(this.usuario).subscribe(respuesta => {
          console.log(respuesta['mensaje'])
          if(respuesta['mensaje'] === "El correo electrónico ya está registrado"){
            this.showNotification('top','center', 'danger', 'Pruebe con un correo diferente', 'dangerous') 
          }
          else{
            //console.log(this.usuario);
            this.usuarioCreado.emit(this.usuario);
            this.usuario = new Usuario("", "", "", "", "", "");
            alert("Cuenta creada exitosamente!");
            this.router.navigate(['login']);
          }
        });
    } else {
      alert("Complete los campos requeridos");
      
    }
  }
  
  toBack(){
    this.router.navigate(['/login']);
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
