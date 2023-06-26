import { Component, OnInit } from '@angular/core';
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
  

  public modelo3dseleccionado: string = "";
  public titulo = "Error 400";
  private iframeContainer: HTMLElement;
  private modal: HTMLElement;
  private iframe: HTMLIFrameElement;
 
  constructor() {
  }
  ngOnInit(): void {
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
}