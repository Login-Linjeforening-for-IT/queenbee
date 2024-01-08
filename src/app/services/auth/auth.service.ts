import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private isAuthenticated = false;

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
