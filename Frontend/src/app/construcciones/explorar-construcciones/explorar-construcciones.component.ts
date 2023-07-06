import { Component, OnInit } from '@angular/core';
import { ConsumoServiciosService } from '../../servicios/servicios-contruccion/consumo-servicios.service';
import { LoginService } from 'app/servicios/servicios-login/login.service';
import { ContruccionLeccion } from 'app/servicios/servicios-contruccion/interface-leccion';
import { LeccionesService } from 'app/servicios-compartidos/lecciones.service';
@Component({
  selector: 'app-explorar-construcciones',
  templateUrl: './explorar-construcciones.component.html',
  styleUrls: ['./explorar-construcciones.component.css']
})
export class ExplorarConstruccionesComponent implements OnInit {
  // Declaración de un arreglo de enlaces
  public enlaces: { url: string, titulo: string }[] = [
    { url: "https://sketchfab.com/models/c46e7c4460ab4bea9628823a037068ed/embed?autostart=1&amp;internal=1&amp;tracking=0&amp;ui_infos=0&amp;ui_snapshots=1&amp;ui_stop=0&amp;ui_watermark=0", titulo: "Templo egipcio" },
    { url: "https://sketchfab.com/models/199d24f14aa24378a3fffd6b90c33de7/embed?autostart=1&amp;internal=1&amp;tracking=0&amp;ui_infos=0&amp;ui_snapshots=1&amp;ui_stop=0&amp;ui_watermark=0", titulo: "Pirámide" },
    { url: "https://sketchfab.com/models/27be9ebf4f1a450381536c962574a1db/embed?autostart=1&amp;internal=1&amp;tracking=0&amp;ui_infos=0&amp;ui_snapshots=1&amp;ui_stop=0&amp;ui_watermark=0", titulo: "Sarcófago saíta" },
    { url: "https://sketchfab.com/models/092cc7baa42b47b19ddef62ccd2887bf/embed?autostart=1&amp;internal=1&amp;tracking=0&amp;ui_infos=0&amp;ui_snapshots=1&amp;ui_stop=0&amp;ui_watermark=0", titulo: "La Esfinge" },
    { url: "https://sketchfab.com/models/1746fd297334411ca06c4a8a91ec0b13/embed?autostart=1&amp;internal=1&amp;tracking=0&amp;ui_infos=0&amp;ui_snapshots=1&amp;ui_stop=0&amp;ui_watermark=0", titulo: "Cofre canópico" },
    { url: "https://sketchfab.com/models/2e08f362b0124cb798893aa13d778d84/embed?autostart=1&amp;internal=1&amp;tracking=0&amp;ui_infos=0&amp;ui_snapshots=1&amp;ui_stop=0&amp;ui_watermark=0", titulo: "Obeliscos" },
    { url: "https://sketchfab.com/models/eb8ff59b3ed7402d858428c089c6477a/embed?autostart=1&amp;internal=1&amp;tracking=0&amp;ui_infos=0&amp;ui_snapshots=1&amp;ui_stop=0&amp;ui_watermark=0", titulo: "Fortalezas" },
    { url: "https://sketchfab.com/models/ab516f7795684d6683188680dcb100ee/embed?autostart=1&amp;internal=1&amp;tracking=0&amp;ui_infos=0&amp;ui_snapshots=1&amp;ui_stop=0&amp;ui_watermark=0", titulo: "Templos funerarios" },
    { url: "https://www.youtube.com/watch?v=VAM7IswKF8Y&t=46s&ab_channel=ManuelBravo", titulo: "Egipto Virtual" },
  ];

  public construcciones: Array<ContruccionLeccion> = [];
  public modelo3dseleccionado: string = "";
  public titulo = "Error 400";
  private iframeContainer: HTMLElement;
  private modal: HTMLElement;
  encontradaLeccion1 = true;
  encontradaLeccion2 = true;
  encontradaLeccion3 = true;
  encontradaLeccion4 = true;
  encontradaLeccion5 = true;
  encontradaLeccion6 = true;
  encontradaLeccion7 = true;
  encontradaLeccion8 = true;
  private iframe: HTMLIFrameElement;
  usuarioCorreo = "";
  constructor(private consumoServiciosService: ConsumoServiciosService, public servicioLogin: LoginService, private leccionesService: LeccionesService) {
  }
  ngOnInit(): void {
    this.obtener();
  }

  obtener() {
    this.usuarioCorreo = this.servicioLogin.obtenerLocalStorageUsuario().correo;
    this.consumoServiciosService.getlistarConstruE(this.usuarioCorreo).subscribe(
      (construcciones: ContruccionLeccion[]) => {
        this.construcciones = construcciones['construcciones']; 4
        this.verificarLeccion1();
      },
      (error: any) => {
        // Realiza acciones de manejo de errores aquí, como mostrar un mensaje al usuario o realizar alguna otra acción necesaria
      }
    );


    this.modal = document.getElementById('exampleModal');
    this.iframeContainer = document.getElementById('iframeContainer');

    this.modal.addEventListener('hidden.bs.modal', () => {
      this.destroyIframe();
    });
  }

  ngAfterViewInit() {
    // Escucha el evento 'hidden.bs.modal' cuando el modal se cierra
    $('#exampleModal').on('hidden.bs.modal', () => {
      this.ngOnDestroy();
    });
  }

  ngOnDestroy(): void {
    this.destroyIframe();
  }

  verificarModelo(indice: number) {
    var estadoLeccion = this.verficar2(indice + 1);
    this.insertarVisto(estadoLeccion, indice);
    this.modelo3dseleccionado = this.enlaces[indice].url;
    this.titulo = this.enlaces[indice].titulo;

    if (indice !== 8) {
      this.createIframe(this.modelo3dseleccionado);
    } else {
      this.createYoutubeIframe(this.modelo3dseleccionado);
    }
  }
  private createIframe(src: string): void {
    this.destroyIframe();

    this.iframe = document.createElement('iframe');
    this.iframe.setAttribute('class', 'embed-responsive-item');
    this.iframe.setAttribute('frameborder', '0');
    this.iframe.setAttribute('src', src);
    this.iframe.setAttribute('allowfullscreen', '');
    this.iframeContainer.appendChild(this.iframe);
  }

  private createYoutubeIframe(src: string): void {
    this.destroyIframe();

    const videoId = 'https://www.youtube.com/embed/VAM7IswKF8Y?autoplay=1';
    if (videoId) {
      const youtubeEmbedSrc = videoId;
      this.createIframe(youtubeEmbedSrc);
    }
  }
  private destroyIframe(): void {
    if (this.iframe) {
      this.iframe.remove();
      this.iframe = null;
    }
  }
  verficar2(cod) {
    var respuesta = false;
    for (const index in this.construcciones) {
      if (this.construcciones.hasOwnProperty(index)) {
        const item = this.construcciones[index];
        if (item.id_leccion === cod) {
          // Realizar acciones cuando id_leccion es igual a 1
          var respuesta = true;
        }
      }
    } return respuesta;
  }
  verificarLeccion1() {
    for (let i = 0; i < this.construcciones.length; i++) {
      if (this.construcciones[i].id_leccion === 1) {
        this.encontradaLeccion1 = false;
      } else if (this.construcciones[i].id_leccion === 2) {
        this.encontradaLeccion2 = false;
      } else if (this.construcciones[i].id_leccion === 3) {
        this.encontradaLeccion3 = false;
      } else if (this.construcciones[i].id_leccion === 4) {
        this.encontradaLeccion4 = false;
      } else if (this.construcciones[i].id_leccion === 5) {
        this.encontradaLeccion5 = false;
      } else if (this.construcciones[i].id_leccion === 6) {
        this.encontradaLeccion6 = false;
      } else if (this.construcciones[i].id_leccion === 7) {
        this.encontradaLeccion7 = false;
      } else if (this.construcciones[i].id_leccion === 8) {
        this.encontradaLeccion8 = false;
      }

    }
  }
  insertarVisto(estado, cod) {
    if (!estado) {
      this.leccionesService.insertarLecciones(7, (cod + 1), this.usuarioCorreo).subscribe(
        () => {
          this.construcciones = [];
          this.obtener();
        },
        (error) => {
        }
      );
    }
  }
}