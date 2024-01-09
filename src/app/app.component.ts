import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'queenbee';
  
  constructor(private authService: AuthService) {}

  get authenticated(): boolean {
    return this.authService.isAuthenticatedUser();
  }
}
