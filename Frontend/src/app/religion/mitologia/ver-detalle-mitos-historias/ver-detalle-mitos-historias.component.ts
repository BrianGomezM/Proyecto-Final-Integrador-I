import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Recurso } from 'app/servicios/recursos.interface';
import { ConsumoServiciosService } from 'app/servicios/servicios-mitos-historias/consumo-servicios.services';
import { MitosHistorias } from 'app/servicios/servicios-mitos-historias/interface-mitos-historias';


@Component({
  selector: 'app-ver-detalle-mitos-historias',
  templateUrl: './ver-detalle-mitos-historias.component.html',
  styleUrls: ['./ver-detalle-mitos-historias.component.scss']
})
export class VerDetalleMitosHistoriasComponent implements OnInit {

  mitosHistoriasId: string;
  detalleMitosHistorias:MitosHistorias = {
    cod: undefined,
    titulo: '',
    descripcion: '',
    contenido: '',
    imagen:'',
    categoria: '',
    diosesRelacionados: ''
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
      this.mitosHistoriasId = params['id'];
      console.log('ID del mito-historia:', this.mitosHistoriasId);
      this.loadMitosHistoriasDetalles(this.mitosHistoriasId);
    });
  }


  loadMitosHistoriasDetalles(mitosHistoriasId){  
    this.consumoServiciosService.getImagenesDetails(mitosHistoriasId).subscribe(
      (recurso: Recurso) => {
        this.listaImagenes = recurso;
        console.log(this.listaImagenes.imagenes)
      },
      (error: any) => {
        console.log('Error al obtener las mitos-historias:', error); 
      }
    ); 
    
    this.consumoServiciosService.getDetailsMitosHistorias(mitosHistoriasId).subscribe(
      (MitosHistorias: MitosHistorias[]) => {
        this.detalleMitosHistorias = MitosHistorias['Mito-historia'];
        this.historiaFinal = this.sanitizer.bypassSecurityTrustHtml(this.detalleMitosHistorias.contenido);
      },
      (error: any) => {
        console.log('Error al obtener los mitos-historias:', error);
        // Realiza acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
      }
    );

  }
  regresar(){
    this.router.navigate(['/mitos-historias']);
  }

}
