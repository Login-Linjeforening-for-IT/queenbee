import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private router: Router, private route: ActivatedRoute) {}

    // Handles the response from the Admin API (now from the URL query params)
    handleAuthResponse() {
        const queryParams = this.route.snapshot.queryParams

        const accessToken = queryParams['access_token']
        const refreshToken = queryParams['refresh_token']
        const userId = queryParams['user_id']
        const userName = queryParams['user_name']
        const userRoles = queryParams['user_roles']

        console.log(accessToken, refreshToken, userId, userName, userRoles)
        
        if (accessToken && refreshToken && userId && userName && userRoles) {
            // Store items in sessionStorage
            sessionStorage.setItem('access_token', accessToken)
            sessionStorage.setItem('refresh_token', refreshToken)
            sessionStorage.setItem('user_id', userId)
            sessionStorage.setItem('user_name', userName)
            sessionStorage.setItem('user_roles', userRoles)

            // Redirect to dashboard after storing data
            this.router.navigate(['dashboard'])
        } else {
            // Redirects to login if any query params are missing
            this.router.navigate(['login'])
        }
    }

    // Checks if the user is authenticated
    isAuthenticated(): boolean {
        // Checks sessionStorage for required tokens and data
        const accessToken = sessionStorage.getItem('access_token')
        const refreshToken = sessionStorage.getItem('refresh_token')
        const userId = sessionStorage.getItem('user_id')
        const userName = sessionStorage.getItem('user_name')
        const userRoles = sessionStorage.getItem('user_roles')

        console.log("Auth check:", accessToken, refreshToken, userId, userName, userRoles)

        return !!(accessToken && refreshToken && userId && userName && userRoles)
    }
}
