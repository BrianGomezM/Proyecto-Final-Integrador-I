import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Recurso } from 'app/servicios/recursos.interface';
import { ConsumoServiciosService } from 'app/servicios/servicios-practicas/consumo-servicios.service';
import { Practicas } from 'app/servicios/servicios-practicas/interface-practicas';


@Component({
  selector: 'app-ver-detalle-practicas',
  templateUrl: './ver-detalle-practicas.component.html',
  styleUrls: ['./ver-detalle-practicas.component.scss']
})
export class VerDetallePracticasComponent implements OnInit {

  practicasId : string;
  detallePracticas:Practicas = {
    cod: undefined,
    nombre: '',
    descripcion: '',
    contenido: '',
    imagen:'',
    diosesRelacionados: '',
    estado: false
  };

  imagen:string= "";


  historiaFinal:SafeHtml;

  listaImagenes:Recurso = {
    imagenes: []
  };

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private consumoServiciosService: ConsumoServiciosService) { }

    ngOnInit(): void {

      this.route.params.subscribe(params => {
        this.practicasId = params['id'];
        console.log('ID de la practica:', this.practicasId);
        this.loadPracticasDetalles(this.practicasId);
      });
    }

    loadPracticasDetalles(practicasId){  
      this.consumoServiciosService.getImagenesDetails(practicasId).subscribe(
        (recurso: Recurso) => {
          this.listaImagenes = recurso;
          console.log(this.listaImagenes.imagenes)
        },
        (error: any) => {
          console.log('Error al obtener las prácticas religiosas:', error); 
        }
      ); 

    this.consumoServiciosService.getDetailsPracticas(practicasId).subscribe(
      (practicas: Practicas[]) => {
        this.detallePracticas = practicas['Practicas_religiosas'];
        this.historiaFinal = this.sanitizer.bypassSecurityTrustHtml(this.detallePracticas.contenido);
      },
      (error: any) => {
        console.log('Error al obtener la práctica religiosa:', error);
        // Realiza acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
      }
    );

  }
  regresar(){
    this.router.navigate(['/practicas-religiosas']);
  }
}
