import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})

/**
 * The 'ConfirmComponent' is a dialog that is used to confirm an action.
 *
 * @example
 * <app-confirm
 *   [details]="'Are you sure you want to resign from art class?'">
 * </app-confirm>
 */
export class ConfirmComponent {
  @Input() details!: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.details = data.details;
    }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
