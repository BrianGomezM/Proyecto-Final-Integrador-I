import { Component } from '@angular/core';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent {
  tiempoTotal: number = 60 * 60; // 1 hora en segundos
  tiempoRestante: number = this.tiempoTotal;
  intervalo: any;
  mostrarBotonEnviar: boolean = false; 
  mostrarBotonEmpezar:boolean = true;
  iniciarCronometro() {
    this.mostrarBotonEnviar = true;
    this.mostrarBotonEmpezar = false;
    this.intervalo = setInterval(() => {
      this.actualizarTiempo();
    }, 1000);
  }

  detenerCronometro() {
    clearInterval(this.intervalo);
  }

  private actualizarTiempo() {
    if (this.tiempoRestante > 0) {
      this.tiempoRestante--;
    } else {
      this.detenerCronometro();
    }
  }

  mostrarTiempo(): string {
    const minutos = Math.floor(this.tiempoRestante / 60);
    const segundos = this.tiempoRestante % 60;
    return `${minutos}:${this.formatearDigito(segundos)}`;
  }

  private formatearDigito(digito: number): string {
    return digito.toString().padStart(2, '0');
  }

  obtenerClaseTiempo(): string {
    if (this.tiempoRestante <= 10) {
      return 'red-text';
    } else if (this.tiempoRestante <= 30) {
      return 'orange-text';
    } else {
      return 'green-text';
    }
  }
}
