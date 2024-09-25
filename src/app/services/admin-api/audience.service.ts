/**
 * Service for handeling requests to the audience endpoint of Beehive API
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BeehiveAPI } from '@env';
import { Audience, AudienceChip } from 'src/app/models/dataInterfaces.model';
import Auth from '../auth/auth';

@Injectable({
    providedIn: 'root'
})
export class AudienceService {

    constructor(private http: HttpClient) { }

    /**
     * Returns all audiences
     * @returns Audience array
     */
    fetchAudiences(): Observable<AudienceChip[]> {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http
        .get<{ [id: number]: Audience }>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.AUDIENCES_PATH}`, options)
        .pipe(
            map(resData => {
                const audienceArray: AudienceChip[] = [];

                for (const id in resData) {
                    if (resData.hasOwnProperty(id)) {
                        const aud: AudienceChip = {id: resData[id].id, name: resData[id].name_en};
                        audienceArray.push(aud);
                    }
                }

                return audienceArray;
            })
        )
    }

    /**
     * Returns all audiences
     * @returns Audience array
     */
    fetchAudiencesWithId(ids: number[]): Observable<AudienceChip[]> {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }
        
        return this.http
        .get<{ [id: number]: Audience }>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.AUDIENCES_PATH}`, options)
        .pipe(
            map(resData => {
                const audienceArray: AudienceChip[] = [];
                for (const id in resData) {
                    if (resData.hasOwnProperty(id) && ids.includes(Number(id))) {
                        const aud: AudienceChip = {id: resData[id].id, name: resData[id].name_en};
                        audienceArray.push(aud);
                    }
                }

                return audienceArray
            })
        )
    }
}
