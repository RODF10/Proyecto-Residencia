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

import { EncuestaAfcComponent } from './Diagnosticos/Afectiva/encuesta-afc/encuesta-afc.component';
import { EncuestaCESD7Component } from './Diagnosticos/Afectiva/encuesta-ces-d7/encuesta-ces-d7.component';
import { EncuestaPhq9Component } from './Diagnosticos/Afectiva/encuesta-phq9/encuesta-phq9.component';
import { EncuestaGaiSfComponent } from './Diagnosticos/Afectiva/encuesta-gai-sf/encuesta-gai-sf.component';
import { EncuestaEscalaSoledadComponent } from './Diagnosticos/Afectiva/encuesta-escala-soledad/encuesta-escala-soledad.component';
import { EncuestaSADPERSONSComponent } from './Diagnosticos/Afectiva/encuesta-sad-persons/encuesta-sad-persons.component';
import { EncuestaCornellComponent } from './Diagnosticos/Afectiva/encuesta-cornell/encuesta-cornell.component';
import { EncuestaOkeeffeComponent } from './Diagnosticos/Afectiva/encuesta-okeeffe/encuesta-okeeffe.component';
import { EncuestaAssessmentSFComponent } from './Diagnosticos/Nutricional/encuesta-assessment-sf/encuesta-assessment-sf.component';
import { EncuestaAssessmentComponent } from './Diagnosticos/Nutricional/encuesta-assessment/encuesta-assessment.component';
import { EncuestaMustComponent } from './Diagnosticos/Nutricional/encuesta-must/encuesta-must.component';
import { EncuestaSarcFComponent } from './Diagnosticos/Nutricional/encuesta-sarc-f/encuesta-sarc-f.component';
import { EncuestaGlimComponent } from './Diagnosticos/Nutricional/encuesta-glim/encuesta-glim.component';
//Componentes de la encuesta
import { EncuestaCogComponent } from './Diagnosticos/Cognitiva/encuesta-cog/encuesta-cog.component';
import { EncuestaBeckAnxietyComponent } from './Diagnosticos/Afectiva/encuesta-beck-anxiety/encuesta-beck-anxiety.component';
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
