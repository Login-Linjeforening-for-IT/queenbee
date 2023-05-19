import { Component } from '@angular/core';
import { OrganizationsConstants } from '../pages.constants';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent {
  title = OrganizationsConstants.TITLE
}
