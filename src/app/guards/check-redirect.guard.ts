import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class checkRedirectGuard implements CanActivate{
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Aquí decides si debe acceder o ser redirigido
    //const canAccessEncuesta = this.checkAccessToEncuesta(); // Implementa tu lógica
    const canAccessEncuesta = localStorage.getItem('subCatSeleccionada');

    if (!canAccessEncuesta) {
      // Redirige al componente de categoría
      this.router.navigate(['/categoria']);
      return false; // Bloquea acceso al componente encuesta
    }
    return true; // Permite acceso
  }

  /*private checkAccessToEncuesta(): boolean {
    // Aquí puedes verificar una condición, como si seleccionó una categoría
    const categoriaSeleccionada = localStorage.getItem('subCatSeleccionada');
    return !!categoriaSeleccionada; // Devuelve true si existe
  }*/
}