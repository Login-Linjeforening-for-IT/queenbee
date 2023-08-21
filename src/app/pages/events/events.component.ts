import { Component } from '@angular/core';
import {EventsConstants} from '../pages.constants'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent {
  title = EventsConstants.TITLE

  scrollToTop() {
    console.log("Triggered scroll")
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }
}
