import { Component, OnInit } from '@angular/core';
import { TokenService } from 'app/servicios/servicios-login/tokenService';

export interface RouteInfo {
  path: string;
  title: string;
  title2?: string;
  icon?: string;
  id?: string;
  children?: RouteInfo[];
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'INICIO', title2: '► Inicio', icon: 'home', children: null },
  { path: '/editar', title: 'PERFIL', title2: '► Perfil', icon: 'face', children: null },
  {
    path: '#dioses', id: 'dioses', title: 'DIOSES', title2: '► Dioses', icon: 'auto_stories', children: [
      { path: '/explorar-dioses', title: 'DIOSES', title2: 'Dioses ► Dioses', icon: 'psychology_alt', children: null },
    ]
  },
  {
    path: '#mitologia', id: 'mitologia', title: 'MITOLOGÍA', title2: '► Mitología', icon: 'diversity_2', children: [
      { path: '/mitos-historias', title: 'HISTORIAS', title2: 'Mitología ► Historias', icon: 'history_edu', children: null },
      { path: '/criaturas-mitologicas', title: 'CRIATURAS', title2: 'Mitología ► Criaturas', icon: 'android', children: null },
    ]
  },
  {
    path: '#reli', id: 'reli', title: 'RELIGIÓN', title2: '► Religión', icon: 'brightness_high', children: [
      { path: '/practicas-religiosas', title: 'PRACTICAS', title2: 'Religión ► Practicas', icon: 'assignment', children: null },
    ]
  },
  {
    path: '#construccion', id: 'construccion', title: 'CONSTRUCCIÍON', title2: '► Construcción', icon: 'handyman', children: [
      { path: '/explorar-construcciones', title: 'CONSTRUCCIIONES', title2: 'Construcción ► Construcción', icon: 'change_history', children: null },
      { path: '/proceso-construcciones', title: 'HERRAMIENTAS', title2: 'Construcción ► Herramientas', icon: 'home_repair_service', children: null },
      { path: '/galeria-imagenes-construcciones', title: 'IMÁGENES', title2: 'Construcción ► Imágenes', icon: 'images', children: null },
      { path: '/tumbas-pinturas', title: 'TUMBAS Y PINTURAS', title2: 'Construcción ► Tumbas y pinturas', icon: 'images', children: null },
      { path: '/proceso-construcciones', title: 'PROCESOS', title2: 'Construcción ► Procesos', icon: 'home_repair_service', children: null },
      { path: '/galeria-imagenes-construcciones', title: 'IMÁGENES', title2: 'Construcción ► Imágenes', icon: 'images', children: null }
    ]
  },
  {
    path: '#test', id: 'test', title: 'TEST', title2: '► Test', icon: 'gamepad', children: [
      { path: '/prueba', title: 'PRUEBA', title2: 'Test ► Prueba', icon: 'videogame_asset', children: null },
      { path: '/podio', title: 'PODIO', title2: 'Test ► Podio', icon: 'emoji_events', children: null }
    ]
  }
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[];
  activeMenuId: string | null = null; // Variable de control para el menú activo

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  constructor(public tokenService: TokenService) {

  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  toggleCollapse(id: string) {
    if (this.activeMenuId === id) {
      // Si se hace clic en el menú actualmente activo, lo cerramos
      this.activeMenuId = null;
    } else {
      // Si se selecciona un nuevo menú, cerramos el menú anteriormente abierto y abrimos el nuevo
      this.activeMenuId = id;
    }
  }
  cerrarSesion() {
    window.location.href = "/login";
    this.tokenService.quitarToken();
  }
}
