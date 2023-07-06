import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Construccion } from 'app/servicios/servicios-contruccion/interface-construccion';
import { ConsumoServiciosService } from '../../servicios/servicios-contruccion/consumo-servicios.service';
import { ImgConstruccion } from 'app/servicios/servicios-contruccion/interface-img-construccion';
import { Router } from '@angular/router';
import { LoginService } from 'app/servicios/servicios-login/login.service';
import { LeccionesService } from 'app/servicios-compartidos/lecciones.service';

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
  usuarioCorreo = "";
  constructor( private router: Router, private consumoServiciosService: ConsumoServiciosService, private elementRef: ElementRef,  public servicioLogin:LoginService,     private leccionesService: LeccionesService) { }

  ngOnInit(): void {
    this.usuarioCorreo = this.servicioLogin.obtenerLocalStorageUsuario().correo;
    this.consumoServiciosService.getConstrucciones(this.usuarioCorreo).subscribe(
      (construcciones: Construccion[]) => {
        this.construcciones = construcciones;
        this.duplicarTarjetas(this.construcciones['construcciones']);   
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
          const imagenes = respuesta.construcciones.map((imagen) => imagen.oidRecurso);
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
  public abrirModal(estadoLeccion, varCod): void {
    this.insertarVisto(estadoLeccion, varCod);
    this.router.navigate(['/detalleArq', varCod]);
  }

  insertarVisto(estado, cod){
    if(!estado){
      this.leccionesService.insertarLecciones(1,cod,this.usuarioCorreo).subscribe(
        () => {
        },
        (error) => {
        }
      );
    }
  }
}
