import { Component } from '@angular/core';
import { LocationsConstants } from '../pages.constants';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html'
})
export class LocationsComponent {
  title = LocationsConstants.TITLE
}
