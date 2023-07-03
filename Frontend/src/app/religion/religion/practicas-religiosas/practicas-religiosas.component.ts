import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumoServiciosService } from 'app/servicios/servicios-practicas/consumo-servicios.service';
import { Practicas } from 'app/servicios/servicios-practicas/interface-practicas';

@Component({
  selector: 'app-practicas-religiosas',
  templateUrl: './practicas-religiosas.component.html',
  styleUrls: ['./practicas-religiosas.component.scss']
})
export class PracticasReligiosasComponent implements OnInit {

  tarjetasDuplicadas: any[] = [];
  listaPracticas: Array<Practicas> = [];
  isLoading=true;


  constructor(
    private router: Router,
    private consumoServiciosService: ConsumoServiciosService

  ) { }

  ngOnInit(): void {
    this.cargarPracticas();
    console.log(this.listaPracticas);
  }

  cargarPracticas(){
    this.consumoServiciosService.getPracticas().subscribe(
      (practicas_religiosas: Practicas[]) => {
        this.listaPracticas = practicas_religiosas['practicas_religiosas'];
        console.log(this.listaPracticas)
      },
      (error: any) => {
        console.log('Error al obtener las prácticas religiosas', error);
      }
    );
  }

}
