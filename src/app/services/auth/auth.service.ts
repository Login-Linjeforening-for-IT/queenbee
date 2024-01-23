import { Injectable } from '@angular/core';
import valid from 'src/app/pages/login/valid';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor() {}

    // Method to check authentication status
    isAuthenticatedUser(): boolean {
        const token = getCookie('token');
        return valid(token)
    }
}

function getCookie(name: string) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
}
