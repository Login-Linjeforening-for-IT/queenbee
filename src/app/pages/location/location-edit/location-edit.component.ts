import { Component, ViewChild } from '@angular/core';
import { LocationFormComponent } from '../location-form/location-form.component';
import { Location } from 'src/app/models/dataInterfaces.model';
import { LocationService } from 'src/app/services/admin-api/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { convertFromRFC3339 } from 'src/app/utils/time';
import { BeehiveAPI } from 'src/app/config/constants';
import { ErrorComponent } from 'src/app/components/dialog/error/error.component';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html'
})
export class LocationEditComponent {
  @ViewChild(LocationFormComponent) locFormComponent!: LocationFormComponent;
  locID!: number;
  loc!: Location;
  timeUpdated!: string;

  constructor(
    private locService: LocationService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    // Get the organization shortname from the URL
    this.route.url.subscribe(segments => {
      if (segments.length >= 3) {
        this.locID = +segments[2].path;
      }
    });

    // Fetch the event
    this.locService.fetchLocation(this.locID).subscribe((l: Location) => {
      this.timeUpdated = convertFromRFC3339(l.updated_at);
      this.loc = l;
    })
  }

  updateLoc() {
    const formValues = this.locFormComponent.getFormValues();
    console.log(formValues)
    //formValues.shortname = this.shortname;

    this.locService.patchLoc(formValues).subscribe({
      next: () => {
        this.router.navigate([BeehiveAPI.LOCATIONS_PATH]).then((navigated: boolean) => {
          if(navigated) {
            this.snackbarService.openSnackbar("Successfully updated location", "OK", 2.5)
          }
        });
      },
      error: (error) => {
        console.log("Erroring")
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
