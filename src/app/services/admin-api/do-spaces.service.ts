import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { DropDownFileItem } from "../../models/dataInterfaces.model";
import { BeehiveAPI } from '@env';
import Auth from '../auth/auth';

@Injectable({
    providedIn: 'root'
})
export class DoSpacesService {
    s3Client: any;

    constructor(private http: HttpClient) {}

    fetchImageList(path: string): Observable<DropDownFileItem[]> {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        return this.http.get<DropDownFileItem[]>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.IMAGES_PATH}${path}`, options)
    }

    uploadImage(file: File, path: string): Observable<boolean> {
        const auth = Auth()
        const options = { headers: new HttpHeaders(auth) }

        const formData = new FormData()
        formData.append('file', file)

        return this.http
            .post(`${BeehiveAPI.BASE_URL}${BeehiveAPI.IMAGES_PATH}${path}`, formData, options)
            .pipe(
                map((response: any) => {
                    // Perform additional checks if needed
                    // For example, check the response from the server or make additional API calls
                    // Adjust this based on your server's response structure
                    return response.success;
                }),
                // Return false if there is an error
                catchError(() => of(false))
            );
    }
}
