import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  feedback: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Initiate SAML login redirect on component load or based on user action
    this.redirectToSaml();
  }

  // Function to redirect user to the SAML SSO endpoint
  redirectToSaml() {
    window.location.href = 'https://authentik.login.no/application/saml/queenbee/sso/binding/init/';
  }
}