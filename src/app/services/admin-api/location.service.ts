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
}
