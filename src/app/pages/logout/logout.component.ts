import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth/auth.service'
import { BeehiveAPI } from '@env'

const { BASE_URL } = BeehiveAPI

if ( !BASE_URL ) {
    throw new Error('Missing BASE_URL environment variable.')
}

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
    feedback: string = ''

    constructor(private authService: AuthService, private router: Router) {}

    // Function to redirect user to the OAUTH SSO endpoint
    login() {
        sessionStorage.clear()
        window.location.href = `${BASE_URL === '__BASE_URL_PLACEHOLDER__' ? 'https://queenbee-api-dev.login.no/v1' : BASE_URL}/oauth2/login`
    }
}