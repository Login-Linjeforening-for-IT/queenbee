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
}
