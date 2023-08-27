import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BeehiveAPI } from 'src/app/config/constants';
import { JobadDetail, JobadShort } from 'src/app/models/dataInterfaces.model';

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
   * Gets all jobads from the API
   * @returns EventShort array
   */
  fetchJobads(): Observable<JobadShort[]> {
    return this.http
      .get<{ [id: string]: any }>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.JOBADS_PATH}`)
      .pipe(
        map(resData => {
          return resData['jobs'];
        })
      );
  }
}
