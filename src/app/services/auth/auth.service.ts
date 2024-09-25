import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private router: Router, private route: ActivatedRoute) {}

    // Handles the response from the Admin API - redirects to login on failure
    handleAuthResponse() {
        const url = document.location.href

        const urlObj = new URL(url)
        const params = new URLSearchParams(urlObj.search)

        // // Extract individual values
        const accessToken = params.get('access_token')
        const accessTokenExpires = params.get('access_token_expires')
        const refreshToken = params.get('refresh_token')
        const refreshTokenExpires = params.get('refresh_token_expires')
        const userId = params.get('user_id')
        const userName = params.get('user_name')
        const userRoles = params.get('user_roles')
        
        if (accessToken && refreshToken && userId && userName && userRoles) {
            sessionStorage.setItem('access_token', accessToken)
            sessionStorage.setItem('access_token_expires', String(accessTokenExpires || ''))
            sessionStorage.setItem('refresh_token', refreshToken)
            sessionStorage.setItem('refresh_token_expires', String(refreshTokenExpires || ''))
            sessionStorage.setItem('user_id', userId)
            sessionStorage.setItem('user_name', userName)
            sessionStorage.setItem('user_roles', userRoles)

            // Redirect to dashboard after storing data
            this.router.navigate(['dashboard'])
        } else {
            console.log("missing params")
            // Redirects to login if any query params are missing
            this.router.navigate(['login'])
        }
    }

    // Checks if the user is authenticated
    isAuthenticated(): boolean {
        // Prefetches access token and sends to handleAuthResponse() if undefined
        const prefetch = sessionStorage.getItem('access_token')
        const recentLogout = sessionStorage.getItem('logout')
        if (!prefetch && !recentLogout) {
            this.handleAuthResponse()
        }

        // Checks sessionStorage for required tokens and data
        const accessToken = sessionStorage.getItem('access_token')
        const accessTokenExpires = sessionStorage.getItem('access_token_expires')
        const refreshToken = sessionStorage.getItem('refresh_token')
        const refreshTokenExpires = sessionStorage.getItem('refresh_token_expires')
        const userId = sessionStorage.getItem('user_id')
        const userName = sessionStorage.getItem('user_name')
        const userRoles = sessionStorage.getItem('user_roles')


        return !!(accessToken && refreshToken && userId && userName && userRoles && accessTokenExpires && refreshTokenExpires)
    }
}
