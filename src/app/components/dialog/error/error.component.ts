import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  errorMessage: string = "This is a error!"

  constructor(private dialogRef: MatDialogRef<ErrorComponent>) { }

  onClose(): void {
    // Emit false to indicate deletion cancellation
    console.log("Clicked")
    this.dialogRef.close();
  }
}
