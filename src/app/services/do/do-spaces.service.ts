import { Injectable } from '@angular/core';
import { ObjectCannedACL, PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { Observable, catchError, from, map, of } from 'rxjs';
import { CREDENTIALS } from 'src/app/config/env';
import {DropDownFileItem} from "../../models/dataInterfaces.model";
import {byteConverter} from "../../utils/core";

@Injectable({
  providedIn: 'root'
})
export class DoSpacesService {
  s3Client: any;

  constructor() {
    if (CREDENTIALS.accessKeyId && CREDENTIALS.secretAccessKey) {
      this.s3Client = new S3({
        forcePathStyle: false,
        endpoint: "https://ams3.digitaloceanspaces.com/",
        region: 'ams3',
        credentials: {
          accessKeyId: CREDENTIALS.accessKeyId,
          secretAccessKey: CREDENTIALS.secretAccessKey
        },
      });

      // You can now use the s3Client for S3 operations
    } else {
      console.error("SPACES_KEY and SPACES_SECRET environment variables are not defined.");
    }
  }

  fetchImageList(): Observable<DropDownFileItem[]> {
    const params = {
      Bucket: 'beehive',
      Prefix: 'img/events/'
    };

    const listObjectsPromise = this.s3Client.send(new ListObjectsCommand(params));

    return from(listObjectsPromise).pipe(
      map((response: any) => {
        const images = response.Contents.map((object: any) => {
          return {name: this.removePrefix(object.Key, "img/events/"), size: byteConverter(object.Size, 2), filepath: object.Key};
        });

        if(images.length > 0) {
          images[0].name = "Default";
          images[0].size = "0";
          images[0].filepath = "";
        }

        return images;
      })
    );
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
