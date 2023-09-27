import { Component } from '@angular/core';
import { DoSpacesService } from 'src/app/services/do/do-spaces.service';
import {FormBuilder, FormControl} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {DropDownFileItem} from "../../models/dataInterfaces.model";

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent {
  myControl = new FormControl('');
  s3Client: any;
  locations: DropDownFileItem[] = [];
  filteredOptions!: Observable<DropDownFileItem[]>;

  constructor(private doService: DoSpacesService, private fb: FormBuilder) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.doService.fetchImageList().subscribe(
      (array: DropDownFileItem[]) => {
        console.log(array);
        this.locations = array;
      },
      (error: any) => {
        console.error('Error occurred:', error);
      }
    );
  }

  private _filter(value: string): DropDownFileItem[] {
    const filterValue = value.toLowerCase();

    return this.locations.filter(location => location.name.toLowerCase().includes(filterValue));
  }
}
