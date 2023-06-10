import { Component } from '@angular/core';
import { Pregunta } from 'app/servicios/servicios-test/interface-test';
import { ServiciosTestModule } from 'app/servicios/servicios-test/servicios-test.module';
import { TokenService } from 'app/servicios/servicios-login/tokenService';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent {
  tiempoTotal: number = 600; // 10 min en segundos
  tiempoRestante: number = this.tiempoTotal;
  intervalo: any;
  public preguntas: Array<Pregunta> = [];
  respuestaSeleccionada: boolean[] = [];
  mostrarBotonEnviar: boolean = false;
  mostrarBotonEmpezar: boolean = true;
  respuestasSeleccionadas: { [key: number]: boolean[] } = {};
  respuestasGuardadas: { pregunta: Pregunta, respuesta: string }[] = [];
  mostrarRespuesta:boolean =false;
  mostrarBotonVolverAP:boolean=false;
  resultTest:boolean=false;
  token: string = '';
  constructor(private consumoServiciosService: ServiciosTestModule, private tokenService: TokenService) {}
  mostrarCali = 0;


  ngOnInit(): void {
    this.token = this.tokenService.obtenerToken();

  }



toggleRespuesta(preguntaIndex: number, respuestaIndex: number) {
  const pregunta = this.getPreguntasByTipo('dioses1')[preguntaIndex];
  const respuestaSeleccionada = pregunta.respuestas[respuestaIndex];

  const respuestas = this.respuestasSeleccionadas[pregunta.codPregunta];
  respuestas.fill(false); // Desmarcar todas las respuestas del grupo
  respuestas[respuestaIndex] = true; // Marcar la respuesta seleccionada

  const index = this.respuestasGuardadas.findIndex((item) => item.pregunta.codPregunta === pregunta.codPregunta);
  if (index !== -1) {
    // Si la pregunta ya está en el arreglo, actualiza la respuesta seleccionada
    this.respuestasGuardadas[index].respuesta = respuestaSeleccionada;
  } else {
    // Si la pregunta no está en el arreglo, añade una nueva entrada
    this.respuestasGuardadas.push({ pregunta, respuesta: respuestaSeleccionada });
  }
}


volverIntentar(){
  this.mostrarBotonEnviar = true;
  this.mostrarBotonVolverAP =false;
  this.mostrarRespuesta = false;
  this.reiniciarCronometro();
  this.iniciarCronometro();
}

mostrarRespuestas() {
  this.resultTest = true;
  this.mostrarBotonEnviar = false;
  this.mostrarBotonVolverAP =true;
  this.mostrarRespuesta = true;
  let calificacion = 0;
  this.detenerCronometro();
  for (const respuesta of this.respuestasGuardadas) {
    const res = this.verificarRespuesta(respuesta.pregunta.codPregunta, respuesta.respuesta);
    if (res) {
      calificacion = calificacion + 0.714285714;
    }
  }this.mostrarCali = Math.round( calificacion);
  const tokenObj = JSON.parse(this.token);
  const tokenCodigo = tokenObj.tokenCodigo;
  const datos = {
    usuario: tokenCodigo,
    calificacion: calificacion,
    horaI: "10:00",
    horaF: this.mostrarTiempo()
  };
  
  this.consumoServiciosService.insertarPodio(datos).subscribe(
    response => {
    },
    error => {
   }
  );

}


verificarRespuesta(pregunta: number, respuesta: string): boolean {
  const item = this.preguntas.find((item) => item.codPregunta === pregunta);
  if (item) {
    const respuestaCorrecta = item.respuestaC;
    return respuesta === respuestaCorrecta;
  } else {
    return false;
  }
}


getPreguntasByTipo(tipo: string): Pregunta[] {
  const preguntas = this.preguntas.filter((pregunta) => pregunta.tipoPregunta === tipo);
  preguntas.forEach((pregunta) => {
    this.respuestasSeleccionadas[pregunta.codPregunta] = new Array(pregunta.respuestas.length).fill(false);
  });
  return preguntas;
}


  iniciarCronometro() {
    this.consumoServiciosService.getPreguntas().subscribe(
      (data: any) => {
        if (data && data.Preguntas) {
          this.preguntas = data.Preguntas;
        }
      },
      (error: any) => {
        console.log('Error al obtener las construcciones:', error);
        // Realiza acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
      }
    );

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

  reiniciarCronometro() {
    this.detenerCronometro(); // Detener el cronómetro actual
    this.tiempoRestante = this.tiempoTotal; // Reiniciar el tiempo restante al valor original
    this.mostrarBotonEnviar = false;
    this.mostrarBotonEmpezar = true;
  }
}
