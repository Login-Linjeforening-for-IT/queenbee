import { Component } from '@angular/core';
import { EventService } from 'src/app/services/admin-api/event.service';
import { DoSpacesService } from 'src/app/services/do/do-spaces.service';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent {
  s3Client: any;

  constructor(private doService: DoSpacesService, private eventService: EventService) {}

  ngOnInit() {
    this.doService.listObjectsInBucket().subscribe(
      (array: string[]) => {
        console.log(array);
      },
      (error: any) => {
        console.error('Error occurred:', error);
      }
    );
  }
}