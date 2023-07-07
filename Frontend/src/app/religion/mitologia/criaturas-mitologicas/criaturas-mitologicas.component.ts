import { Component, OnInit } from '@angular/core';
import { ConsumoServiciosService } from '../../../servicios/servicios-criaturas/consumo-servicios.service';
import { Criatura } from 'app/servicios/servicios-criaturas/interface-criaturas';
import { Router } from '@angular/router';
import { LeccionesService } from 'app/servicios-compartidos/lecciones.service';
import { LoginService } from 'app/servicios/servicios-login/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-criaturas-mitologicas',
  templateUrl: './criaturas-mitologicas.component.html',
  styleUrls: ['./criaturas-mitologicas.component.scss']
})
export class CriaturasMitologicasComponent implements OnInit {
  tarjetasDuplicadas: any[] = [];
  public listaCriaturas: Array<Criatura> = [];
  usuarioCorreo = "";
  listaLecciones=[];

  constructor(
    private leccionesService: LeccionesService,
    private router: Router,
    private consumoServiciosService: ConsumoServiciosService,
    public servicioLogin:LoginService

  ) { }

  ngOnInit(): void {
    this.usuarioCorreo = this.servicioLogin.obtenerLocalStorageUsuario().correo;

    this.obtenerLecciones();
  }


  mostrarDetalles(criatura:Criatura){
    this.router.navigate(['/detalles-criatura', criatura.cod]);
    this.insertarVisto(criatura)
  }

  cargarEstado(){
    for(let i = 0; i<this.listaLecciones.length;i++){
      if(this.listaCriaturas.find((c: Criatura) => c.cod === this.listaLecciones[i].idLeccion)!== undefined){
        this.listaCriaturas.find((c: Criatura) => c.cod === this.listaLecciones[i].idLeccion).estado=true;
      }
    }
    for(let i = 0; i<this.listaCriaturas.length;i++){
      if(this.listaCriaturas[i].estado != true){
        this.listaCriaturas[i].estado=false;
      }
    }
  }
  async  obtenerLecciones(): Promise<void> {
    try {
      const lecciones: any[] = await this.leccionesService.getLecciones(this.usuarioCorreo, 3)
        .pipe()
        .toPromise();
      this.obtenerCriaturas();
      this.listaLecciones = lecciones['Lecciones'];
      console.log('Lecciones obtenidas:', this.listaLecciones);
  
      // Continuar con el flujo de tu código aquí
      // ...
    } catch (error) {
      console.error('Error al obtener las criaturas:', error);
    }
  }


  obtenerCriaturas(){
    this.consumoServiciosService.getAllCriaturas().subscribe(
      (criaturas: Criatura[]) => {
        this.listaCriaturas = criaturas['criaturas'];
        console.log("entra criaturas")
        this.cargarEstado();
      },
      (error: any) => {
        console.log('Error al obtener las criaturas:', error);
        // Realiza acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
      }
    );
  }

  insertarVisto(criatura:Criatura){
    if(!criatura.estado){
      this.leccionesService.insertarLecciones(3,criatura.cod,this.usuarioCorreo).subscribe(
        () => {
        },
        (error) => {
        }
      );
    }
  }
}
