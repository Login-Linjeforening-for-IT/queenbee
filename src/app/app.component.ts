import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Initialize the authenticated property using a method from AuthService
    this.authenticated = this.authService.isAuthenticated();
  }
}
