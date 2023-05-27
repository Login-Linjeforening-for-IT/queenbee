import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EventData } from 'src/app/models/event-data.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  fetchEvent() {

  }

  fetchEvents(): Observable<EventData[]> {
    return this.http
      .get<{ [id: string]: EventData }>('http://localhost:8080/api/v1/events')
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
