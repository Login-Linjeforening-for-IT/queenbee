import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.setAuthenticatedStatus(false);
  }
}
