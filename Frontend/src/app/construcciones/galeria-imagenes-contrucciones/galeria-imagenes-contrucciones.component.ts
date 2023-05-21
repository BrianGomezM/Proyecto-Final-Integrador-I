import { Component, OnInit } from '@angular/core';
import { Construccion } from 'app/servicios/servicios-contruccion/interface-construccion';
import { ConsumoServiciosService } from '../../servicios/servicios-contruccion/consumo-servicios.service';
import { ModalComponent } from './modal/modal.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-galeria-imagenes-contrucciones',
  templateUrl: './galeria-imagenes-contrucciones.component.html',
  styleUrls: ['./galeria-imagenes-contrucciones.component.css']
})
export class GaleriaImagenesContruccionesComponent implements OnInit {
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
