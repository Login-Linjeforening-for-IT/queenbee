import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Event } from 'src/app/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  fetchEvent() {

  }

  fetchEvents() {
    return this.http
      .get<{ [id: string]: Event }>('http://localhost:8080/api/v1/events')
      .pipe(
        map(resData => {
          const eventsArray: Event[] = [];
          for (const id in resData) {
            if (resData.hasOwnProperty(id)) {
              const event: Event = resData[id];
              eventsArray.push(event);
            }
          }
          return eventsArray;
        })
      );
  }
}
