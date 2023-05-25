import { Component, Input, NgModule, OnInit, Output } from '@angular/core';
import { Usuario } from 'app/models/usuario';
import { EventEmitter } from '@angular/core';
import { UsuarioService } from 'app/servicios/servicios-usuarios/usuarioService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})
export class RegistrarUsuarioComponent implements OnInit {

  @Output() usuarioCreado = new EventEmitter<Usuario>();
  @Output() usuarioEditado = new EventEmitter<Usuario>();

  @Input() usuario:Usuario = new Usuario("","","","","","");

  usuarioForm: FormGroup;


  constructor(public servicioUsuario:UsuarioService, private formBuilder:FormBuilder) {
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: [Validators.nullValidator],
      correo: ['', Validators.required],
      password: ['', Validators.required],
      urlAvatar: [Validators.nullValidator]
    });
   }

  ngOnInit(): void {

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
      this.servicioUsuario.crearUsuario(this.usuario).subscribe(resp => {
        console.log(this.usuario);
        this.usuarioCreado.emit(this.usuario);
        this.usuario = new Usuario("", "", "", "", "", "");
        alert("Cuenta creada exitosamente!");
      });
    } else {
      alert("Complete los campos requeridos");
    }
  }
  



  

}
