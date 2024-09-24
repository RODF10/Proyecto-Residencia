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
import { Category1Component } from './Ventanas/Diagnosticos/category1/category1.component';

//Incorporacion de Fecha
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import  localeEs  from '@angular/common/locales/es'

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
    Category1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    WindowsRoutingModule,
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
