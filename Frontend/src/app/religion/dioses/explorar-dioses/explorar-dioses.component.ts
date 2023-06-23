import { Component, OnInit } from '@angular/core';
import { ConsumoServiciosService } from '../../../servicios/servicios-dioses/consumo-servicios.service';
import { Dioses } from 'app/servicios/servicios-dioses/interface-dioses';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SharedDataService } from 'app/servicios-compartidos/shared-data-service.service';

@Component({
  selector: 'app-explorar-dioses',
  templateUrl: './explorar-dioses.component.html',
  styleUrls: ['./explorar-dioses.component.scss']
})
export class ExplorarDiosesComponent implements OnInit {
  tarjetasDuplicadas: any[] = [];
  public listaDioses: Array<Dioses> = [];
  isLoading=true;
  constructor(
    private router: Router,
    private consumoServiciosService: ConsumoServiciosService,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
  /**
 * Obtiene todos los dioses.
 */
  this.sharedDataService.searchValue$.subscribe((searchValue: string) => {
    if (searchValue) {
      this.consumoServiciosService.getFiltro(searchValue).subscribe(
        (dioses: Dioses[]) => {
          this.listaDioses = dioses['dioses'];
          
        },
        (error: any) => {
          console.log('Error al obtener las construcciones:', error);
        }
      );
    } else {
      this.consumoServiciosService.getAllGods().subscribe(
        (dioses: Dioses[]) => {
          this.listaDioses = dioses['dioses'];
        },
        (error: any) => {
          console.log('Error al obtener las construcciones:', error);
        }
      );
    }
  });
  }

  /**
 * Lleva al componente que permite ver cada Dios a detalle.
 * @param dios El objeto de tipo Dioses que representa al dios del cual se desean mostrar los detalles.
 */
  mostrarDetalles(dios:Dioses){
    this.router.navigate(['/detalles-dios', dios.cod]);
  }
  }
  

