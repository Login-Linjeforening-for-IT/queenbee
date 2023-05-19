import { Component } from '@angular/core';
import {EventsConstants} from '../pages.constants'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  title = EventsConstants.TITLE
}
