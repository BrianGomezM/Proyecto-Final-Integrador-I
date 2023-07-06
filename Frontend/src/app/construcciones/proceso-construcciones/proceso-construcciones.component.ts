import { Component, OnInit } from '@angular/core';
import { ProcesoConstrucciones } from '../../servicios/servicios-proceso-construcciones/interface-proceso-construcciones'
import { Router } from '@angular/router';
import { ConsumoServiciosService } from 'app/servicios/servicios-proceso-construcciones/consumo-servicios.services';

@Component({
  selector: 'app-proceso-construcciones',
  templateUrl: './proceso-construcciones.component.html',
  styleUrls: ['./proceso-construcciones.component.css']
})
export class ProcesoConstruccionesComponent implements OnInit {

  tarjetasDuplicadas: any[] = [];
  listaProcesosConstrucciones: Array<ProcesoConstrucciones> = [];
  isLoading=true;

  constructor(
    private router: Router,
    private consumoServiciosService: ConsumoServiciosService

  ) { }

  ngOnInit(): void {
    this.cargarProcesoConstrucciones();
    console.log(this.listaProcesosConstrucciones);
  }

  cargarProcesoConstrucciones(){
    this.consumoServiciosService.getProcesosConstrucciones().subscribe(
      (procesos_construcciones: ProcesoConstrucciones[]) => {
        this.listaProcesosConstrucciones = procesos_construcciones['proceso_construcciones'];
      },
      (error: any) => {
        console.log('Error al obtener las herramientas', error);
      }
    );
  }

  mostrarDetalles(procesosConstrucciones:ProcesoConstrucciones){
    this.router.navigate(['/detalle-proceso-construcciones', procesosConstrucciones.cod])

  }

}
