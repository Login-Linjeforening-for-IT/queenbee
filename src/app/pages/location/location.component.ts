import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import { LocationConstants } from '../pages.constants';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {
  locationTypes = LocationConstants.LOC_TYPES

  locationForm!: FormGroup;
  pathElements!: string[];
  title!: string;
  submit!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.url.subscribe(segments => {
      this.pathElements = segments.map(segment => segment.path);
      console.log('Path elements:', this.pathElements);
    });

    switch (this.pathElements[1]) {
      case 'new':
        this.title = LocationConstants.TITLE_NEW;
        this.submit = LocationConstants.SUBMIT_NEW;
        break;
      case 'edit':
        this.title = LocationConstants.TITLE_EDIT;
        this.submit = LocationConstants.SUBMIT_EDIT;
        break;
      default:
        this.title = 'title not set!';
        this.submit = 'submit not set!'
    }

    this.locationForm = this.fb.group({
      name_no: '',
      name_en: '',
      type: '',
      mazemap_campus_id: '',
      mazemap_poi_id: '',
      address_street: '',
      address_postcode: '',
      address_city: '',
      coordinate_lat: '',
      coordinate_long: '',
    })
  }
}
