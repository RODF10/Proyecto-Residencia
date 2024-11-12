import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from './principal/principal.component';
import { VistasComponent } from './vistas/vistas.component';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';
import { ListPersonComponent } from './list-person/list-person.component';
import { AboutComponent } from './about/about.component';
import { Category1Component } from './Diagnosticos/category1/category1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileMedicComponent } from './profile-medic/profile-medic.component';
import { EncuestaComponent } from './Encuesta/encuesta/encuesta.component';
import { ResultadosComponent } from './Encuesta/resultados/resultados.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../guards/auth.guard';

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
    path: 'encuestas',
    component: EncuestaComponent,
    canActivate: [AuthGuard]
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
    path: 'encuesta/:categoria',
    component: Category1Component,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WindowsRoutingModule { }
