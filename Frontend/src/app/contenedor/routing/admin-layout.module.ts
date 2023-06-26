import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';

import { GaleriaImagenesContruccionesComponent } from 'app/construcciones/galeria-imagenes-contrucciones/galeria-imagenes-contrucciones.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { ExplorarDiosesComponent } from 'app/religion/dioses/explorar-dioses/explorar-dioses.component';
import { GaleriaImagenesComponent } from 'app/religion/dioses/galeria-imagenes/galeria-imagenes.component';

import { CriaturasMitologicasComponent } from 'app/religion/mitologia/criaturas-mitologicas/criaturas-mitologicas.component';
import { ExplorarMitologiaComponent } from 'app/religion/mitologia/explorar-mitologia/explorar-mitologia.component';
import { GaleriaImagenesMitologicasComponent } from 'app/religion/mitologia/galeria-imagenes-mitologicas/galeria-imagenes-mitologicas.component';
import { CeremoniasComponent } from 'app/religion/religion/ceremonias/ceremonias.component';
import { ExpresionesFeComponent } from 'app/religion/religion/expresiones-fe/expresiones-fe.component';
import { GaleriaImagenesReligionComponent } from 'app/religion/religion/galeria-imagenes-religion/galeria-imagenes-religion.component';
import { PracticasReligiosasComponent } from 'app/religion/religion/practicas-religiosas/practicas-religiosas.component';
import { RitualesComponent } from 'app/religion/religion/rituales/rituales.component';
import { PodioComponent } from 'app/test/podio/podio.component';
import { PruebasComponent } from 'app/test/pruebas/pruebas.component';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { VerDetalleArquitecturaComponent } from 'app/construcciones/galeria-imagenes-contrucciones/ver-detalle-arquitectura/ver-detalle-arquitectura.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    ExplorarDiosesComponent,
    GaleriaImagenesContruccionesComponent,
    ExplorarDiosesComponent,
    GaleriaImagenesComponent,
    CriaturasMitologicasComponent,
    ExplorarMitologiaComponent ,
    GaleriaImagenesMitologicasComponent,
    CeremoniasComponent,
    ExpresionesFeComponent,
    GaleriaImagenesReligionComponent,
    PracticasReligiosasComponent ,
    RitualesComponent,
    PodioComponent ,
    PruebasComponent,
    VerDetalleArquitecturaComponent,
  ]
})

export class AdminLayoutModule {}
