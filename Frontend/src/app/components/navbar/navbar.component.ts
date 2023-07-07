import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TokenService } from 'app/servicios/servicios-login/tokenService';
import { SharedDataService } from 'app/servicios-compartidos/shared-data-service.service';
import { Usuario } from 'app/models/usuario';
import { LoginService } from 'app/servicios/servicios-login/login.service';
import { UsuarioService } from 'app/servicios/servicios-usuarios/usuarioService';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() searchValue: EventEmitter<string> = new EventEmitter<string>();
  mostrarComponente = false;
  searchPlaceholder = '';
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;

  constructor(private sharedDataService: SharedDataService, location: Location, private element: ElementRef, public tokenService: TokenService, private router: Router, private servicioLogin : LoginService, private servicioUsuario : UsuarioService) {
    this.location = location;
    this.sidebarVisible = false;
  }

  usuarios : Usuario[]=[];
  usuario:Usuario = new Usuario("","","","","","","",1);


  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
    this.cargarUsuarios();
  }


  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    body.classList.add('nav-open');

    this.sidebarVisible = true;
  };

  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  };

  sidebarToggle() {
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName('body')[0];

    if (this.mobile_menu_visible == 1) {
      body.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');

      if (body.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (body.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = () => { // Cambiado a una arrow function para mantener el contexto de `this`
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(() => {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      };

      body.classList.add('nav-open');
      this.mobile_menu_visible = 1;
    }
  };

  getTitle() {
    var titlee = this.router.url;
    var title = '► Inicio'; // Valor predeterminado

    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < ROUTES.length; item++) {
      if (ROUTES[item].path === titlee) {
        title = ROUTES[item].title2; // Actualizar el título
        break;
      }

      if (ROUTES[item].children) {
        for (var subitem = 0; subitem < ROUTES[item].children.length; subitem++) {
          if (ROUTES[item].children[subitem].path === titlee) {
            this.filtrar(titlee)
            title = ROUTES[item].children[subitem].title2; // Actualizar el título
            break;
          }
        }
      }
    }

    if (titlee.includes("detalleArq/")) {
      title = 'Mas información'; // Actualizar el título
    }

    return title;
  }

  getSearchPlaceholder() {
  return this.mostrarComponente ? "Buscar dioses" : "Search...";
}
  
  filtrar(titlee) {
    if (titlee === "/explorar-dioses") {
      this.mostrarComponente = true;
    } else {
      this.mostrarComponente = false;
    }
  }
  cargarUsuarios() {
    var usuarioLocalStorage = this.servicioLogin.obtenerLocalStorageUsuario();
    console.log(usuarioLocalStorage);
    // Reiniciar el campo "contraseña" al cargar la página
    //Compara el correo que se ingresó en el login con los que están en la base de datos,
    //al encontrarlo, obtengo los datos de ese usuario para mostrarlos en el formulario,
    //y así con más facilidad el usuario puede actualizar sus datos
    this.servicioUsuario.getUsuarios().subscribe((res: any) => {
      if (res && res.usuarios) {
        this.usuarios = res.usuarios;
        console.log(this.usuarios);
  
        // Buscar el usuario logueado en el arreglo de usuarios
        this.usuario = this.usuarios.find(u => u.correo === usuarioLocalStorage.correo);
        console.log(this.usuario);
      }
    });
  }
  
  cerrarSesion() {
    //window.location.href = "/#/login";
    window.location.href = "/login";
    this.tokenService.quitarToken();
  }

  emitSearchValue() {
    this.sharedDataService.updateSearchValue(this.searchPlaceholder);
    console.log("origen ",this.searchPlaceholder); // Aquí puedes realizar la lógica deseada con el valor capturado
  }
}
