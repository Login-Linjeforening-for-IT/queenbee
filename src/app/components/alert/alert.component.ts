import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() alertMsg!: string;
  showAlert: boolean = true;

  removeAlert() {
    this.showAlert = false;
  }
}
