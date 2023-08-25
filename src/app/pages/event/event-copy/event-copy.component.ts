import { Component, ViewChild } from '@angular/core';
import { EventFormComponent } from '../event-form/event-form.component';
import { EventDetail } from 'src/app/models/dataInterfaces.model';
import { EventService } from 'src/app/services/api/event.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from 'src/app/components/dialog/error/error.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-copy',
  templateUrl: './event-copy.component.html'
})
export class EventCopyComponent {
  @ViewChild(EventFormComponent) eventFormComponent!: EventFormComponent;
  eventFormValues!: EventDetail;
  eventID!: number;
  event!: EventDetail;

  constructor(
    private eventService: EventService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit() {
    // Get the event ID from the URL
    this.route.url.subscribe(segments => {
      if (segments.length >= 3) {
        this.eventID = +segments[2].path;
      }
    });

    // Fetch the event
    this.eventService.fetchEvent(this.eventID).subscribe((e: EventDetail) => {
      // Erase a couple of fields
      e.time_start = "";
      e.time_end = "";
      e.time_publish = "";

      this.event = e;
    })
  }

  onFormValuesEmit(eventFormValues: { fv: EventDetail }) {
    console.log("New values")
    this.eventFormValues = eventFormValues.fv;

    this.eventService.createEvent(eventFormValues.fv).subscribe({
      next: () => {
        console.log("Event created successfully");
        // here you could navigate to another page, or show a success message, etc.
      },
      error: (error) => {
        this.scrollToTop();
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

  private scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }
  
  createEvent() {
    this.eventFormComponent.onEmit();
  }
}
