import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BeehiveAPI } from 'src/app/config/constants';
import { EventData } from 'src/app/models/event-data.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  fetchEvent(eventId: number): Observable<EventData> {
    return this.http
      .get<EventData>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.EVENTS_PATH}/${eventId}`)
      .pipe(
        map(resData => {
          if (resData) {
            const event: EventData = resData;
            return event;
          }
          throw new Error('No event found with id ' + eventId);
        })
      );
  }

  fetchEvents(): Observable<EventData[]> {
    return this.http
      .get<{ [id: string]: EventData }>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.EVENTS_PATH}`)
      .pipe(
        map(resData => {
          const eventsArray: EventData[] = [];
          for (const id in resData) {
            if (resData.hasOwnProperty(id)) {
              const event: EventData = resData[id];
              eventsArray.push(event);
            }
          }
          return eventsArray;
        })
      );
  }
}
