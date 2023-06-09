import { Component, OnInit } from '@angular/core';
import { MitosHistorias } from 'app/servicios/servicios-mitos-historias/interface-mitos-historias';
import { ConsumoServiciosService } from 'app/servicios/servicios-mitos-historias/consumo-servicios.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mitos-historia',
  templateUrl: './mitos-historia.component.html',
  styleUrls: ['./mitos-historia.component.scss']
})
export class MitosHistoriaComponent implements OnInit {
  tarjetasDuplicadas: any[] = [];
  public listaMitosHistorias: Array<MitosHistorias> = [];
  isLoading=true;
  constructor(
    private router: Router,
    private consumoServiciosService: ConsumoServiciosService

  ) { }

  ngOnInit(): void {
    this.obtenerMitosHistorias();
  }

    /**
 * Obtiene todos los mitos e historias.
 */
  obtenerMitosHistorias(){
    this.consumoServiciosService.getMitosHistorias().subscribe(
      (mitosHistorias: MitosHistorias[]) => {
        this.listaMitosHistorias = mitosHistorias['mitosHistorias'];
        
      },
      (error: any) => {
        console.log('Error al obtener los mitos e historias', error);
      }
    );
  }

}
