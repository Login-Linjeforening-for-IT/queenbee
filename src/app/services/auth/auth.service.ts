import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private isAuthenticated = true;

    constructor() {}

    // Method to check authentication status
    isAuthenticatedUser(): boolean {
        // Logic to check if user is authenticated
        return this.isAuthenticated;
    }

    // Method to set authentication status
    setAuthenticatedStatus(status: boolean) {
        this.isAuthenticated = status;
    }
}
