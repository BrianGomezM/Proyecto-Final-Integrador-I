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
    console.log(this.listaMitosHistorias);

    this.usuarioCorreo = this.servicioLogin.obtenerLocalStorageUsuario().correo;
    this.obtenerLecciones();
  }

  mostrarDetalles(mitosHistorias:MitosHistorias){
    this.router.navigate(['/detalles-mitos-historias', mitosHistorias.cod]);
    this.insertarVisto(mitosHistorias);
  }

  async  obtenerLecciones(): Promise<void> {
    try {
      const lecciones: any[] = await this.leccionesService.getLecciones(this.usuarioCorreo, 4)
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


 /**
 * Obtiene todos los mitos e historias.
 */

 obtenerPracticas(){
  this.sharedDataService.searchValue$.subscribe((searchValue: string) => {
    if (searchValue) {
      this.consumoServiciosService.getFiltro(searchValue).subscribe(
        (mitos_historias: MitosHistorias[]) => {
          this.listaMitosHistorias = mitos_historias['mitos_historias'];
          this.cargarEstado();
          
        },
        (error: any) => {
          console.log('Error al obtener las construcciones:', error);
        }
      );
    } else {
      this.consumoServiciosService.getMitosHistorias().subscribe(
        (mitos_historias: MitosHistorias[]) => {
          this.listaMitosHistorias = mitos_historias['mitos_historias'];
          console.log(this.listaMitosHistorias);
          this.cargarEstado();
        },
        (error: any) => {
          console.log('Error al obtener los mitos-historias', error);
        }
      );
    }
  });
}

  cargarEstado(){
    for(let i = 0; i<this.listaLecciones.length;i++){
      if(this.listaMitosHistorias.find((d: MitosHistorias) => d.cod === this.listaLecciones[i].idLeccion)!== undefined){
        this.listaMitosHistorias.find((d: MitosHistorias) => d.cod === this.listaLecciones[i].idLeccion).estado=true;
      }
    }
    for(let i = 0; i<this.listaMitosHistorias.length;i++){
      if(this.listaMitosHistorias[i].estado != true){
        this.listaMitosHistorias[i].estado=false;
      }
    }
    console.log(this.listaMitosHistorias)
  }

  insertarVisto(mitosHistroias:MitosHistorias){
    if(!mitosHistroias.estado){
      this.leccionesService.insertarLecciones(4,mitosHistroias.cod,this.usuarioCorreo).subscribe(
        () => {
        },
        (error) => {
        }
      );
    }
  }






}
