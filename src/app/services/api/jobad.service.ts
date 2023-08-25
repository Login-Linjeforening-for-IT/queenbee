import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BeehiveAPI } from 'src/app/config/constants';
import { JobadDetail } from 'src/app/models/dataInterfaces.model';

@Injectable({
  providedIn: 'root'
})
export class JobadService {

  constructor(private http: HttpClient) { }

  /**
   * Gets a single jobad from the epi.
   * @param jobadID id of jobad
   * @returns JobadDetail observable
   */
  fetchJobad(jobadID: number): Observable<JobadDetail> {
    return this.http
      .get<JobadDetail>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.JOBADS_PATH}/${jobadID}`)
      .pipe(
        map(resData => {
          if (resData) {
            const jobad: JobadDetail = resData;
            return jobad;
          }
          throw new Error('No event found with id ' + jobadID);
        })
      );
  }

  /**
   * Gets all jobads from the epi. REWRITE THIS TO JOBAD!!!
   * @returns EventShort array
   */
  /*fetchEvents(): Observable<EventShort[]> {
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
  }*/
}
