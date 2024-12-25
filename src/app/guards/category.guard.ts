import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CategoryGuard implements CanActivate {
  private accessedFromList = false;

  constructor(private router: Router){}
  // Método para establecer si se accedió desde la lista de personas
  setAccessedFromList(value: boolean) {
    this.accessedFromList = value;
  }

  canActivate(): boolean {
    if (this.accessedFromList) {
      return true; // Permitir el acceso
    } else {
      // Redirigir a la lista de personas si no es válido
      this.router.navigate(['home/list-person']);
      return false;
    }
  }

};
