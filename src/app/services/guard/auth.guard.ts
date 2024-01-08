import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Retrieve AuthService instance

  const isAuthenticated = authService.isAuthenticatedUser();
  
  console.log("auth", isAuthenticated)
  if (isAuthenticated) {
    return true; // Allow access if user is authenticated
  } else {
    window.location.href = '/login'; // Redirect to login path
    return false;
  }
};