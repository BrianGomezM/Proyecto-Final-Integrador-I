import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsumoServiciosService } from '../../../../servicios/servicios-criaturas/consumo-servicios.service';
import { Criatura } from 'app/servicios/servicios-criaturas/interface-criaturas';
import { Router } from '@angular/router';
import { Recurso } from 'app/servicios/recursos.interface';
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
  listaImagenes:Recurso = {
    imagenes: []
  };


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
    this.consumoServiciosService.getImagenesDetails(criaturaId).subscribe(
      (recurso: Recurso[]) => {
        this.listaImagenes.imagenes = recurso['imagenes'];
        console.log(this.listaImagenes.imagenes)
      },
      (error: any) => {
        console.log('Error al obtener las construcciones:', error); 
      }
    );   
    this.consumoServiciosService.getCriaturaDetails(criaturaId).subscribe(
      (criatura: Criatura[]) => {
        this.detalleCriatura = criatura['criatura'];
      },
      (error: any) => {
        console.log('Error al obtener las construcciones:', error);
      }
    );
  }
  regresar(){
    this.router.navigate(['/criaturas-mitologicas']);
  }
  

}
