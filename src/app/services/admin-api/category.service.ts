/**
 * Service for handeling requests to the category endpoint of Beehive API
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BeehiveAPI } from '@env';
import { Category } from 'src/app/models/dataInterfaces.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) { }

    /**
     * Returns all categories
     * @returns Category array
     */
    fetchCategories(): Observable<Category[]> {
        return this.http
        .get<{ [id: string]: Category }>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.CATEGORIES_PATH}?limit=1000`)
        .pipe(
            map(resData => {
                const eventsArray: Category[] = [];
                for (const id in resData) {
                    if (resData.hasOwnProperty(id)) {
                    const event: Category = resData[id];
                    eventsArray.push(event);
                    }
                }
                return eventsArray;
            })
        );
    }
}
