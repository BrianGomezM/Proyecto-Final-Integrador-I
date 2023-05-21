import { Routes } from '@angular/router';
import { ExplorarConstruccionesComponent } from 'app/construcciones/explorar-construcciones/explorar-construcciones.component';
import { GaleriaImagenesContruccionesComponent } from 'app/construcciones/galeria-imagenes-contrucciones/galeria-imagenes-contrucciones.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { ExplorarDiosesComponent } from 'app/religion/dioses/explorar-dioses/explorar-dioses.component';
import { GaleriaImagenesComponent } from 'app/religion/dioses/galeria-imagenes/galeria-imagenes.component';
import { MitosHistoriaComponent } from 'app/religion/dioses/mitos-historia/mitos-historia.component';
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
import { UsuarioComponent } from 'app/usuario/usuario.component';




export const AdminLayoutRoutes: Routes = [
    { path: 'usuario',                          component: UsuarioComponent },
    { path: 'dashboard',                        component: DashboardComponent },   
    { path: 'explorar-dioses',                  component: ExplorarDiosesComponent },   
    { path: 'galeria-imagenes',                 component: GaleriaImagenesComponent  },   
    { path: 'galeria-imagenes-construcciones',  component:GaleriaImagenesContruccionesComponent },  
    
    { path: 'explorar-construcciones',          component: ExplorarConstruccionesComponent  },   
     
    
    { path: 'mitos-historia',                   component: MitosHistoriaComponent },   
   
    { path: 'criaturas-mitologicas',            component: CriaturasMitologicasComponent},   
    { path: 'explorar-mitologia',               component: ExplorarMitologiaComponent },   
    { path: 'galeria-imagenes-mitologicas',     component: GaleriaImagenesMitologicasComponent }, 
    { path: 'ceremonias',                       component: CeremoniasComponent },   
    { path: 'expresiones-fe',                   component: ExpresionesFeComponent },   
    { path: 'galeria-imagenes-religiosas',      component: GaleriaImagenesReligionComponent }, 
    { path: 'practicas-religiosas',             component: PracticasReligiosasComponent  }, 
    { path: 'rituales',                         component: RitualesComponent }, 
    { path: 'prueba',                           component: PruebasComponent },
    { path: 'podio',                            component: PodioComponent  },
];
