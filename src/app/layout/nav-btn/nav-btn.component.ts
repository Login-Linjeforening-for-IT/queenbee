import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-nav-btn',
  templateUrl: './nav-btn.component.html',
  styleUrls: ['./nav-btn.component.css']
})
export class NavBtnComponent {
  @Input() title!: string;
  @Input() link!: string;
  @Input() symbol!: string;
}
