import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from 'src/app/components/dialog/error/error.component';
import { EventData, FullEvent } from 'src/app/models/dataInterfaces.model';
import { EventService } from 'src/app/services/admin-api/event.service';
import { EventFormComponent } from '../event-form/event-form.component';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { BeehiveAPI } from 'src/app/config/constants';

@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html'
})
export class EventNewComponent {
  @ViewChild(EventFormComponent) eventFormComponent!: EventFormComponent;
  eventFormValues!: EventData;

  constructor(
    private eventService: EventService,
    private router: Router,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  submitEvent() {
    const formValues = this.eventFormComponent.getFormValues();

    this.eventService.createEvent(formValues).subscribe({
      next: () => {
        this.router.navigate([BeehiveAPI.EVENTS_PATH]).then((navigated: boolean) => {
          if(navigated) {
            this.snackbarService.openSnackbar("Successfully created event", "OK", 2.5)
          }
        });
      },
      error: (error) => {
        console.log("Erroring")
        this.dialog.open(ErrorComponent, {
          data: {
            title: "Error: " + error.status + " " + error.statusText,
            details: error.error.error
          },
        });

      }
    });
  }
}
