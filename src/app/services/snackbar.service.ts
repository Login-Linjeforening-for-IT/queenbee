import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackbar: MatSnackBar) { }

  openSnackbar(message: string, action: string, seconds: number) {
    this._snackbar.open(message, action, {
      duration: seconds * 1000, 
      panelClass: ['custom-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }
}
