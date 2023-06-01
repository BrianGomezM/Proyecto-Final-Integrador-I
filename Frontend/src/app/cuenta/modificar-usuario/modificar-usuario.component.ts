import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'app/models/usuario';
import { UsuarioService } from 'app/servicios/servicios-usuarios/usuarioService';
import { Router } from '@angular/router';
import { LoginService } from 'app/servicios/servicios-login/login.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.scss']
})
export class ModificarUsuarioComponent implements OnInit {

  
  usuarioForm: FormGroup;

  usuarios : Usuario[]=[];



  usuario:Usuario = new Usuario("","","","","","","",1);
  @Output() usuarioModificado = new EventEmitter<Usuario>();

  constructor(private router: Router, public servicioUsuario:UsuarioService, private formBuilder:FormBuilder, public servicioLogin:LoginService) {
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
    this.cargarUsuarios();
  }

   modificarUsuario(): void {
  //   if (this.usuarioForm.valid) {
  //       this.servicioUsuario.crearUsuario(this.usuario).subscribe(respuesta => {
  //         console.log(respuesta['mensaje'])
  //         if(respuesta['mensaje'] === "El correo electrónico ya está registrado"){
  //           alert("Pruebe con otro correo");
  //         }
  //         else{
  //           //console.log(this.usuario);
  //           this.usuarioModificado.emit(this.usuario);
  //           this.usuario = new Usuario("", "", "", "", "", "");
  //           alert("Cuenta creada exitosamente!");
  //           this.router.navigate(['/login']);
  //         }
  //       });
  //   } else {
  //     alert("Complete los campos requeridos");
      
  //   }
   }

  cargarUsuarios() {
    var usuarioLocalStorage = this.servicioLogin.obtenerLocalStorageUsuario();
    console.log(usuarioLocalStorage);
    
    this.servicioUsuario.getUsuarios().subscribe((res: any) => {
      if (res && res.usuarios) {
        this.usuarios = res.usuarios;
        console.log(this.usuarios);
  
        // Buscar el usuario logueado en el arreglo de usuarios
        this.usuario = this.usuarios.find(u => u.correo === usuarioLocalStorage.correo);
        console.log(this.usuario);
      }
    });
  }
  

}
