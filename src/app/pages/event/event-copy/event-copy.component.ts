import { Component, ViewChild } from '@angular/core';
import { EventFormComponent } from '../event-form/event-form.component';
import { FullEvent } from 'src/app/models/dataInterfaces.model';
import { EventService } from 'src/app/services/admin-api/event.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from 'src/app/components/dialog/error/error.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { BeehiveAPI } from '@env';

@Component({
  selector: 'app-event-copy',
  templateUrl: './event-copy.component.html'
})
export class EventCopyComponent {
  @ViewChild(EventFormComponent) eventFormComponent!: EventFormComponent;
  eventFormValues!: FullEvent;
  eventID!: number;
  event!: FullEvent;

  constructor(
    private eventService: EventService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService
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
      // Erase a couple of fields
      fe.event.time_start = "";
      fe.event.time_end = "";
      fe.event.time_publish = "";
      fe.event.link_signup = "";
      fe.event.time_signup_release = "";
      fe.event.time_signup_deadline = "";

      this.event = fe;
    })
  }

  createEvent() {
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
