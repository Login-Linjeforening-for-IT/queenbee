import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BeehiveAPI } from '@env';
import { Location, DropDownItem, LocationTableItem } from 'src/app/models/dataInterfaces.model';
import { convertFromRFC3339 } from 'src/app/utils/time';
import Auth from '../auth/auth';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(private http: HttpClient) { }

    /**
     * The 'fetchLocation' function is used to fetch a location by a given ID.
     * @param locID number, ID to fetch
     * @returns Location
     */
    fetchLocation(locID: number): Observable<Location> {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http
        .get<Location>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.LOCATIONS_PATH}${locID}`, options)
        .pipe(
            map(loc => {
                if (loc) {
                    return loc
                } else {
                    throw new Error('Location not found')
                }
            })
        );
    }

    /**
     * The 'patchLoc' function is used to patch a location.
     * @param loc Location to update to
     * @returns Location
     */
    patchLoc(loc: Location) {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http
        .patch<Location>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.LOCATIONS_PATH}`, loc, options)
        .pipe(
            map(resData => {
                if(resData) {
                    const newLoc: Location = resData
                    return newLoc
                }

                throw new Error('Failed to patch location')
            })
        )
    }

    /**
     * Returns all locations
     * @returns Location array
     */
    fetchLocations(type: string): Observable<LocationTableItem[]> {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http
        .get<{ [id: string]: any }>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.LOCATIONS_PATH}?type=${type}&limit=10000`, options)
        .pipe(
            map(resData => {
            const locArray: LocationTableItem[] = [];
            for (const shortname in resData) {
                const locDefault: Location = resData[shortname]
                
                const loc: LocationTableItem = {
                id: locDefault.id,
                name: locDefault.name_en || locDefault.name_no,
                address_street: locDefault.address_street,
                address_postcode: locDefault.address_postcode,
                city_name: locDefault.city_name,
                mazemap_campus_id: locDefault.mazemap_campus_id,
                mazemap_poi_id: locDefault.mazemap_poi_id,
                coordinate_lat: locDefault.coordinate_lat,
                coordinate_long: locDefault.coordinate_long,
                url: locDefault.url,
                updated_at: convertFromRFC3339(locDefault.updated_at),
                };

                locArray.push(loc);
            }
            return locArray;
            })
        );
    }

    /**
     * The function 'fetchDropDown' returns an array of Location objects tailored for dropdown menu.
     * @returns Observable<DropDownItem[]>
     */
    fetchDropDown(): Observable<DropDownItem[]> {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http
        .get<{ [id: number]: any }>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.LOCATIONS_PATH}`, options)
        .pipe(
            map(resData => {
            const locArray: DropDownItem[] = [];
            
            for (const i in resData) {
                const resObj: Location = resData[i]
                
                const loc: DropDownItem = {
                id: resObj.id,
                name: resObj.name_en || resObj.name_no,
                details: '',
                }

                switch (resObj.type) {
                case 'address':
                    loc.details = 'ADDRESS ' + resObj.address_street;
                    break;
                case 'mazemap':
                    loc.details = 'MAZE ' + resObj.mazemap_poi_id.toString();
                    break;
                case 'coords':
                    loc.details = 'COORDS ' + resObj.coordinate_lat.toFixed(4).toString() + ', ' + resObj.coordinate_long.toFixed(4).toString();
                    break;
                
                default:
                    loc.details = 'NONE';
                    break;
                }

                locArray.push(loc);   
            };
            
            return locArray;
            })
        );
    }

    /**
     * The 'createLocation' functions creates a new location.
     * @param loc Location
     */
    createLocation(loc: Location): Observable<Location> {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http
        .post<Location>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.LOCATIONS_PATH}`, loc, options)
        .pipe(
            map(resData => {
                if (resData) {
                    const newLoc: Location = resData;
                    return newLoc;
                }

                throw new Error('Failed to create event');
            })
        );
    }

    /**
     * The 'deleteLoc' function deletes the location by the given id.
     * @param id number
     */
    deleteLoc(id: number) {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http.delete<Location>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.LOCATIONS_PATH}${id}`, options)
        .subscribe({
            error: error => {
                throw new Error('Failed to delete location', error)
            }
        });
    }
}
