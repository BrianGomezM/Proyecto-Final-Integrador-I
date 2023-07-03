import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './contenedor/layout/admin-layout.component';
import { InicioSesionComponent } from './cuenta/inicio-sesion/inicio-sesion.component';
import { RegistrarUsuarioComponent } from './cuenta/registrar-usuario/registrar-usuario.component';
import { RecuperarClaveComponent } from './cuenta/recuperar-clave/recuperar-clave.component';
import { LoginGuard } from './guards/login.guard';
import { ModificarUsuarioComponent } from './cuenta/modificar-usuario/modificar-usuario.component';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoginGuard],
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
  },{
    path: 'olvidoClave',
    component: RecuperarClaveComponent
  },  {
    path: 'modificar',
    component: ModificarUsuarioComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
