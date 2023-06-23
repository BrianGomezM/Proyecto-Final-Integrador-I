import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { RecuperarClaveComponent } from './cuenta/recuperar-clave/recuperar-clave.component';
import { AsignarClaveComponent } from './cuenta/asignar-clave/asignar-clave.component';
import { RegistrarUsuarioComponent } from './cuenta/registrar-usuario/registrar-usuario.component';
import { InicioSesionComponent } from './cuenta/inicio-sesion/inicio-sesion.component';
import { AdminLayoutComponent } from './contenedor/layout/admin-layout.component';
import { VerDetalleDiosComponent } from './religion/dioses/verDetalleDios/ver-detalle-dios/ver-detalle-dios.component';
import { VerDetalleCriaturaComponent } from './religion/mitologia/criaturas-mitologicas/ver-detalle-criatura/ver-detalle-criatura.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ModificarUsuarioComponent } from './cuenta/modificar-usuario/modificar-usuario.component';
import { CommonModule } from '@angular/common';
import { LightboxModule } from 'ngx-lightbox';



@NgModule({
  imports: [
    LightboxModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    AppComponent,
    InicioSesionComponent,
    RecuperarClaveComponent,
    AsignarClaveComponent,
    RegistrarUsuarioComponent,
    AdminLayoutComponent,
    VerDetalleDiosComponent,
    VerDetalleCriaturaComponent,
    ModificarUsuarioComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
