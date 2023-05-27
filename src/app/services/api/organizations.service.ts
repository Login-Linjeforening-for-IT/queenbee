/**
 * Service for handeling requests to the organization endpoint of Beehive API
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BeehiveAPI } from 'src/app/config/constants';
import { Organization, DropDownMenu } from 'src/app/models/dataInterfaces.model';

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
      .get<{ [id: string]: Organization }>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.ORGANIZATIONS_PATH}`)
      .pipe(
        map(resData => {
          const eventsArray: Organization[] = [];
          for (const id in resData) {
            if (resData.hasOwnProperty(id)) {
              const event: Organization = resData[id];
              eventsArray.push(event);
            }
          }
          return eventsArray;
        })
      );
  }

  /**
   * Fetches all organizations, but converts them to DropDownMenu before returning them.
   * @returns All organizations as DropDownMenu[]
   */
  getDropDownMenuOrganizations(): Observable<DropDownMenu[]> {
    return this.fetchOrganizations().pipe(
      map((response: any) => {
        // Here, response[0] is the array of organizations
        if (!response || !Array.isArray(response[0])) {
          console.error('Response or organizations is undefined: ', response);
          return [];
        }
        const organizations: Organization[] = response[0];
        return organizations.map((org: Organization) => {
          return {
            value: org.shortname,
            viewValue: org.name_no
          };
        });
      })
    );
  }  
}
