import { Routes } from '@angular/router';
import { ExplorarConstruccionesComponent } from 'app/construcciones/explorar-construcciones/explorar-construcciones.component';
import { GaleriaImagenesContruccionesComponent } from 'app/construcciones/galeria-imagenes-contrucciones/galeria-imagenes-contrucciones.component';
import { VerDetalleArquitecturaComponent } from 'app/construcciones/galeria-imagenes-contrucciones/ver-detalle-arquitectura/ver-detalle-arquitectura.component';
import { ProcesoConstruccionesComponent } from 'app/construcciones/proceso-construcciones/proceso-construcciones.component';
import { VerDetalleProcesoConstruccionesComponent } from 'app/construcciones/ver-detalle-proceso-construcciones/ver-detalle-proceso-construcciones.component';
import { ModificarUsuarioComponent } from 'app/cuenta/modificar-usuario/modificar-usuario.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { AuthGuard } from 'app/guards/auth.guard';
import { ExplorarDiosesComponent } from 'app/religion/dioses/explorar-dioses/explorar-dioses.component';
import { GaleriaImagenesComponent } from 'app/religion/dioses/galeria-imagenes/galeria-imagenes.component';

import { VerDetalleDiosComponent } from 'app/religion/dioses/verDetalleDios/ver-detalle-dios/ver-detalle-dios.component';
import { CriaturasMitologicasComponent } from 'app/religion/mitologia/criaturas-mitologicas/criaturas-mitologicas.component';
import { VerDetalleCriaturaComponent } from 'app/religion/mitologia/criaturas-mitologicas/ver-detalle-criatura/ver-detalle-criatura.component';
import { ExplorarMitologiaComponent } from 'app/religion/mitologia/explorar-mitologia/explorar-mitologia.component';
import { GaleriaImagenesMitologicasComponent } from 'app/religion/mitologia/galeria-imagenes-mitologicas/galeria-imagenes-mitologicas.component';
import { MitosHistoriaComponent } from 'app/religion/mitologia/mitos-historia/mitos-historia.component';
import { VerDetalleMitosHistoriasComponent } from 'app/religion/mitologia/ver-detalle-mitos-historias/ver-detalle-mitos-historias.component';
//import { VerDetalleMitosHistoriasComponent } from 'app/religion/mitologia/ver-detalle-mitos-historias/ver-detalle-mitos-historias.component';
import { CeremoniasComponent } from 'app/religion/religion/ceremonias/ceremonias.component';
import { ExpresionesFeComponent } from 'app/religion/religion/expresiones-fe/expresiones-fe.component';
import { GaleriaImagenesReligionComponent } from 'app/religion/religion/galeria-imagenes-religion/galeria-imagenes-religion.component';
import { PracticasReligiosasComponent } from 'app/religion/religion/practicas-religiosas/practicas-religiosas.component';
import { RitualesComponent } from 'app/religion/religion/rituales/rituales.component';
import { PodioComponent } from 'app/test/podio/podio.component';
import { PruebasComponent } from 'app/test/pruebas/pruebas.component';




export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',                        canActivate: [ AuthGuard ], component: DashboardComponent }, 
    { path: 'explorar-dioses',                  canActivate: [ AuthGuard ], component: ExplorarDiosesComponent },
    { path: 'detalles-dios/:id',                canActivate: [ AuthGuard ], component:VerDetalleDiosComponent}, 
    { path: 'detalles-criatura/:id',            canActivate: [ AuthGuard ], component:VerDetalleCriaturaComponent},   
    { path: 'galeria-imagenes',                 canActivate: [ AuthGuard ], component: GaleriaImagenesComponent  },   
    { path: 'galeria-imagenes-construcciones',  canActivate: [ AuthGuard ], component:GaleriaImagenesContruccionesComponent }, 
    { path: 'detalleArq/:id',          canActivate: [ AuthGuard ], component:  VerDetalleArquitecturaComponent  },       
    { path: 'mitos-historias',                   canActivate: [ AuthGuard ], component: MitosHistoriaComponent },  
    { path: 'detalles-mitos-historias/:id',                   canActivate: [ AuthGuard ], component: VerDetalleMitosHistoriasComponent },
    { path: 'criaturas-mitologicas',            canActivate: [ AuthGuard ], component: CriaturasMitologicasComponent},   
    { path: 'explorar-mitologia',               canActivate: [ AuthGuard ], component: ExplorarMitologiaComponent },   
    { path: 'galeria-imagenes-mitologicas',     canActivate: [ AuthGuard ], component: GaleriaImagenesMitologicasComponent }, 
    { path: 'ceremonias',                       canActivate: [ AuthGuard ], component: CeremoniasComponent },   
    { path: 'expresiones-fe',                   canActivate: [ AuthGuard ], component: ExpresionesFeComponent },   
    { path: 'galeria-imagenes-religiosas',      canActivate: [ AuthGuard ], component: GaleriaImagenesReligionComponent }, 
    { path: 'practicas-religiosas',             canActivate: [ AuthGuard ], component: PracticasReligiosasComponent  }, 
    { path: 'rituales',                         canActivate: [ AuthGuard ], component: RitualesComponent }, 
    { path: 'prueba',                           canActivate: [ AuthGuard ], component: PruebasComponent },
    { path: 'podio',                            canActivate: [ AuthGuard ], component: PodioComponent  },
    {
        path: 'editar',
        component: ModificarUsuarioComponent
    },
    { path: 'explorar-construcciones', component: ExplorarConstruccionesComponent},
    { path: 'proceso-construcciones', component: ProcesoConstruccionesComponent},
    { path: 'detalle-proceso-construcciones/:id', component : VerDetalleProcesoConstruccionesComponent}
    
];
