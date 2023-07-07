import { Component, OnInit } from '@angular/core';
import { LeccionesService } from 'app/servicios-compartidos/lecciones.service';
import { ConsumoServiciosService } from 'app/servicios/servicios-contruccion/consumo-servicios.service';
import { ContruccionLeccion } from 'app/servicios/servicios-contruccion/interface-leccion';
import { LoginService } from 'app/servicios/servicios-login/login.service';

@Component({
  selector: 'app-tumbas-pinturas',
  templateUrl: './tumbas-pinturas.component.html',
  styleUrls: ['./tumbas-pinturas.component.scss']
})
export class TumbasPinturasComponent implements OnInit {
  // Declaración de un arreglo de enlaces
  public enlaces: { url: string, titulo: string }[] = [
    { url: "https://www.youtube.com/embed/U7iT21e4JZQ", titulo: "Tumba de tutankamón" },
    { url: "https://sketchfab.com/models/160b25626e5e49df8c8fd99e15ebbb5c/embed?autostart=1&amp;internal=1&amp;tracking=0&amp;ui_infos=0&amp;ui_snapshots=1&amp;ui_stop=0&amp;ui_watermark=0", titulo: "Tumba de Ramsés II" },
    { url: "https://www.youtube.com/embed/TQmJlRj_vos", titulo: "Tumba de Hatshepsut" },
    { url: "https://sketchfab.com/models/eda824084ba146558d7a61dc7968bd05/embed?autostart=1&amp;internal=1&amp;tracking=0&amp;ui_infos=0&amp;ui_snapshots=1&amp;ui_stop=0&amp;ui_watermark=0", titulo: "Jeroglifico de Horus" },
    { url: "https://sketchfab.com/models/c3e0691ae1dd4e788ceee69cd26ded78/embed?autostart=1&amp;internal=1&amp;tracking=0&amp;ui_infos=0&amp;ui_snapshots=1&amp;ui_stop=0&amp;ui_watermark=0", titulo: "Jeroglificos en templo de de Ramsés II" },
    { url: "https://sketchfab.com/models/323d43e808a84e36a575207561d07e67/embed?autostart=1&amp;internal=1&amp;tracking=0&amp;ui_infos=0&amp;ui_snapshots=1&amp;ui_stop=0&amp;ui_watermark=0", titulo: "Piedra Rosetta" },
    { url: "https://sketchfab.com/models/18b2cc93ab8d4059a8a3db507616f7f3/embed?autostart=1&amp;internal=1&amp;tracking=0&amp;ui_infos=0&amp;ui_snapshots=1&amp;ui_stop=0&amp;ui_watermark=0", titulo: "Piezas del Museo Egipcio en El Cairo" },
    { url: "https://sketchfab.com/models/45805e7916aa4861af15e753fd89c6b3/embed?autostart=1&amp;internal=1&amp;tracking=0&amp;ui_infos=0&amp;ui_snapshots=1&amp;ui_stop=0&amp;ui_watermark=0", titulo: "El muro en el templo de Ramsés III" },
    { url: "", titulo: "Egipto Virtual" },
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
    this.leccionesService.getlistarConstruE(this.usuarioCorreo).subscribe(
      (construcciones: any[]) => {
        this.construcciones = construcciones['pinturas']; 
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

    const videoId = 'https://www.youtube.com/embed/U7iT21e4JZQ?autoplay=1';
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
      this.leccionesService.insertarLecciones(8, (cod + 1), this.usuarioCorreo).subscribe(
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
