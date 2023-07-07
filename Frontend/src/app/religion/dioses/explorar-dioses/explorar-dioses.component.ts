import { Component, OnInit } from '@angular/core';
import { ConsumoServiciosService } from '../../../servicios/servicios-dioses/consumo-servicios.service';
import { Dioses } from 'app/servicios/servicios-dioses/interface-dioses';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SharedDataService } from 'app/servicios-compartidos/shared-data-service.service';
import { LeccionesService } from 'app/servicios-compartidos/lecciones.service';
import { LoginService } from 'app/servicios/servicios-login/login.service';

@Component({
  selector: 'app-explorar-dioses',
  templateUrl: './explorar-dioses.component.html',
  styleUrls: ['./explorar-dioses.component.scss']
})
export class ExplorarDiosesComponent implements OnInit {
  tarjetasDuplicadas: any[] = [];
  public listaDioses: Array<Dioses> = [];
  isLoading=true;
  usuarioCorreo = "";
  listaLecciones=[];

  constructor(
    private router: Router,
    private consumoServiciosService: ConsumoServiciosService,
    private sharedDataService: SharedDataService,
    private leccionesService: LeccionesService,
    public servicioLogin:LoginService
  ) { }

  ngOnInit(): void {
  /**
 * Obtiene todos los dioses.
 */
  this.usuarioCorreo = this.servicioLogin.obtenerLocalStorageUsuario().correo;
  this.obtenerLecciones();
  }

  /**
 * Lleva al componente que permite ver cada Dios a detalle.
 * @param dios El objeto de tipo Dioses que representa al dios del cual se desean mostrar los detalles.
 */
  mostrarDetalles(dios:Dioses){
    this.router.navigate(['/detalles-dios', dios.cod]);
    this.insertarVisto(dios)
  }

  async  obtenerLecciones(): Promise<void> {
    try {
      const lecciones: any[] = await this.leccionesService.getLecciones(this.usuarioCorreo, 2)
        .pipe()
        .toPromise();
      this.obtenerDioses();
      this.listaLecciones = lecciones['Lecciones'];
      console.log('Lecciones obtenidas:', this.listaLecciones);
  
      // Continuar con el flujo de tu código aquí
      // ...
    } catch (error) {
      console.error('Error al obtener las criaturas:', error);
    }
  }

  obtenerDioses(){
    this.sharedDataService.searchValue$.subscribe((searchValue: string) => {
      if (searchValue) {
        this.consumoServiciosService.getFiltro(searchValue).subscribe(
          (dioses: Dioses[]) => {
            this.listaDioses = dioses['dioses'];
            this.cargarEstado();
            console.log(this.listaDioses)
          },
          (error: any) => {
            console.log('Error al obtener las construcciones:', error);
          }
        );
      } else {
        this.consumoServiciosService.getAllGods().subscribe(
          (dioses: Dioses[]) => {
            this.listaDioses = dioses['dioses'];
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
      if(this.listaDioses.find((d: Dioses) => d.cod === this.listaLecciones[i].idLeccion)!== undefined){
        this.listaDioses.find((d: Dioses) => d.cod === this.listaLecciones[i].idLeccion).estado=true;
      }
    }
    for(let i = 0; i<this.listaDioses.length;i++){
      if(this.listaDioses[i].estado != true){
        this.listaDioses[i].estado=false;
      }
    }
    console.log(this.listaDioses)
  }

  insertarVisto(dios:Dioses){
    if(!dios.estado){
      this.leccionesService.insertarLecciones(2,dios.cod,this.usuarioCorreo).subscribe(
        () => {
        },
        (error) => {
        }
      );
    }
  }
}

