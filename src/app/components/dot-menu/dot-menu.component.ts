import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dot-menu',
  templateUrl: './dot-menu.component.html',
  styleUrls: ['./dot-menu.component.css']
})

/**
 * Component for dot-menu meant to be used in each row in tables.
 *
 * @example
 * <app-dot-menu
 *   [path]="'events'"
 *   [row]="row"
 *   (delete)="onDelete($event)">
 * </app-dot-menu>
 */
export class DotMenuComponent {
  @Input() row: any;
  @Input() path!: string;
  @Output() delete = new EventEmitter<number>();

  onDelete(): void {
    this.delete.emit(this.row.id);
  }
}
