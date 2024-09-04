import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth/auth.service'
import { config } from 'dotenv'

config()

const { SAML_URL } = process.env

if ( !SAML_URL ) {
    throw new Error('Missing SAML_URL environment variable.')
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
        // Initiate SAML login redirect on component load or based on user action
        this.redirectToSaml();
    }

    // Function to redirect user to the SAML SSO endpoint
    redirectToSaml() {
        window.location.href = SAML_URL || 'https://login.no/404';
    }
}