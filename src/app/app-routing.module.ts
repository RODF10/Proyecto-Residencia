import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Ventanas/login/login.component';
import { PrincipalComponent } from './Ventanas/principal/principal.component';
import { VistasComponent } from './Ventanas/vistas/vistas.component';
import { StructureComponent } from './Layout/structure/structure.component';

const routes: Routes = [
  {
    path: 'login',
    component: StructureComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./Ventanas/windows-routing.module').then(
          (m) => m.WindowsRoutingModule
        ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login'
  }

  /*{path: '', redirectTo:'/login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path: 'home', component: PrincipalComponent},
  {path: 'view-person', component: VistasComponent},*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
