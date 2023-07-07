import { Component, OnInit } from '@angular/core';
import { ProcesoConstrucciones } from '../../servicios/servicios-proceso-construcciones/interface-proceso-construcciones'
import { Router } from '@angular/router';
import { ConsumoServiciosService } from 'app/servicios/servicios-proceso-construcciones/consumo-servicios.services';
import { LeccionesService } from 'app/servicios-compartidos/lecciones.service';
import { SharedDataService } from 'app/servicios-compartidos/shared-data-service.service';
import { LoginService } from 'app/servicios/servicios-login/login.service';

@Component({
  selector: 'app-proceso-construcciones',
  templateUrl: './proceso-construcciones.component.html',
  styleUrls: ['./proceso-construcciones.component.css']
})
export class ProcesoConstruccionesComponent implements OnInit {

  tarjetasDuplicadas: any[] = [];
  public listaProcesosConstrucciones: Array<ProcesoConstrucciones> = [];
  isLoading=true;
  listaLecciones=[];
  usuarioCorreo = "";

  constructor(
    private router: Router,
    private consumoServiciosService: ConsumoServiciosService,
    private sharedDataService: SharedDataService,
    private leccionesService: LeccionesService,
    public servicioLogin:LoginService

  ) { }

  ngOnInit(): void {
    this.usuarioCorreo = this.servicioLogin.obtenerLocalStorageUsuario().correo;
    this.obtenerLecciones();
  }

  mostrarDetalles(procesosConstrucciones:ProcesoConstrucciones){
    this.router.navigate(['/detalle-proceso-construcciones', procesosConstrucciones.cod])
    this.insertarVisto(procesosConstrucciones);
  }

  async  obtenerLecciones(): Promise<void> {
    try {
      const lecciones: any[] = await this.leccionesService.getLecciones(this.usuarioCorreo, 5)
        .pipe()
        .toPromise();
      this.obtenerProceso();
      this.listaLecciones = lecciones['Lecciones'];
      console.log('Lecciones obtenidas:', this.listaLecciones);
  
      // Continuar con el flujo de tu código aquí
      // ...
    } catch (error) {
      console.error('Error al obtener los procesos de construccióm:', error);
    }
  }

  
  obtenerProceso(){
    this.sharedDataService.searchValue$.subscribe((searchValue: string) => {
      if (searchValue) {
        this.consumoServiciosService.getFiltro(searchValue).subscribe(
          (proceso_construcciones: ProcesoConstrucciones[]) => {
            this.listaProcesosConstrucciones = proceso_construcciones['proceso_construcciones'];
            this.cargarEstado();
            console.log(this.listaProcesosConstrucciones)
          },
          (error: any) => {
            console.log('Error al obtener las construcciones:', error);
          }
        );
      } else {
        this.consumoServiciosService.getProcesosConstrucciones().subscribe(
          (proceso_construcciones: ProcesoConstrucciones[]) => {
            this.listaProcesosConstrucciones = proceso_construcciones['proceso_construcciones'];
            this.cargarEstado();
           
          },
          (error: any) => {
            console.log('Error al obtener las construcciones:', error);
          }
        );
      }
    });
  }



  cargarEstado(){
    for(let i = 0; i<this.listaLecciones.length;i++){
      if(this.listaProcesosConstrucciones.find((d: ProcesoConstrucciones) => d.cod === this.listaLecciones[i].idLeccion)!== undefined){
        this.listaProcesosConstrucciones.find((d: ProcesoConstrucciones) => d.cod === this.listaLecciones[i].idLeccion).estado=true;
      }
    }
    for(let i = 0; i<this.listaProcesosConstrucciones.length;i++){
      if(this.listaProcesosConstrucciones[i].estado != true){
        this.listaProcesosConstrucciones[i].estado=false;
      }
    }
    console.log(this.listaProcesosConstrucciones)
  }

  insertarVisto(proceso_construcciones:ProcesoConstrucciones){
    if(!proceso_construcciones.estado){
      this.leccionesService.insertarLecciones(5,proceso_construcciones.cod,this.usuarioCorreo).subscribe(
        () => {
        },
        (error) => {
        }
      );
    }
  }
}


