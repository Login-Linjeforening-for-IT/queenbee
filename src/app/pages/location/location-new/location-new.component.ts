import { Component, ViewChild } from '@angular/core';
import { LocationFormComponent } from '../location-form/location-form.component';
import { LocationService } from 'src/app/services/admin-api/location.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { BeehiveAPI } from 'src/app/config/constants';
import { scrollToTop } from 'src/app/utils/core';
import { ErrorComponent } from 'src/app/components/dialog/error/error.component';

@Component({
  selector: 'app-location-new',
  templateUrl: './location-new.component.html'
})
export class LocationNewComponent {
  @ViewChild(LocationFormComponent) locFormComponent!: LocationFormComponent;
  locFormValues!: Location;

  constructor(
    private locService: LocationService,
    private dialog: MatDialog,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  submitLoc() {
    const formValues = this.locFormComponent.getFormValues();
    
    this.locService.createLocation(formValues).subscribe({
      next: () => {
        this.router.navigate([BeehiveAPI.LOCATIONS_PATH]).then((navigated: boolean) => {
          if(navigated) {
            this.snackbarService.openSnackbar("Successfully created location", "OK", 2.5)
          }
        });
      },
      error: (error) => {
        scrollToTop();
        this.dialog.open(ErrorComponent, {
          data: {
            title: "Error: " + error.status + " " + error.statusText,
            details: error.error.error,
            autoFocus: false
          },
        });

      }
    });
  }
}
