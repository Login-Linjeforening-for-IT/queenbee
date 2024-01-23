import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = this.authService.isAuthenticatedUser();

    if (isAuthenticated) {
      return true; // Allow access if the user is authenticated
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}