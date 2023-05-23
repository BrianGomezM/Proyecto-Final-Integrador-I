import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsumoServiciosService } from '../../../../servicios/servicios-dioses/consumo-servicios.service';
import { Dioses } from 'app/servicios/servicios-dioses/interface-dioses';
import { Router } from '@angular/router';

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
  listaImagenes:string[][]=[
    ['./assets/dioses/ra/1.jpg','./assets/dioses/ra/2.jpg','./assets/dioses/ra/3.jpg','./assets/dioses/ra/4.jpg'],
    ['./assets/dioses/osiris/1.jpg','./assets/dioses/osiris/2.jpg','./assets/dioses/osiris/3.jpg','./assets/dioses/osiris/4.jpg'],
    ['./assets/dioses/isis/1.jpg','./assets/dioses/isis/2.jpg','./assets/dioses/isis/3.jpg','./assets/dioses/isis/4.jpg'],
    ['./assets/dioses/horus/1.jpg','./assets/dioses/horus/2.jpg','./assets/dioses/horus/3.jpg','./assets/dioses/horus/4.jpg'],
    ['./assets/dioses/anubis/1.jpg','./assets/dioses/anubis/2.jpg','./assets/dioses/anubis/3.jpg','./assets/dioses/anubis/4.jpg'],
    ['./assets/dioses/thoth/1.jpg','./assets/dioses/thoth/2.jpg','./assets/dioses/thoth/3.jpg','./assets/dioses/thoth/4.jpg'],
    ['./assets/dioses/hathor/1.jpg','./assets/dioses/hathor/2.jpg','./assets/dioses/hathor/3.jpg','./assets/dioses/hathor/4.jpg'],
    ['./assets/dioses/seth/1.jpg','./assets/dioses/seth/2.jpg','./assets/dioses/seth/3.jpg','./assets/dioses/seth/4.jpg']
  ]


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
