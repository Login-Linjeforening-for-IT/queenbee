import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectCannedACL, PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { Observable, catchError, from, map, of } from 'rxjs';
import {DropDownFileItem} from "../../models/dataInterfaces.model";
import { BeehiveAPI } from 'src/app/config/constants';

@Injectable({
  providedIn: 'root'
})
export class DoSpacesService {
  s3Client: any;

  constructor(private http: HttpClient) {}

  fetchImageList(path: string): Observable<DropDownFileItem[]> {
    return this.http
      .get<DropDownFileItem[]>(`${BeehiveAPI.BASE_URL}${BeehiveAPI.IMAGES_PATH}${path}`)

    /*const params = {
      Bucket: 'beehive',
      Prefix: path
    };

    const listObjectsPromise = this.s3Client.send(new ListObjectsCommand(params));

    return from(listObjectsPromise).pipe(
      map((response: any) => {
        const images = response.Contents.map((object: any) => {
          return {name: this.removePrefix(object.Key, path), size: byteConverter(object.Size, 2), filepath: object.Key};
        });

        if(images.length > 0) {
          images[0].name = "Default";
          images[0].size = "0";
          images[0].filepath = "";
        }

        return images;
      })
    );*/
  }

  uploadImage(file: File, key: string): Observable<boolean> {
    const params = {
      Bucket: 'beehive',
      Key: key,
      Body: file,
      ACL: 'public-read' as ObjectCannedACL
    };

    const uploadObjectPromise = this.s3Client.send(new PutObjectCommand(params));

    return from(uploadObjectPromise).pipe(
      map(() => true), // Return true if the upload is successful
      catchError(() => of(false)) // Return false if there is an error
    );
  }

  /**
   * Used to remove a prefix from an url. F.ex xx/xx/file.txt -> file.txt.
   * @param url a url or path
   * @param prefix Prefix to remove
   * @private
   */
  private removePrefix(url: string, prefix: string) {
    return url.replace(new RegExp(`^${prefix}`), "")
  }
}
