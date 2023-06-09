import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './contenedor/layout/admin-layout.component';
import { InicioSesionComponent } from './cuenta/inicio-sesion/inicio-sesion.component';
import { RegistrarUsuarioComponent } from './cuenta/registrar-usuario/registrar-usuario.component';

const routes: Routes = [
  {
    path: 'login',
    component: InicioSesionComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./contenedor/routing/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  },
  {
    path: 'registrar',
    component: RegistrarUsuarioComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
