import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})

/**
 * The 'ErrorComponent' is a dialog that is used to display an error message.
 *
 * @example
 * <app-error
 *   [title]="'Rejected!'"
 *   [details]="'You got rejected from art school!'">
 * </app-error>
 */
export class ErrorComponent {
  @Input() title!: string;
  @Input() details!: string;

  constructor(
    private dialogRef: MatDialogRef<ErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.title = data.title;
      this.details = data.details;
    }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
