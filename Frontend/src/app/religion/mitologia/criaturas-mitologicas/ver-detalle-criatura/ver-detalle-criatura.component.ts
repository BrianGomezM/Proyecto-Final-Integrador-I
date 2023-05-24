import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsumoServiciosService } from '../../../../servicios/servicios-criaturas/consumo-servicios.service';
import { Criatura } from 'app/servicios/servicios-criaturas/interface-criaturas';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ver-detalle-criatura',
  templateUrl: './ver-detalle-criatura.component.html',
  styleUrls: ['./ver-detalle-criatura.component.scss']
})
export class VerDetalleCriaturaComponent implements OnInit {


  criaturaId: string;
  detalleCriatura:Criatura = {
    cod: undefined,
    nombre: '',
    historia:'',
    representacion:'',
    origen:'',
    caracteristicas:'',
    rol:'',
    imagen:''
  };
  listaImagenes:string[][]=[
    ['./assets/criaturaes/ra/1.jpg','./assets/criaturaes/ra/2.jpg','./assets/criaturaes/ra/3.jpg','./assets/criaturaes/ra/4.jpg'],
    ['./assets/criaturaes/osiris/1.jpg','./assets/criaturaes/osiris/2.jpg','./assets/criaturaes/osiris/3.jpg','./assets/criaturaes/osiris/4.jpg'],
    ['./assets/criaturaes/isis/1.jpg','./assets/criaturaes/isis/2.jpg','./assets/criaturaes/isis/3.jpg','./assets/criaturaes/isis/4.jpg'],
    ['./assets/criaturaes/horus/1.jpg','./assets/criaturaes/horus/2.jpg','./assets/criaturaes/horus/3.jpg','./assets/criaturaes/horus/4.jpg'],
    ['./assets/criaturaes/anubis/1.jpg','./assets/criaturaes/anubis/2.jpg','./assets/criaturaes/anubis/3.jpg','./assets/criaturaes/anubis/4.jpg'],
    ['./assets/criaturaes/thoth/1.jpg','./assets/criaturaes/thoth/2.jpg','./assets/criaturaes/thoth/3.jpg','./assets/criaturaes/thoth/4.jpg'],
    ['./assets/criaturaes/hathor/1.jpg','./assets/criaturaes/hathor/2.jpg','./assets/criaturaes/hathor/3.jpg','./assets/criaturaes/hathor/4.jpg'],
    ['./assets/criaturaes/seth/1.jpg','./assets/criaturaes/seth/2.jpg','./assets/criaturaes/seth/3.jpg','./assets/criaturaes/seth/4.jpg']
  ]


  constructor(private route: ActivatedRoute,
    private router: Router,
    private consumoServiciosService: ConsumoServiciosService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.criaturaId = params['id'];
      // Aquí puedes utilizar el ID para cargar la información completa del criatura egipcio
      console.log('ID del criatura:', this.criaturaId);
      // Realiza las operaciones necesarias para cargar la información completa del criatura con el ID proporcionado
    });

    this.loadGodsDetails(this.criaturaId)
  }

  loadGodsDetails(criaturaId){
    this.consumoServiciosService.getCriaturaDetails(criaturaId).subscribe(
      (criatura: Criatura[]) => {
        this.detalleCriatura = criatura['criatura'];
      },
      (error: any) => {
        console.log('Error al obtener las construcciones:', error);
        // Realiza acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
      }
    );
  }
  regresar(){
    this.router.navigate(['/explorar-criaturaes']);
  }
  

}
