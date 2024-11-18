import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//Ad Guard para verificar Login
import { AuthGuard } from '../guards/auth.guard';

//Componentes del HTML
import { PrincipalComponent } from './principal/principal.component';
import { VistasComponent } from './vistas/vistas.component';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';
import { ListPersonComponent } from './list-person/list-person.component';
import { AboutComponent } from './about/about.component';
import { Category1Component } from './Diagnosticos/Funcional/category1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileMedicComponent } from './profile-medic/profile-medic.component';
import { EncuestaComponent } from './Encuesta/encuesta/encuesta.component';
import { ResultadosComponent } from './Encuesta/resultados/resultados.component';
import { LoginComponent } from './login/login.component';

//Componentes de la encuesta
import { EncuestaCogComponent } from './Diagnosticos/Cognitiva/encuesta-cog/encuesta-cog.component';
import { checkRedirectGuard } from '../guards/check-redirect.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PrincipalComponent,
  },
  {
    path: 'view-person',
    component: VistasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'diagnostic',
    component: DiagnosticComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-person',
    component: ListPersonComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileMedicComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'resultado',
    component: ResultadosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'encuesta/:categoria',
    component: EncuestaComponent,
    canActivate: [checkRedirectGuard]
  },
  //Encuestas de los URL
  {
    path: 'encuesta-cog', 
    component: EncuestaCogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'category1',
    component: Category1Component,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WindowsRoutingModule { }
