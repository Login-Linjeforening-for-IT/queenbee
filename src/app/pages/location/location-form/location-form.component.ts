import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent {
  locationForm!: FormGroup;

  types: string[] = ['Default', 'Mazemap', 'Address', 'Coordinate'];

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  onTypeChange() {
    this.clearTypes();
  }

  private initForm() {
    this.locationForm = this.fb.group({
      name_no: ['', Validators.required],
      name_en: '',
      type: 'Coordinate',
      mazemap_campus_id: '',
      mazemap_poi_id: '',
      address_street: '',
      address_postcode: '',
      city_name: '',
      coordinate_lat: '',
      coordinate_long: '',
      url: ''
    });

    this.locationForm.valueChanges.subscribe(x => {
      console.log(x)
    })
  }

  private clearTypes() {
    this.locationForm.patchValue({
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

  onNewCoords(newVal: { lat: string; long: string }) {
    this.locationForm.get('coordinate_lat')?.setValue(newVal.lat);
    this.locationForm.get('coordinate_long')?.setValue(newVal.long);
  }
}
