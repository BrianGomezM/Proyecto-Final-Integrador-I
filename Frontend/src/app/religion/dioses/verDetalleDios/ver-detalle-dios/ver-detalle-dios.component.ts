import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsumoServiciosService } from '../../../../servicios/servicios-dioses/consumo-servicios.service';
import { Dioses } from 'app/servicios/servicios-dioses/interface-dioses';
import { Router } from '@angular/router';
import { Recurso } from 'app/servicios/recursos.interface';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-ver-detalle-dios',
  templateUrl: './ver-detalle-dios.component.html',
  styleUrls: ['./ver-detalle-dios.component.scss']
})
export class VerDetalleDiosComponent implements OnInit {
  diosId: string;
  id:number;
  detalleDios:Dioses = {
    cod: undefined,
    nombre: '',
    representacion: '',
    historia: '',
    imagen: '',
    roles: ''
  };

  listaModelos:string[]=[ "assets/Modelos3D/RA/index.html",
                          "assets/Modelos3D/OSIRIS/index.html",
                          "assets/Modelos3D/ISIS/index.html",
                          "assets/Modelos3D/HORUS/index.html",
                          "assets/Modelos3D/ANUBIS/index.html",
                          "assets/Modelos3D/THOTH/index.html",
                          "assets/Modelos3D/HATHOR/index.html",
                          "assets/Modelos3D/SETH/index.html"
                        ]
  modelo:SafeResourceUrl;
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
      this.diosId = params['id'];
      this.id=Number(this.diosId);
      console.log(this.listaModelos);
    });

    this.loadGodsDetails(this.diosId)
    this.modelo=this.obtenerModelo()
    console.log("Modelo: ", this.modelo);
  }

obtenerModelo(){
  var result=this.sanitizer.bypassSecurityTrustResourceUrl(this.listaModelos[this.id-1])
  return result ;
}

/**
 * Carga los detalles y las imágenes asociadas a un dios específico, llamado al servicio.
 * @param diosId El ID del dios del cual se desean cargar los detalles de las imágenes.
 */
  loadGodsDetails(diosId){
    this.consumoServiciosService.getImagenesDetails(diosId).subscribe(
      (recurso: Recurso[]) => {
        this.listaImagenes.imagenes = recurso['imagenes'];
        console.log(this.listaImagenes.imagenes)

      },
      (error: any) => {
        console.log('Error al obtener las construcciones:', error); 
      }
    );  

    this.consumoServiciosService.getGodDetails(diosId).subscribe(
      (dioses: Dioses[]) => {
        this.detalleDios = dioses['Dios'];
        this.historiaFinal = this.sanitizer.bypassSecurityTrustHtml(this.detalleDios.historia);
      },
      (error: any) => {
        console.log('Error al obtener las construcciones:', error);
        // Realiza acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
      }
    );
  }

  /**
 * Navega de regreso a la página de dioses.
 */
  regresar(){
    this.router.navigate(['/explorar-dioses']);
  }
  
}
