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
import { ModalComponent } from './construcciones/galeria-imagenes-contrucciones/modal/modal.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    InicioSesionComponent,
    RecuperarClaveComponent,
    AsignarClaveComponent,
    RegistrarUsuarioComponent,
    AdminLayoutComponent,
    ModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
