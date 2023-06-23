import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'app/models/usuario';
import { UsuarioService } from 'app/servicios/servicios-usuarios/usuarioService';
import { Router } from '@angular/router';
import { LoginService } from 'app/servicios/servicios-login/login.service';
import { TokenService } from 'app/servicios/servicios-login/tokenService';

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

  constructor(
    private router: Router, 
    public servicioUsuario:UsuarioService, 
    private formBuilder:FormBuilder, 
    public servicioLogin:LoginService,
    private servicioToken:TokenService
    ) {
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

   //Valida que las contraseñas sean iguales
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

  //Llama al servicio para hacer la actualización
   modificarUsuario(): void {
    if (this.usuarioForm.valid) {
        this.servicioUsuario.modificarUsuario(this.usuario).subscribe(respuesta => {
          console.log(respuesta['mensaje'])
          if(respuesta['mensaje'] === "El correo electrónico ya está registrado"){
            alert("Pruebe con otro correo");
          }
          else{
            //console.log(this.usuario);
            this.usuarioModificado.emit(this.usuario);
            this.usuario = new Usuario("", "", "", "", "", "");
            alert("Cuenta modificada exitosamente!");
            alert("Ingrese con sus nuevos datos");
            this.servicioToken.quitarToken();
            this.router.navigate(['/login']);
          }
        });
    } else {
      alert("Complete los campos requeridos");
      
    }
   }

   //Carga los usuarios que están en la base de datos
  cargarUsuarios() {
    var usuarioLocalStorage = this.servicioLogin.obtenerLocalStorageUsuario();
    console.log(usuarioLocalStorage);
    // Reiniciar el campo "contraseña" al cargar la página
    this.usuarioForm.patchValue({
      password: ''
    });
    //Compara el correo que se ingresó en el login con los que están en la base de datos,
    //al encontrarlo, obtengo los datos de ese usuario para mostrarlos en el formulario,
    //y así con más facilidad el usuario puede actualizar sus datos
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

  //Pasa la imagen cargada a base 64
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

  //funcionalidad al botón 'regresar', envía a la ruta /dashboard
  toBack(){
    window.location.href = '/#/dashboard';
  }
  

}
