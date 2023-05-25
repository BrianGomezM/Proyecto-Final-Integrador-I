import { Component, OnInit } from '@angular/core';
import { ConsumoServiciosService } from '../../../servicios/servicios-criaturas/consumo-servicios.service';
import { Criatura } from 'app/servicios/servicios-criaturas/interface-criaturas';
import { Router } from '@angular/router';
@Component({
  selector: 'app-criaturas-mitologicas',
  templateUrl: './criaturas-mitologicas.component.html',
  styleUrls: ['./criaturas-mitologicas.component.scss']
})
export class CriaturasMitologicasComponent implements OnInit {
  tarjetasDuplicadas: any[] = [];
  public listaCriaturas: Array<Criatura> = [];

  constructor(
    private router: Router,
    private consumoServiciosService: ConsumoServiciosService

  ) { }

  ngOnInit(): void {

    this.consumoServiciosService.getAllCriaturas().subscribe(
      (criaturas: Criatura[]) => {
        this.listaCriaturas = criaturas['criaturas'];
      },
      (error: any) => {
        console.log('Error al obtener las construcciones:', error);
        // Realiza acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
      }
    );
  }

  mostrarDetalles(criatura:Criatura){
    this.router.navigate(['/detalles-criatura', criatura.cod]);
  }
}
