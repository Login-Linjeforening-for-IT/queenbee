/**
 * Service for handeling requests to the events endpoint of Beehive API
 */
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {Observable, map, mergeMap, forkJoin} from 'rxjs'
import { BeehiveAPI } from '@env';
import { 
    EventTableItem, 
    EventShort, 
    FullEvent, 
    EventData 
} from 'src/app/models/dataInterfaces.model'
import { convertFromRFC3339 } from 'src/app/utils/time'
import Auth from '../auth/auth';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    constructor(private http: HttpClient) {}

    /**
     * Gets a single event from the epi.
     * @param eventId id of event
     * @returns EventDetail observable
     */
    fetchEvent(eventId: number): Observable<FullEvent> {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http
        .get<FullEvent>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.EVENTS_PATH}${eventId}`, options)
        .pipe(
            map(resData => {
                if (resData) {
                    console.log("ResData: ", resData)
                    console.log("Audience from service (resData): ", resData.audiences)
                    const event: FullEvent = resData;
                    console.log("Audience from service: ", event.audiences)
                    return event;
                }
                throw new Error('No event found with id ' + eventId);
            })
        );
    }

    fetchEvents(): Observable<EventTableItem[]> {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http
        .get<{ [id: string]: EventShort }>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.EVENTS_PATH}?limit=1000`, options)
        .pipe(
            map(resData => {
                const eventsArray: EventTableItem[] = [];
                for (const id in resData) {
                    const eventShort: EventShort = resData[id];

                    if (eventShort && !eventShort.is_deleted) {
                        const event: EventTableItem = {
                            id: eventShort.id,
                            visible: eventShort.visible,
                            name: eventShort.name_en || eventShort.name_no,
                            // Set name to name_en if it exists, else set to name_no
                            time_type: eventShort.time_type,
                            time_start: convertFromRFC3339(eventShort.time_start),
                            time_end: convertFromRFC3339(eventShort.time_end),
                            time_publish: convertFromRFC3339(eventShort.time_publish),
                            canceled: eventShort.canceled,
                            link_signup: eventShort.link_signup,
                            capacity: eventShort.capacity,
                            full: eventShort.full,
                            // Set category_name to name_en if it exists, else set to name_no
                            category_name: eventShort.category_name_en || eventShort.category_name_no,
                            // Set location_name to name_en if it exists, else set to name_no
                            location_name: eventShort.location_name_en || eventShort.location_name_no,
                            updated_at: convertFromRFC3339(eventShort.updated_at),
                            // Assuming this is a constant value
                            is_deleted: false,
                            audiences: eventShort.audiences,
                            organizers: eventShort.organizers,
                        };

                        eventsArray.push(event);
                    }
                }
                return eventsArray;
            })
        );
    }


    /**
     * Sends a POST request to the API with event
     * @param event EventDetail object
     * @returns observable
     */
    createEvent(event: EventData) {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        console.log("Creating: ", event)
        console.log("Audience: ", event.audience)

        return this.http
        .post<EventData>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.EVENTS_PATH}`, event, options)
        .pipe(
            mergeMap(resData => {
            if (resData) {
                const newEvent: EventData = resData;

                const audienceRequests: Observable<any>[] = event.audience.map(audience => {
                return this.createAudience(newEvent.id, audience)
                })

                return forkJoin([...audienceRequests]).pipe(map(() => newEvent));
            }
            throw new Error('Failed to create event');
            })
        );
    }

    /**
     * Sends a PATCH request to the API with event
     * @param event EventDetail object
     * @returns observable
     */
    patchEvent(event: EventData) {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http
            .patch<EventData>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.EVENTS_PATH}`, event, options)
            .pipe(
                map(resData => {
                    if (resData) {
                        const newEvent: EventData = resData;
                        return newEvent;
                    }

                    throw new Error('Failed to patch event');
                })
            );
    }

    /**
     * The 'deleteEvent' function deletes the event given by the id.
     * @param id number
     */
    deleteEvent(id: number) {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http.delete<FullEvent>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.EVENTS_PATH}${id}`, options)
        .subscribe({
            error: error => {
                throw new Error('Failed to delete event', error)
            }
        });
    }

    private createOrganization(eventId: number, orgId: string) {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        const endpointURL = `${BeehiveAPI.BASE_URL}${BeehiveAPI.EVENTS_PATH}${BeehiveAPI.SKILLS_PATH}`;
        const reqBody = {event: eventId, organization: orgId};

        return this.http.post(endpointURL, reqBody, options);
    }

    private createAudience(eventId: number, audienceId: number) {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        const endpointURL = `${BeehiveAPI.BASE_URL}${BeehiveAPI.EVENTS_PATH}${BeehiveAPI.AUDIENCES_PATH_2}`;
        const reqBody = {event: eventId, audience: audienceId};

        return this.http.post(endpointURL, reqBody, options);
    }
}
