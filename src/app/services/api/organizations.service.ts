/**
 * Service for handeling requests to the organization endpoint of Beehive API
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BeehiveAPI } from 'src/app/config/constants';
import { Organization } from 'src/app/models/dataInterfaces.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }

  /**
   * Returns all organizations
   * @returns Organization array
   */
  fetchOrganizations(): Observable<Organization[]> {
    return this.http
      .get<{ [id: string]: any }>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.ORGANIZATIONS_PATH}`)
      .pipe(
        map(resData => {
          return resData['organizations'];
        })
      );
  }
  
  /**
   * Sends a POST request to the API with org
   * @param org Organization object
   * @returns 
   */
  createOrganization(org: Organization): Observable<Organization> {
    return this.http
      .post<Organization>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.ORGANIZATIONS_PATH}`, org)
      .pipe(
        map(resData => {
          if (resData) {
            const newEvent: Organization = resData;
            return newEvent;
          }
          throw new Error('Failed to create event');
        })
      );
  }
}
