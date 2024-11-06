import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { VistasComponent } from './vistas/vistas.component';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';
import { ListPersonComponent } from './list-person/list-person.component';
import { AboutComponent } from './about/about.component';
import { Category1Component } from './Diagnosticos/category1/category1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileMedicComponent } from './profile-medic/profile-medic.component';
import { EncuestaComponent } from './Encuesta/encuesta/encuesta.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'encuestas',
    component: EncuestaComponent
  },
  {
    path: 'home',
    component: PrincipalComponent
  },
  {
    path: 'view-person',
    component: VistasComponent
  },
  {
    path: 'diagnostic',
    component: DiagnosticComponent
  },
  {
    path: 'list-person',
    component: ListPersonComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'esfera-cognitiva',
    component: Category1Component
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WindowsRoutingModule { }
