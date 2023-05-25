import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsumoServiciosService } from '../../../../servicios/servicios-dioses/consumo-servicios.service';
import { Dioses } from 'app/servicios/servicios-dioses/interface-dioses';
import { Router } from '@angular/router';
import { Recurso } from 'app/servicios/recursos.interface';

@Component({
  selector: 'app-ver-detalle-dios',
  templateUrl: './ver-detalle-dios.component.html',
  styleUrls: ['./ver-detalle-dios.component.scss']
})
export class VerDetalleDiosComponent implements OnInit {
  diosId: string;
  detalleDios:Dioses = {
    cod: undefined,
    nombre: '',
    representacion: '',
    historia: '',
    imagen: '',
    roles: ''
  };
  listaImagenes:Recurso = {
    imagenes: []
  };


  constructor(private route: ActivatedRoute,
    private router: Router,
    private consumoServiciosService: ConsumoServiciosService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.diosId = params['id'];
      // Aquí puedes utilizar el ID para cargar la información completa del dios egipcio
      console.log('ID del dios:', this.diosId);
      // Realiza las operaciones necesarias para cargar la información completa del dios con el ID proporcionado
    });

    this.loadGodsDetails(this.diosId)
  }

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
      },
      (error: any) => {
        console.log('Error al obtener las construcciones:', error);
        // Realiza acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
      }
    );
  }
  regresar(){
    this.router.navigate(['/explorar-dioses']);
  }
  
}
