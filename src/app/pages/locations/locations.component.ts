import { Component } from '@angular/core';
import { LocationsConstants } from '../pages.constants';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent {
  title = LocationsConstants.TITLE
}
