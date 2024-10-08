/**
 * Service for handeling requests to the organization endpoint of Beehive API
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BeehiveAPI } from '@env';
import { convertFromRFC3339 } from 'src/app/utils/time';
import { 
    OrgShort, 
    OrgTableItem, 
    Organization 
} from 'src/app/models/dataInterfaces.model';
import Auth from '../auth/auth';

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {

    constructor(private http: HttpClient) { }

    fetchOrg(shortname: string): Observable<Organization> {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http
        .get<Organization>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.ORGANIZATIONS_PATH}${shortname}`, options)
        .pipe(
            map(org => {
            if (org) {
                return org;
            } else {
                throw new Error('Organization not found');
            }
            })
        );
    }

    /**
     * Returns all organizations
     * @returns Organization array
     */
    fetchOrganizations(): Observable<OrgTableItem[]> {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http
        .get<{ [id: string]: any }>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.ORGANIZATIONS_PATH}?limit=100000`, options)
        .pipe(
            map(resData => {
            const orgArray: OrgTableItem[] = [];
            for (const shortname in resData) {
                const orgShort: OrgShort = resData[shortname]
                
                if(orgShort && !orgShort.is_deleted) {
                const org: OrgTableItem = {
                    id: orgShort.shortname,
                    name: orgShort.name_en || orgShort.name_no,
                    link_homepage: orgShort.link_homepage,
                    logo: orgShort.logo,
                    updated_at: convertFromRFC3339(orgShort.updated_at),
                    is_deleted: orgShort.is_deleted,
                };
    
                orgArray.push(org);
                }
            }
            return orgArray;
            })
        );
    }
  
    /**
     * Sends a POST request to the API with org
     * @param org Organization object
     * @returns 
     */
    createOrg(org: Organization): Observable<Organization> {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http
        .post<Organization>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.ORGANIZATIONS_PATH}`, org, options)
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

    patchOrg(org: Organization) {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http
        .patch<Organization>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.ORGANIZATIONS_PATH}`, org, options)
        .pipe(
            map(resData => {
                if(resData) {
                    const newOrg: Organization = resData;
                    return newOrg;
                }

                throw new Error('Failed to patch organization')
            })
        )
    }

    deleteOrg(shortname: string) {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http.delete<Organization>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.ORGANIZATIONS_PATH}${shortname}`, options)
        .subscribe({
            error: error => {
                throw new Error('Failed to delete organization', error)
            }
        });
    }
}
