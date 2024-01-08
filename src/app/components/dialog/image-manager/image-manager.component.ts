import {Component, Inject, Input, ViewChild} from '@angular/core';
import {ImageCropperComponent} from "../../image-cropper/component/image-cropper.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ImageCroppedEvent} from "../../image-cropper/interfaces";
import {CropComponent} from "../crop/crop.component";
import {FormBuilder} from "@angular/forms";
import { DoSpacesService } from 'src/app/services/do/do-spaces.service';

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.css']
})
export class ImageManagerComponent {
  title!: string;
  path!: string;

  originalFile: any = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  cropped = false;

  filename!: string;
  filetype!: string;
  imageToUpload: File | null = null; // New variable for the image to upload

  @ViewChild(ImageCropperComponent) imageCropper!: ImageCropperComponent;

  uploadForm = this._formBuilder.group({
    bannerImg: true,
    smallImg: true,
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CropComponent>, 
    private _formBuilder: FormBuilder,
    private s3Service: DoSpacesService){
      if(data) {
        this.title = data.title;
        this.path = data.path;
      }
    }

  fileChangeEvent(event: any): void {
    // Store the original file when a new file is selected
    this.originalFile = event?.target?.files[0] || null;
    
    if(this.originalFile) {
      this.imageChangedEvent = event;

      this.filename = this.originalFile.name;
      this.filetype = this.originalFile.type;
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;

    // Create a new File object from the cropped image base64 data
    if(event.base64) {
      const blob = this.base64toBlob(event.base64);
      this.imageToUpload = new File([blob], this.filename, { type: this.filetype });
    } else {
      console.error('Base64 data is missing or invalid.');
    }
    
    console.log(event);
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded')
  }

  cropperReady() {
    console.log('Cropper ready')
  }

  loadImageFailed () {
    console.log('Load failed');
  }

  rotateLeft() {
    this.imageCropper.rotateLeft();
  }

  rotateRight() {
    this.imageCropper.rotateRight();
  }

  flipHorizontal() {
    this.imageCropper.flipHorizontal();
  }

  flipVertical() {
    this.imageCropper.flipVertical();
  }

  onUpload() {
    if (this.imageToUpload) {
      const key = 'img/events/' + this.imageToUpload.name;

      // Assuming you have an s3Service.uploadImage function
      this.s3Service.uploadImage(this.imageToUpload, key).subscribe(
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

    this.onClose();
  }

  base64toBlob(base64Data: string) {
    const byteString = atob(base64Data.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: 'image/png' });
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

  cropperConfirm(): void {
    this.cropped = true;
  }

  reset() {
    this.cropped = false;

    setTimeout(() => {
      // Clear existing cropped image
      this.croppedImage = '';

      // Reset the ImageCropperComponent
      this.imageChangedEvent = null;
      this.imageCropper.imageBase64 = ''; // Reset imageBase64 property in ImageCropperComponent
      this.imageCropper.imageFileChanged = this.originalFile; // Reset imageFileChanged property in ImageCropperComponent
      this.showCropper = false; // Hide the cropper again
    }, 1);
  }

  isInvalid() {
    return !this.cropped || !(this.uploadForm.get('bannerImg')?.value || this.uploadForm.get('smallImg')?.value);
  }
}
