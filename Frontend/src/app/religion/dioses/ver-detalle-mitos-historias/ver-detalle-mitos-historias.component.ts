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
    });

    this.loadMitosHistoriasDetalles(this.mitosHistoriasId);
  }


  loadMitosHistoriasDetalles(mitosHistoriasId){  
    this.consumoServiciosService.getImagenesDetails(mitosHistoriasId).subscribe(
      (recurso: Recurso[]) => {
        this.listaImagenes.imagenes = recurso['imagenes'];
        console.log(this.listaImagenes.imagenes)
        if(mitosHistoriasId == 1){
          this.imagen = "./assets/mitos_historias/creacion_de_atum/2.jpg";
        }
        if(mitosHistoriasId == 2){
          this.imagen = "./assets/mitos_historias/creacion_de_atum/4.jpg";
        }
        if(mitosHistoriasId == 3){
          this.imagen = "./assets/mitos_historias/el_mito_de_nut/1.jpg";
        }
        if(mitosHistoriasId == 4){
          this.imagen = "./assets/mitos_historias/juicio_de_osiris/1.jpg";
        }
        if(mitosHistoriasId == 5){
          this.imagen = "./assets/mitos_historias/osiris_y_su_asesinato_por_su_hermano_set/1.jpg";
        }
        if(mitosHistoriasId == 6){
          this.imagen = "./assets/mitos_historias/princesa_scota/1.jpg";
        }
        if(mitosHistoriasId == 7){
          this.imagen = "./assets/mitos_historias/princesa_scota/1.jpg";
        }
        if(mitosHistoriasId == 8){
          this.imagen = "./assets/mitos_historias/viaje_del_sol/4.jpg";
        }
  
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
