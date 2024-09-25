import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth/auth.service'
import { BeehiveAPI } from '@env'

const { BASE_URL } = BeehiveAPI

if ( !BASE_URL ) {
    throw new Error('Missing BASE_URL environment variable.')
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    feedback: string = ''

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        // Initiate oauth login redirect on component load or based on user action
        this.redirectToOauth()
    }

    // Function to redirect user to the OAUTH SSO endpoint
    redirectToOauth() {
        const recentLogout = sessionStorage.getItem('logout')
        if (!this.authService.isAuthenticated() && !recentLogout) {
            window.location.href = `${BASE_URL === '__BASE_URL_PLACEHOLDER__' ? 'https://queenbee-api-dev.login.no/v1' : BASE_URL}/oauth2/login`
        }
    }
}