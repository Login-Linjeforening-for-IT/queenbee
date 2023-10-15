import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BeehiveAPI } from 'src/app/config/constants';
import { Location, LocationTableItem } from 'src/app/models/dataInterfaces.model';
import { convertFromRFC3339 } from 'src/app/utils/time';

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
    return this.http
      .get<Location>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.LOCATIONS_PATH}${locID}`)
      .pipe(
        map(loc => {
          if (loc) {
            return loc;
          } else {
            throw new Error('Location not found');
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
    return this.http
      .patch<Location>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.LOCATIONS_PATH}`, loc)
      .pipe(
        map(resData => {
          if(resData) {
            const newLoc: Location = resData;
            return newLoc;
          }
          throw new Error('Failed to patch location')
        })
      )
  }

  /**
   * Returns all organizations
   * @returns Organization array
   */
  fetchLocations(type: string): Observable<LocationTableItem[]> {
    return this.http
      .get<{ [id: string]: any }>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.LOCATIONS_PATH}?type=${type}`)
      .pipe(
        map(resData => {
          const locArray: LocationTableItem[] = [];
          for (const shortname in resData) {
            const locDefault: Location = resData[shortname]
            
            const loc: LocationTableItem = {
              id: locDefault.id,
              name: locDefault.name_en || locDefault.name_no, // Set name to name_en if it exists, else set to name_no
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
   * The 'createLocation' functions creates a new location.
   * @param loc Location
   */
  createLocation(loc: Location): Observable<Location> {
    return this.http
      .post<Location>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.LOCATIONS_PATH}`, loc)
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
    this.http.delete<Location>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.LOCATIONS_PATH}${id}`)
    .subscribe({
      error: error => {
        throw new Error('Failed to delete location', error)
      }
    });
  }
}
