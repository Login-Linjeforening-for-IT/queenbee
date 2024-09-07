import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { DropDownFileItem } from "../../models/dataInterfaces.model";
import { BeehiveAPI } from '@env';

@Injectable({
  providedIn: 'root'
})
export class DoSpacesService {
  s3Client: any;

  constructor(private http: HttpClient) {}

  fetchImageList(path: string): Observable<DropDownFileItem[]> {
    return this.http.get<DropDownFileItem[]>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.IMAGES_PATH}${path}`)
  }

  uploadImage(file: File, path: string): Observable<boolean> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${BeehiveAPI.BASE_URL}${BeehiveAPI.IMAGES_PATH}${path}`, formData).pipe(
      map((response: any) => {
        // Perform additional checks if needed
        // For example, check the response from the server or make additional API calls
        return response.success; // Adjust this based on your server's response structure
      }),
      catchError(() => of(false)) // Return false if there is an error
    );
  }
}
