import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Recurso } from 'app/servicios/recursos.interface';
import { ConsumoServiciosService } from 'app/servicios/servicios-proceso-construcciones/consumo-servicios.services';

import { ProcesoConstrucciones } from 'app/servicios/servicios-proceso-construcciones/interface-proceso-construcciones';


@Component({
  selector: 'app-ver-detalle-proceso-construcciones',
  templateUrl: './ver-detalle-proceso-construcciones.component.html',
  styleUrls: ['./ver-detalle-proceso-construcciones.component.scss']
})
export class VerDetalleProcesoConstruccionesComponent implements OnInit {

  procesoConstruccionId: string;
  detalleProcesoConstrucciones:ProcesoConstrucciones = {
    cod: undefined,
    herramienta: '',
    descripcion: '',
    etapa: '',
    tecnicas:'',
    imagen: '',
    estudiosArqueologicos: '',
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
        this.procesoConstruccionId = params['id'];
        console.log('ID del proceso-construccion:', this.procesoConstruccionId);
        this.loadProcesoConstrucciones(this.procesoConstruccionId);
      });
    }
  
    loadProcesoConstrucciones(procesoConstruccionId){  
      this.consumoServiciosService.getImagenesDetails(procesoConstruccionId).subscribe(
        (recurso: Recurso) => {
          this.listaImagenes = recurso;
          console.log(this.listaImagenes.imagenes)
        },
        (error: any) => {
          console.log('Error al obtener los procesos-construcciones:', error);
        }
      ); 
    
    this.consumoServiciosService.getDetailsProcesosConstrucciones(procesoConstruccionId).subscribe(
      (ProcesoConstrucciones: ProcesoConstrucciones[]) => {
        this.detalleProcesoConstrucciones = ProcesoConstrucciones['Proceso_construccion'];
        this.historiaFinal = this.sanitizer.bypassSecurityTrustHtml(this.detalleProcesoConstrucciones.tecnicas);
      },
      (error: any) => {
        console.log('Error al obtener los procesos-construcciones:', error);
        // Realiza acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
      }
    );
    }

    regresar(){
      this.router.navigate(['/proceso-construcciones']);
    }
  

}
