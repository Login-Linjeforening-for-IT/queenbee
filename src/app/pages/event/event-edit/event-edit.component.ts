import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDetail } from 'src/app/models/dataInterfaces.model';
import { EventService } from 'src/app/services/api/event.service';
import { convertFromRFC3339 } from 'src/app/utils/time';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent {
  eventID!: number;
  event!: EventDetail;
  timeUpdated!: string;
  
  constructor(
    private eventService: EventService,
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
      this.timeUpdated = convertFromRFC3339(e.time_updated);
      this.event = e;
      console.log("Edit component:")
      console.log(this.event)
    })
  }

  updateEvent() {
    /*
    this.eventService.createEvent(this.eventForm.value).subscribe({
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
          },
        });

      }
    });*/
  }

  cancelEvent() {
    /*if(confirm("Are you sure you want to cancel this event? (it will not be deleted)")) {
      this.eventForm.get('canceled')?.setValue(true);
    }*/
  }
}
