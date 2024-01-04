import {Component, ViewChild} from '@angular/core';
import {ImageCropperComponent} from "../../image-cropper/component/image-cropper.component";
import {MatDialogRef} from "@angular/material/dialog";
import {ImageCroppedEvent} from "../../image-cropper/interfaces";
import {CropComponent} from "../crop/crop.component";

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.css']
})
export class ImageManagerComponent {
  originalFile: any = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  cropped = false;

  @ViewChild(ImageCropperComponent) imageCropper!: ImageCropperComponent;

  constructor(private dialogRef: MatDialogRef<CropComponent>){}

  fileChangeEvent(event: any): void {
    // Store the original file when a new file is selected
    this.originalFile = event?.target?.files[0] || null;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
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
}
