import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Ventanas/login/login.component';
import { PrincipalComponent } from './Ventanas/principal/principal.component';
import { VistasComponent } from './Ventanas/vistas/vistas.component';
import { StructureComponent } from './Layout/structure/structure.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: StructureComponent,
    canActivate: [AuthGuard], // Protege la ruta con el guard
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
    path: 'login', // Ruta para el administrador
  component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  
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