import { Component, OnInit } from '@angular/core';
import { MitosHistorias } from 'app/servicios/servicios-mitos-historias/interface-mitos-historias';
import { ConsumoServiciosService } from 'app/servicios/servicios-mitos-historias/consumo-servicios.services';
import { Router } from '@angular/router';
import { LeccionesService } from 'app/servicios-compartidos/lecciones.service';
import { SharedDataService } from 'app/servicios-compartidos/shared-data-service.service';
import { LoginService } from 'app/servicios/servicios-login/login.service';

@Component({
  selector: 'app-mitos-historia',
  templateUrl: './mitos-historia.component.html',
  styleUrls: ['./mitos-historia.component.scss']
})
export class MitosHistoriaComponent implements OnInit {
  tarjetasDuplicadas: any[] = [];
  listaMitosHistorias: Array<MitosHistorias> = [];
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
    this.cargarMitosHistorias();
    console.log(this.listaMitosHistorias);
  }
 /**
 * Obtiene todos los mitos e historias.
 */
  cargarMitosHistorias(){
    this.consumoServiciosService.getMitosHistorias().subscribe(
      (mitos_historias: MitosHistorias[]) => {
        this.listaMitosHistorias = mitos_historias['mitos_historias'];
        console.log(this.listaMitosHistorias)
      },
      (error: any) => {
        console.log('Error al obtener los mitos e historias', error);
      }
    );
  }


  mostrarDetalles(mitosHistorias:MitosHistorias){
    this.router.navigate(['/detalles-mitos-historias', mitosHistorias.cod]);
  }




}
