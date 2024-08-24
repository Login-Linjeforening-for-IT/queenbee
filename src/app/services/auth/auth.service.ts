import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(private router: Router) {}

    handleAuthResponse() {
        const token = this.getTokenFromUrl();
        if (token) {
            document.cookie = `token=${token}; path=/; Secure; HttpOnly; SameSite=Strict`;
            this.router.navigate(['dashboard']);
        } else {
            this.router.navigate(['login']);
        }
    }

    private getTokenFromUrl(): string | null {
        const params = new URLSearchParams(window.location.search);
        return params.get('token'); 
    }

    // Add method to check if the user is authenticated
    isAuthenticated(): boolean {
        // Logic to check if the user is authenticated
        return document.cookie.includes('token=');
    }
}