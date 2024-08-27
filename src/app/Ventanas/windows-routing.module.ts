import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { VistasComponent } from './vistas/vistas.component';
import { TestListComponent } from './test-list/test-list.component';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';

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
    path: 'home',
    component: PrincipalComponent
  },
  {
    path: 'view-person',
    component: VistasComponent
  },
  {
    path: 'test-list',
    component: TestListComponent  
  },
  {
    path: 'diagnostic',
    component: DiagnosticComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WindowsRoutingModule { }
