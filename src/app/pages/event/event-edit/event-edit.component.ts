import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConfirmComponent } from 'src/app/components/dialog/confirm/confirm.component';
import { FullEvent } from 'src/app/models/dataInterfaces.model';
import { EventService } from 'src/app/services/admin-api/event.service';
import { convertFromRFC3339 } from 'src/app/utils/time';
import { EventFormComponent } from '../event-form/event-form.component';
import { ErrorComponent } from 'src/app/components/dialog/error/error.component';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html'
})
export class EventEditComponent {
  @ViewChild(EventFormComponent) eventFormComponent!: EventFormComponent;
  eventFormValues!: FullEvent;

  eventID!: number;
  event!: FullEvent;
  timeUpdated!: string;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // Get the event ID from the URL
    this.route.url.subscribe(segments => {
      if (segments.length >= 3) {
        this.eventID = +segments[2].path;
      }
    });

    // Fetch the event
    this.eventService.fetchEvent(this.eventID).subscribe((fe: FullEvent) => {
      this.timeUpdated = convertFromRFC3339(fe.event.updated_at);
      this.event = fe;
      console.log(this.event)
    })
  }

  updateEvent() {
    const formValues = this.eventFormComponent.getFormValues();
    console.log(formValues)


    this.eventService.patchEvent(formValues).subscribe({
      next: () => {
        console.log("Event created successfully");
        // here you could navigate to another page, or show a success message, etc.
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

  cancelEvent() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        details: "Are you sure you want to cancel the event? (It will not be deleted)"
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log("User confirmed");

        const formValues = this.eventFormComponent.getFormValues();
        formValues.canceled = true;

        this.eventService.patchEvent(formValues).subscribe({
          next: () => {
            console.log("Event created successfully");
            // here you could navigate to another page, or show a success message, etc.
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
      } else if (result === false) {
        // User clicked "Close"
        console.log("User closed");
      } else {
        // Dialog was dismissed without user action
        console.log("Dialog dismissed");
      }
    });
  }
}
