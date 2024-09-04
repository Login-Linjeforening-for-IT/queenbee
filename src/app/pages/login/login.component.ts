import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth/auth.service'
import { environment } from '../../../../environment.prod';

const { OAUTH_URL } = environment

if ( !OAUTH_URL ) {
    throw new Error('Missing OAUTH_URL environment variable.')
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
        this.redirectToOauth();
    }

    // Function to redirect user to the OAUTH SSO endpoint
    redirectToOauth() {
        window.location.href = OAUTH_URL || 'https://login.no/404';
    }
}