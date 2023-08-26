import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from 'src/app/components/dialog/error/error.component';
import { EventDetail } from 'src/app/models/dataInterfaces.model';
import { EventService } from 'src/app/services/api/event.service';
import { EventFormComponent } from '../event-form/event-form.component';
import { scrollToTop } from 'src/app/utils/core';

@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.css']
})
export class EventNewComponent {
  @ViewChild(EventFormComponent) eventFormComponent!: EventFormComponent;
  eventFormValues!: EventDetail;

  constructor(
    private eventService: EventService,
    private dialog: MatDialog
  ) {}

  submitEvent() {
    const formValues = this.eventFormComponent.getFormValues();

    this.eventService.createEvent(formValues).subscribe({
      next: () => {
        console.log("Event created successfully");
        // here you could navigate to another page, or show a success message, etc.
      },
      error: (error) => {
        scrollToTop();
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
