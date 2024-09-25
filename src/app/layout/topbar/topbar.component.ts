import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
    constructor() {}

    logout() {
        sessionStorage.clear()
        sessionStorage.setItem('logout', 'true')
        location.href = '/logout'
    }
}
