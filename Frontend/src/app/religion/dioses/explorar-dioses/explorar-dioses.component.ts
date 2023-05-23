import { Component, OnInit } from '@angular/core';
import { ConsumoServiciosService } from '../../../servicios/servicios-dioses/consumo-servicios.service';
import { Dioses } from 'app/servicios/servicios-dioses/interface-dioses';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explorar-dioses',
  templateUrl: './explorar-dioses.component.html',
  styleUrls: ['./explorar-dioses.component.scss']
})
export class ExplorarDiosesComponent implements OnInit {
  tarjetasDuplicadas: any[] = [];
  public listaDioses: Array<Dioses> = [];

  constructor(
    private router: Router,
    private consumoServiciosService: ConsumoServiciosService

  ) { }

  ngOnInit(): void {
    this.consumoServiciosService.getAllGods().subscribe(
      (dioses: Dioses[]) => {
        this.listaDioses = dioses['dioses'];
        
      },
      (error: any) => {
        console.log('Error al obtener las construcciones:', error);
        // Realiza acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
      }
    );
  }

  mostrarDetalles(dios:Dioses){
    this.router.navigate(['/detalles-dios', dios.cod]);
  }
  }
  

