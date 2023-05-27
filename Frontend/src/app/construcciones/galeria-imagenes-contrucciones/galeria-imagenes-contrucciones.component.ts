import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Construccion } from 'app/servicios/servicios-contruccion/interface-construccion';
import { ConsumoServiciosService } from '../../servicios/servicios-contruccion/consumo-servicios.service';
import { ImgConstruccion } from 'app/servicios/servicios-contruccion/interface-img-construccion';


@Component({
  selector: 'app-galeria-imagenes-contrucciones',
  templateUrl: './galeria-imagenes-contrucciones.component.html',
  styleUrls: ['./galeria-imagenes-contrucciones.component.css']
})
export class GaleriaImagenesContruccionesComponent implements OnInit {
  tarjetasDuplicadas: any[] = [];
  public construcciones: Array<Construccion> = [];
  public construccionesIMG: Array<ImgConstruccion> = [];
  public closeModal:string="";
  mostrarFormulario : boolean = false; 
  public datosArquitectura: any;
  public datosArquitecturaIMG: any;
  constructor(private consumoServiciosService: ConsumoServiciosService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.consumoServiciosService.getConstrucciones().subscribe(
      (construcciones: Construccion[]) => {
        this.construcciones = construcciones;
        this.duplicarTarjetas(this.construcciones['construcciones']);
        console.log("pRUEBA:" + this.tarjetasDuplicadas);
        
      },
      (error: any) => {
        console.log('Error al obtener las construcciones:', error);
        // Realiza acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
      }
    );
  }
  
  duplicarTarjetas(construcciones) {
    const promesas = construcciones.map((construccion) => {
      return this.consumoServiciosService.getConstruccionesIMG(construccion.cod).toPromise();
    });
  
    Promise.all(promesas)
      .then((respuestas: any[]) => {
        respuestas.forEach((respuesta, index) => {
          const imagenes = respuesta.construcciones.map((imagen) => imagen.imagen_url);
          this.tarjetasDuplicadas.push({
            construccion: construcciones[index],
            imagenes: imagenes
          });
        });
      })
      .catch((error: any) => {
        console.log('Error al obtener las imágenes de construcciones:', error);
        // Realiza acciones de manejo de errores aquí
      });
  }
  
  
  
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.cerrarFormulario();
    }
  }

  public abrirModal(varCod, varImg): void {
    this.datosArquitectura = varCod;
    this.datosArquitecturaIMG = varImg[0];
    console.log(this.datosArquitecturaIMG)
    this.mostrarFormulario = true;
  }
  cerrarFormulario(){
    this.mostrarFormulario = false;
  }

  
}
