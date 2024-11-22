import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Ventanas/login/login.component';
import { PrincipalComponent } from './Ventanas/principal/principal.component';
import { HeaderComponent } from './Layout/header/header.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { ContentComponent } from './Layout/content/content.component';
import { VistasComponent } from './Ventanas/vistas/vistas.component';
import { StructureComponent } from './Layout/structure/structure.component';
import { WindowsRoutingModule } from './Ventanas/windows-routing.module';
import { DiagnosticComponent } from './Ventanas/diagnostic/diagnostic.component';
import { ListPersonComponent } from './Ventanas/list-person/list-person.component';
import { AboutComponent } from './Ventanas/about/about.component';
import { Category1Component } from './Ventanas/Diagnosticos/Funcional/category1.component';
import { EncuestaComponent } from './Ventanas/Encuesta/encuesta/encuesta.component';

//Incorporacion de Fecha
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import  localeEs  from '@angular/common/locales/es';
import { DashboardComponent } from './Ventanas/dashboard/dashboard.component';
import { ProfileMedicComponent } from './Ventanas/profile-medic/profile-medic.component'

//Conexio  Http
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ResultadosComponent } from './Ventanas/Encuesta/resultados/resultados.component';
import { EncuestaCogComponent } from './Ventanas/Diagnosticos/Cognitiva/encuesta-cog/encuesta-cog.component';
import { EncuestaAfcComponent } from './Ventanas/Diagnosticos/Afectiva/encuesta-afc/encuesta-afc.component';
import { EncuestaCESD7Component } from './Ventanas/Diagnosticos/Afectiva/encuesta-ces-d7/encuesta-ces-d7.component';
import { EncuestaPhq9Component } from './Ventanas/Diagnosticos/Afectiva/encuesta-phq9/encuesta-phq9.component';
import { EncuestaGaiSfComponent } from './Ventanas/Diagnosticos/Afectiva/encuesta-gai-sf/encuesta-gai-sf.component';
import { EncuestaBeckAnxietyComponent } from './Ventanas/Diagnosticos/Afectiva/encuesta-beck-anxiety/encuesta-beck-anxiety.component';
import { EncuestaEscalaSoledadComponent } from './Ventanas/Diagnosticos/Afectiva/encuesta-escala-soledad/encuesta-escala-soledad.component';
import { EncuestaSADPERSONSComponent } from './Ventanas/Diagnosticos/Afectiva/encuesta-sad-persons/encuesta-sad-persons.component';
import { EncuestaCornellComponent } from './Ventanas/Diagnosticos/Afectiva/encuesta-cornell/encuesta-cornell.component';
import { EncuestaOkeeffeComponent } from './Ventanas/Diagnosticos/Afectiva/encuesta-okeeffe/encuesta-okeeffe.component';
import { EncuestaAssessmentSFComponent } from './Ventanas/Diagnosticos/nutricional/encuesta-assessment-sf/encuesta-assessment-sf.component';
//import { NotFoundComponent } from './Ventanas/not-found/not-found.component';

//Registro de Fecha
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    VistasComponent,
    StructureComponent,
    DiagnosticComponent,
    ListPersonComponent,
    AboutComponent,
    Category1Component,
    DashboardComponent,
    ProfileMedicComponent,
    EncuestaComponent,
    ResultadosComponent,
    EncuestaCogComponent,
    EncuestaAfcComponent,
    EncuestaCESD7Component,
    EncuestaPhq9Component,
    EncuestaGaiSfComponent,
    EncuestaBeckAnxietyComponent,
    EncuestaEscalaSoledadComponent,
    EncuestaSADPERSONSComponent,
    EncuestaCornellComponent,
    EncuestaOkeeffeComponent,
    EncuestaAssessmentSFComponent,
    //NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    WindowsRoutingModule,
    HttpClientModule,
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }