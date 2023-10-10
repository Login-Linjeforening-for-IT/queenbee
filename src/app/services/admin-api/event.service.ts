/**
 * Service for handeling requests to the events endpoint of Beehive API
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry } from 'rxjs';
import { BeehiveAPI } from 'src/app/config/constants';
import { EventTableItem, EventShort, FullEvent } from 'src/app/models/dataInterfaces.model';
import { convertFromRFC3339 } from 'src/app/utils/time';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  
  constructor(private http: HttpClient) {}

  /**
   * Gets a single event from the epi.
   * @param eventId id of event
   * @returns EventDetail observable
   */
  fetchEvent(eventId: number): Observable<FullEvent> {
    return this.http
      .get<FullEvent>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.EVENTS_PATH}${eventId}`)
      .pipe(
        map(resData => {
          if (resData) {
            const event: FullEvent = resData;
            return event;
          }
          throw new Error('No event found with id ' + eventId);
        })
      );
  }

  fetchEvents(): Observable<EventTableItem[]> {
    return this.http
      .get<{ [id: string]: EventShort }>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.EVENTS_PATH}`)
      .pipe(
        map(resData => {
          const eventsArray: EventTableItem[] = [];
          for (const id in resData) {
            if (resData.hasOwnProperty(id)) {
              const eventShort: EventShort = resData[id];
              const event: EventTableItem = {
                id: eventShort.id,
                visible: eventShort.visible,
                name: eventShort.name_en || eventShort.name_no, // Set name to name_en if it exists, else set to name_no
                time_type: eventShort.time_type,
                time_start: convertFromRFC3339(eventShort.time_start),
                time_end: convertFromRFC3339(eventShort.time_end),
                time_publish: convertFromRFC3339(eventShort.time_publish),
                canceled: eventShort.canceled,
                link_signup: eventShort.link_signup,
                capacity: eventShort.capacity,
                full: eventShort.full,
                category_name: eventShort.category_name_en || eventShort.category_name_no, // Set category_name to name_en if it exists, else set to name_no
                location_name: eventShort.location_name_en || eventShort.location_name_no, // Set location_name to name_en if it exists, else set to name_no
                updated_at: convertFromRFC3339(eventShort.updated_at),
                is_deleted: false, // Assuming this is a constant value
                audiences: eventShort.audiences,
                organizers: eventShort.organizers,
              };
  
              eventsArray.push(event);
            }
          }
          return eventsArray;
        })
      );
  }
  

  /**
   * Sends a POST request to the API with event
   * @param event EventDetail object
   * @returns observable
   */
  createEvent(event: FullEvent) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // Set potentially null fields to an empty string
    /*event.image_small = event.image_small || "NONE";
    event.image_banner = event.image_banner || "NONE";
    event.link_facebook = event.link_facebook || "NONE";
    event.link_discord = event.link_discord || "NONE";
    event.link_signup = event.link_signup || "NONE";*/

    return this.http
      .post<FullEvent>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.EVENTS_PATH}`, event, httpOptions)
      .pipe(
        map(resData => {
          if (resData) {
            const newEvent: FullEvent = resData;
            return newEvent;
          }
          throw new Error('Failed to create event');
        })
      );
  }

  /**
   * Sends a PATCH request to the API with event
   * @param event EventDetail object
   * @returns observable
   */
  patchEvent(event: FullEvent) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // Set potentially null fields to an empty string
    /*event.image_small = event.image_small || "NONE";
    event.image_banner = event.image_banner || "NONE";
    event.link_facebook = event.link_facebook || "NONE";
    event.link_discord = event.link_discord || "NONE";
    event.link_signup = event.link_signup || "NONE";*/

    return this.http
      .patch<FullEvent>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.EVENTS_PATH}`, event, httpOptions)
      .pipe(
        map(resData => {
          if (resData) {
            const newEvent: FullEvent = resData;
            return newEvent;
          }
          throw new Error('Failed to patch event');
        })
      );
  }
}
