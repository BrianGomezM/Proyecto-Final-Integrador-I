import { Component, OnInit } from '@angular/core';
import { TokenService } from 'app/servicios/servicios-login/tokenService';

export interface RouteInfo {
  path: string;
  title: string;
  icon?: string;
  id?: string;
  children?: RouteInfo[];
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'INICIO', icon: 'home', children: null },
  { path: '/modificar', title: 'PERFIL', icon: 'face', children: null },
  {
    path: '#dioses', id: 'dioses', title: 'DIOSES', icon: 'auto_stories', children: [
      { path: '/explorar-dioses', title: 'Dioses', icon: 'psychology_alt', children: null },
      { path: '/galeria-imagenes', title: 'Imágenes', icon: 'images', children: null }
    ]
  },

  {
    path: '#mitologia', id: 'mitologia', title: 'MITOLOGÍA', icon: 'diversity_2', children: [
      { path: '/explorar-mitologia', title: 'Mitologicas', icon: 'content_paste_search', children: null },
      { path: '/mitos-historia', title: 'Mitos e historia', icon: 'history_edu', children: null },
      { path: '/criaturas-mitologicas', title: 'criaturas', icon: 'android', children: null },
      { path: 'galeria-imagenes-mitologicas', title: 'Imágenes', icon: 'images', children: null },
    ]
  },
  {
    path: '#reli', id: 'reli', title: 'RELIGIÓN', icon: 'brightness_high', children: [
      { path: '/rituales', title: 'Rituales', icon: 'local_fire_department', children: null },
      { path: '/ceremonias', title: 'Ceremonias', icon: 'partner_exchange', children: null },
      { path: '/practicas-religiosas', title: 'Practicas', icon: 'partner_exchange', children: null },
      { path: '/expresiones-fe', title: 'Expresiones de fe', icon: 'approval_delegation', children: null },
      { path: '/galeria-imagenes-religiosas', title: 'Imágenes', icon: 'images', children: null }
    ]
  },
  {
    path: '#construccion', id: 'construccion', title: 'CONSTRUCCIÍON', icon: 'handyman', children: [
      { path: '/explorar-construcciones', title: 'Construcciones', icon: 'change_history', children: null },
      { path: '/galeria-imagenes-construcciones', title: 'Imagenes', icon: 'images', children: null },
    ]
  },
  {
    path: '#test', id: 'test', title: 'TEST', icon: 'gamepad', children: [
      { path: '/prueba', title: 'Prueba', icon: 'score', children: null },
      { path: '/podio', title: 'Podio', icon: 'leaderboard', children: null }
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

  constructor(public tokenService:TokenService){
    
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
  cerrarSesion(){
    window.location.href = "/login";
    this.tokenService.quitarToken();
  }
}
