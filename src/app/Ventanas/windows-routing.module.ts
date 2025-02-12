import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//Ad Guard para verificar Login
import { AuthGuard } from '../guards/auth.guard';

//Componentes del HTML
import { PrincipalComponent } from './principal/principal.component';
import { VistasComponent } from './vistas/vistas.component';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';
import { AboutComponent } from './about/about.component';
import { Category1Component } from './Diagnosticos/Funcional/category1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileMedicComponent } from './profile-medic/profile-medic.component';
import { EncuestaComponent } from './Encuesta/encuesta/encuesta.component';
import { ResultadosComponent } from './Encuesta/resultados/resultados.component';
import { LoginComponent } from './login/login.component';

import { checkRedirectGuard } from '../guards/check-redirect.guard';
import { RegistroComponent } from './registro/registro.component';
import { ListDoctorsComponent } from './list-doctors/list-doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { CategoryGuard } from '../guards/category.guard';


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
    canActivate: [AuthGuard, CategoryGuard],
  },
  {
    path: 'diagnostic',
    component: DiagnosticComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-person',
    component: PatientsComponent,
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
    canActivate: [AuthGuard, checkRedirectGuard]
  },
  {
    path: 'doctors-register',
    component: RegistroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-doctors',
    component: ListDoctorsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register-patient',
    component: RegisterPatientComponent,
    canActivate: [AuthGuard]
  },
  /**
   * Borras este comentario despues, aqu estaba las url de las encuestas segu, pero no va a ser necesario,
   * porque todas las encuestas estan dentro de un componente y ahi solo lo llamamos con <app-encuesta??><-/app-encuesta>
   * asi que vi incesario que este aqu, solo extenden el codigo cuanod eso se usa en el componente encuesta
   */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WindowsRoutingModule { }
