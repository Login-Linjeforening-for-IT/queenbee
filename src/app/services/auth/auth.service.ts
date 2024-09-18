import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private router: Router) {}

    // Handles the response from the Admin API
    handleAuthResponse() {
        const accessToken = this.getCookie('access_token')
        const refreshToken = this.getCookie('refresh_token')
        const userId = this.getCookie('user_id')
        const userName = this.getCookie('user_name')
        const userRoles = this.getCookie('user_roles')
    
        console.log(accessToken, refreshToken, userId, userName, userRoles)
        if (accessToken && refreshToken && userId && userName && userRoles) {
            // Stores all cookies securely
            document.cookie = `access_token=${accessToken}; path=/; Secure; HttpOnly; SameSite=Strict`
            document.cookie = `refresh_token=${refreshToken}; path=/; Secure; HttpOnly; SameSite=Strict`
            document.cookie = `user_id=${userId}; path=/; Secure; HttpOnly; SameSite=Strict`
            document.cookie = `user_name=${userName}; path=/; Secure; HttpOnly; SameSite=Strict`
            document.cookie = `user_roles=${userRoles}; path=/; Secure; HttpOnly; SameSite=Strict`
        
            // Redirects to dashboard
            this.router.navigate(['dashboard'])
        } else {
            // Redirects to login if any cookie is missing
            this.router.navigate(['login'])
        }
    }

    // Add method to check if the user is authenticated
    isAuthenticated(): boolean {
        this.handleAuthResponse()
        // Check if all required cookies are present
        const accessToken = this.getCookie('access_token')
        const refreshToken = this.getCookie('refresh_token')
        const userId = this.getCookie('user_id')
        const userName = this.getCookie('user_name')
        const userRoles = this.getCookie('user_roles')
        console.log("gubbe", accessToken, refreshToken, userId, userName, userRoles)
    
        return !!(accessToken && refreshToken && userId && userName && userRoles)
    }

    // Helper method to retrieve cookie by name
    private getCookie(name: string): string | null {
        const matches = document.cookie.match(new RegExp(
            `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
        ))

        console.log(document.cookie)

        return matches ? decodeURIComponent(matches[1]) : null
    }
}
