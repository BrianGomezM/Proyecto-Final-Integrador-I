import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeccionesService } from 'app/servicios-compartidos/lecciones.service';
import { SharedDataService } from 'app/servicios-compartidos/shared-data-service.service';
import { LoginService } from 'app/servicios/servicios-login/login.service';
import { ConsumoServiciosService } from 'app/servicios/servicios-practicas/consumo-servicios.service';
import { Practicas } from 'app/servicios/servicios-practicas/interface-practicas';

@Component({
  selector: 'app-practicas-religiosas',
  templateUrl: './practicas-religiosas.component.html',
  styleUrls: ['./practicas-religiosas.component.scss']
})
export class PracticasReligiosasComponent implements OnInit {

  tarjetasDuplicadas: any[] = [];
  public listaPracticas: Array<Practicas> = [];
  usuarioCorreo = "";
  isLoading=true;
  listaLecciones=[];


  constructor(
    private router: Router,
    private consumoServiciosService: ConsumoServiciosService,
    private sharedDataService: SharedDataService,
    private leccionesService: LeccionesService,
    public servicioLogin:LoginService

  ) { }

  ngOnInit(): void {

    console.log(this.listaPracticas);

    this.usuarioCorreo = this.servicioLogin.obtenerLocalStorageUsuario().correo;
    this.obtenerLecciones();

  }

  mostrarDetalles(practicas:Practicas){
    this.router.navigate(['/detalle-practicas', practicas.cod]);
    this.insertarVisto(practicas);
  }

  async  obtenerLecciones(): Promise<void> {
    try {
      const lecciones: any[] = await this.leccionesService.getLecciones(this.usuarioCorreo, 6)
        .pipe()
        .toPromise();
      this.obtenerPracticas();
      this.listaLecciones = lecciones['Lecciones'];
      console.log('Lecciones obtenidas:', this.listaLecciones);
  
      // Continuar con el flujo de tu código aquí
      // ...
    } catch (error) {
      console.error('Error al obtener las prácticas-religiosas:', error);
    }
  }


  obtenerPracticas(){
    this.sharedDataService.searchValue$.subscribe((searchValue: string) => {
      if (searchValue) {
        this.consumoServiciosService.getFiltro(searchValue).subscribe(
          (practicas_religiosas: Practicas[]) => {
            this.listaPracticas = practicas_religiosas['practicas_religiosas'];
            this.cargarEstado();
            
          },
          (error: any) => {
            console.log('Error al obtener las construcciones:', error);
          }
        );
      } else {
        this.consumoServiciosService.getPracticas().subscribe(
          (practicas_religiosas: Practicas[]) => {
            this.listaPracticas = practicas_religiosas['practicas_religiosas'];
            console.log(this.listaPracticas);
            this.cargarEstado();
          },
          (error: any) => {
            console.log('Error al obtener las prácticas religiosas', error);
          }
        );
      }
    });
  }
  


  cargarEstado(){
    for(let i = 0; i<this.listaLecciones.length;i++){
      if(this.listaPracticas.find((d: Practicas) => d.cod === this.listaLecciones[i].idLeccion)!== undefined){
        this.listaPracticas.find((d: Practicas) => d.cod === this.listaLecciones[i].idLeccion).estado=true;
      }
    }
    for(let i = 0; i<this.listaPracticas.length;i++){
      if(this.listaPracticas[i].estado != true){
        this.listaPracticas[i].estado=false;
      }
    }
    console.log(this.listaPracticas)
  }

  insertarVisto(practicas:Practicas){
    if(!practicas.estado){
      this.leccionesService.insertarLecciones(6,practicas.cod,this.usuarioCorreo).subscribe(
        () => {
        },
        (error) => {
        }
      );
    }
  }


}
