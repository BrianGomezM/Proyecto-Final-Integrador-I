import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumoServiciosService } from 'app/servicios/servicios-contruccion/consumo-servicios.service';
import { Construccion } from 'app/servicios/servicios-contruccion/interface-construccion';
import { ImgConstruccion } from 'app/servicios/servicios-contruccion/interface-img-construccion';

@Component({
  selector: 'app-ver-detalle-arquitectura',
  templateUrl: './ver-detalle-arquitectura.component.html',
  styleUrls: ['./ver-detalle-arquitectura.component.css']
})
export class VerDetalleArquitecturaComponent implements OnInit {
  public construcciones: Array<Construccion> = [];
  public construccionesIMG: Array<ImgConstruccion> = [];
  tarjetasDuplicadas: any[] = [];
  isLoading: boolean = true;
  oidArq: number;

  constructor(private route: ActivatedRoute, private router: Router, private consumoServiciosService: ConsumoServiciosService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.oidArq = params['id'];
    });

    this.consumoServiciosService.getConstruccionesCod(this.oidArq).subscribe(
      (resultado) => {
        this.construcciones.push(resultado['construccion']);
      },
      (error: any) => {
        console.log('Error al obtener las construccion:', error);
        // Realiza acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
      }
    );

    this.consumoServiciosService.getConstruccionesIMG(this.oidArq).subscribe(
      (resultado: ImgConstruccion[]) => {
        this.construccionesIMG = resultado['construcciones'];
      },
      (error: any) => {
        console.log('Error al obtener las imágenes:', error);
        // Realiza acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
      }
    );
  }

  regresar() {
    this.router.navigate(['/galeria-imagenes-construcciones']);
  }
}
