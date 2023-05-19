import { Component } from '@angular/core';
import { JobadsConstants } from '../pages.constants';

@Component({
  selector: 'app-jobads',
  templateUrl: './jobads.component.html',
  styleUrls: ['./jobads.component.css']
})
export class JobadsComponent {
  title= JobadsConstants.TITLE
}
