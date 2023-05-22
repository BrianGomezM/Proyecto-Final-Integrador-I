import { Component, OnInit } from '@angular/core';
import { Construccion } from 'app/servicios/servicios-contruccion/interface-construccion';
import { ConsumoServiciosService } from '../../../servicios/servicios-contruccion/consumo-servicios.service';
@Component({
  selector: 'app-explorar-dioses',
  templateUrl: './explorar-dioses.component.html',
  styleUrls: ['./explorar-dioses.component.scss']
})
export class ExplorarDiosesComponent implements OnInit {
  tarjetasDuplicadas: any[] = [];
  public construcciones: Array<Construccion> = [];

  constructor(
    private consumoServiciosService: ConsumoServiciosService

  ) { }

  ngOnInit(): void {
    this.consumoServiciosService.getConstrucciones().subscribe(
      (construcciones: Construccion[]) => {
        this.construcciones = construcciones;
        console.log(this.construcciones['construcciones']);
        this.duplicarTarjetas(this.construcciones['construcciones']);
      },
      (error: any) => {
        console.log('Error al obtener las construcciones:', error);
        // Realiza acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
      }
    );
  }
  
  duplicarTarjetas(construcciones) {
    this.tarjetasDuplicadas = construcciones.map(construccion => {
      return {
        construccion: construccion,
        imagen: './assets/img/piramides-ginza.jpg'
      };
    });
  }

  
  }
  

