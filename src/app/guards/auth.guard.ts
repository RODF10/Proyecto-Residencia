import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../Service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
      return false;
    }
    return true;
  }
}
