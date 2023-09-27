import { Injectable } from '@angular/core';
import { ListObjectsOutput, S3 } from "@aws-sdk/client-s3";
import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { Observable, from, map } from 'rxjs';
import { CREDENTIALS } from 'src/app/config/env';

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

  listObjectsInBucket(): Observable<string[]> {
    const params = {
      Bucket: 'beehive',
      Prefix: 'img/events/'
    };

    const listObjectsPromise = this.s3Client.send(new ListObjectsCommand(params));

    return from(listObjectsPromise).pipe(
      map((response: any) => {
        return response.Contents.map((object: any) => object.Key);
      })
    );
  }
}
