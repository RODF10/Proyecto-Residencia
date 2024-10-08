import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Ventanas/login/login.component';
import { PrincipalComponent } from './Ventanas/principal/principal.component';
import { VistasComponent } from './Ventanas/vistas/vistas.component';
import { TestListComponent } from './test-list/test-list.component';

const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path: 'home', component: PrincipalComponent},
  {path: 'view-person', component: VistasComponent},
  {path: 'test-list', component: TestListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
