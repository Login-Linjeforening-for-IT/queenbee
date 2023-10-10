import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

/**
 * The 'AlertComponent' is a component used for displaying short alert messages.
 * It displays the message in a yellow box.
 *
 * @example
 * <app-alert>
 *   [alertMsg]="'Something bad is about to happen!'">
 * </app-alert>
 */
export class AlertComponent {
  @Input() alertMsg!: string;
  showAlert: boolean = true;

  removeAlert() {
    this.showAlert = false;
  }
}
