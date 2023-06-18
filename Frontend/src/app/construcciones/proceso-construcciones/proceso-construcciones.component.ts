import { Component, OnInit } from '@angular/core';
import { ProcesoConstrucciones } from '../../servicios/servicios-proceso-construcciones/interface-proceso-construcciones'

@Component({
  selector: 'app-proceso-construcciones',
  templateUrl: './proceso-construcciones.component.html',
  styleUrls: ['./proceso-construcciones.component.scss']
})
export class ProcesoConstruccionesComponent implements OnInit {

  tarjetasDuplicadas: any[] = [];
  listaProcesosConstrucciones: Array<ProcesoConstrucciones> = [];
  isLoading=true;

  constructor() { }

  ngOnInit(): void {
  }

}
