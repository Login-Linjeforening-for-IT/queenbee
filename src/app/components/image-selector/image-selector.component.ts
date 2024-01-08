import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DoSpacesService } from 'src/app/services/do/do-spaces.service';
import {FormBuilder, FormControl} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {DropDownFileItem} from "../../models/dataInterfaces.model";
import { CropComponent } from '../dialog/crop/crop.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html'
})

/**
 * The 'ImageSelectorComponent' is for selecting images stored in S3 buckets.
 *
 * @example
 * <app-image-selector
 *         [title]="'Image Banner'"
 *         [value]="SELECTED_OBJECT"
 *         (valEmitter)="onImageBannerChange($event)">
 * </app-image-selector>
 */
export class ImageSelectorComponent {
  @Input() title: string = '';
  @Input() value!: string;
  @Output() valEmitter = new EventEmitter<{val: string}>();

  selectedImg = new FormControl('');
  s3Client: any;
  images: DropDownFileItem[] = [];
  filteredOptions!: Observable<DropDownFileItem[]>;

  constructor(private doService: DoSpacesService, private dialog: MatDialog) {}

  ngOnInit() {
    this.filteredOptions = this.selectedImg.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.doService.fetchImageList().subscribe(
      (array: DropDownFileItem[]) => {
        this.images = array;
      },
      (error: any) => {
        console.error('Error occurred:', error);
      }
    );

    this.selectedImg?.valueChanges.subscribe((value) => {
      if(value) {
        this.valEmitter.emit({val: value})
      }
    })
  }

  private _filter(value: string): DropDownFileItem[] {
    const filterValue = value.toLowerCase();

    return this.images.filter(image => image.name.toLowerCase().includes(filterValue));
  }
}
