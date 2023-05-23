import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dot-menu',
  templateUrl: './dot-menu.component.html',
  styleUrls: ['./dot-menu.component.css']
})
export class DotMenuComponent {
  @Input() row: any;
  @Input() path!: string;
  @Output() delete = new EventEmitter<number>();

  onDelete(): void {
    this.delete.emit(this.row.id);
  }
}
