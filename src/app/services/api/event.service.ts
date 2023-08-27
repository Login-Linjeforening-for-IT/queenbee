/**
 * Service for handeling requests to the events endpoint of Beehive API
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BeehiveAPI } from 'src/app/config/constants';
import { EventShort, EventDetail } from 'src/app/models/dataInterfaces.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  /**
   * Gets a single event from the epi.
   * @param eventId id of event
   * @returns EventDetail observable
   */
  fetchEvent(eventId: number): Observable<EventDetail> {
    return this.http
      .get<EventDetail>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.EVENTS_PATH}/${eventId}`)
      .pipe(
        map(resData => {
          if (resData) {
            const event: EventDetail = resData;
            return event;
          }
          throw new Error('No event found with id ' + eventId);
        })
      );
  }

  /**
   * Gets all events from the epi.
   * @returns EventShort array
   */
  fetchEvents(): Observable<EventShort[]> {
    return this.http
      .get<{ [id: string]: EventShort }>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.EVENTS_PATH}`)
      .pipe(
        map(resData => {
          const eventsArray: EventShort[] = [];
          for (const id in resData) {
            if (resData.hasOwnProperty(id)) {
              const event: EventShort = resData[id];
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
  createEvent(event: EventDetail) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // Set potentially null fields to an empty string
    event.image_small = event.image_small || "NONE";
    event.image_banner = event.image_banner || "NONE";
    event.link_facebook = event.link_facebook || "NONE";
    event.link_discord = event.link_discord || "NONE";
    event.link_signup = event.link_signup || "NONE";

    return this.http
      .post<EventDetail>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.EVENTS_PATH}`, event, httpOptions)
      .pipe(
        map(resData => {
          if (resData) {
            const newEvent: EventDetail = resData;
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
  patchEvent(event: EventDetail) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // Set potentially null fields to an empty string
    event.image_small = event.image_small || "NONE";
    event.image_banner = event.image_banner || "NONE";
    event.link_facebook = event.link_facebook || "NONE";
    event.link_discord = event.link_discord || "NONE";
    event.link_signup = event.link_signup || "NONE";

    return this.http
      .patch<EventDetail>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.EVENTS_PATH}`, event, httpOptions)
      .pipe(
        map(resData => {
          if (resData) {
            const newEvent: EventDetail = resData;
            return newEvent;
          }
          throw new Error('Failed to patch event');
        })
      );
  }
}
