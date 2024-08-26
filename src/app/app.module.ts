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
import { TestListComponent } from './Ventanas/test-list/test-list.component';

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
    TestListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    WindowsRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
