import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ServiciosTestModule } from 'app/servicios/servicios-test/servicios-test.module';
import { TestUser } from 'app/servicios/servicios-test/interface-test-usu';

@Component({
  selector: 'app-podio',
  templateUrl: './podio.component.html',
  styleUrls: ['./podio.component.css'],
  animations: [
    trigger('rotate', [
      state('true', style({ transform: 'rotate(0deg) scale(1)' })),
      state('false', style({ transform: 'rotate(360deg) scale(1)' })),
      transition('true <=> false', animate('500ms ease'))
    ])
  ]
})
export class PodioComponent implements OnInit {
  showIcon: boolean = true;
  public testUser: Array<TestUser> = [];
  currentPage: number = 1;
  pageSize: number = 5;

  constructor(private consumoServiciosService: ServiciosTestModule) { }

  ngOnInit(): void {
    this.consumoServiciosService.getUsuarioTest().subscribe(
      (response: any) => {
        const podio = response['Podio'];
        this.testUser = Object.values(podio);
        this.goToPage(1); // Go to the first page initially
      },
      (error: any) => {
        console.log('Error al obtener las construcciones:', error);
        // Realiza acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
      }
    );
  }

  toggleShowIcon(): void {
    this.showIcon = !this.showIcon;
  }

  get totalPages(): number {
    return Math.ceil(this.testUser.length / this.pageSize);
  }

  get pages(): number[] {
    const pagesCount = this.totalPages;
    return Array.from({ length: pagesCount }, (_, i) => i + 1);
  }

  get visibleUsers(): TestUser[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.testUser.slice(startIndex, startIndex + this.pageSize);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  formatFecha(fecha: string): string {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
  
    const diasSemana = [
      'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
    ];
  
    const fechaOriginal = new Date(fecha);
    const diaSemana = diasSemana[fechaOriginal.getDay()];
    const dia = fechaOriginal.getDate();
    const mes = meses[fechaOriginal.getMonth()];
    const anio = fechaOriginal.getFullYear();
    const horas = fechaOriginal.getHours();
    const minutos = fechaOriginal.getMinutes();
    const segundos = fechaOriginal.getSeconds();
  
    const fechaFormateada = `${diaSemana}, ${dia} ${mes} ${anio} ${horas}:${minutos}:${segundos}`;
    return fechaFormateada;
  }
  
}
