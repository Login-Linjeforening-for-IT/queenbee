import { Component } from '@angular/core';
import { DoSpacesService } from 'src/app/services/do/do-spaces.service';

@Component({
  selector: 'app-single-file-upload',
  templateUrl: './single-file-upload.component.html',
  styleUrls: ['./single-file-upload.component.css']
})
export class SingleFileUploadComponent {
  status: "initial" | "uploading" | "success" | "fail" = "initial"; // Variable to store file status
  file: File | null = null; // Variable to store file

  constructor(private s3Service: DoSpacesService) {}

  ngOnInit(): void {}

  // On file Select
  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.status = "initial";
      this.file = file;
    }
  }

  onUpload() {
    if (this.file) {
      const key = 'img/events/' + this.file.name;

      this.s3Service.uploadImage(this.file, key).subscribe(
        (success) => {
          if (success) {
            // Handle successful upload
            console.log('Image upload successful');
          } else {
            // Handle upload failure
            console.error('Image upload failed');
          }
        },
        (error) => {
          // Handle any errors that occur during the upload process
          console.error('Error occurred during image upload:', error);
        }
      );
    }
  }
}
