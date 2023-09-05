import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../services/api/category.service";
import {OrganizationService} from "../../../services/api/organizations.service";
import {NoDecimalValidator} from "../../../common/validators";

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent {
  locationForm!: FormGroup;

  currentType: string = 'Default';
  defaultType: string = 'Default';
  types: string[] = ['Default', 'Mazemap', 'Address', 'Coordinate'];

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.locationForm = this.fb.group({
      name_no: ['', Validators.required],
      name_en: '',
      type: '',
      mazemap_campus_id: '',
      mazemap_poi_id: '',
      address_street: '',
      address_postcode: '',
      city_name: '',
      coordinate_lat: '',
      coordinate_long: '',
      url: ''
    });
  }

  onSeasonChange() {
    this.currentType = this.defaultType;
  }
}
