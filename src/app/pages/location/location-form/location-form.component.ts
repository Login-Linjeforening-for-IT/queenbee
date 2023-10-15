import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
/**
 * The 'LocationFormComponent' is the form used to manipulate all locations.
 *
 * @example
 * <app-location-form
 *   [location]="locObject">
 * </app-location-form>
 */
export class LocationFormComponent {
  locationForm!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  onTypeChange() {
    this.clearTypes();
  }

  getFormValues() {
    return this.locationForm.value;
  }

  private initForm() {
    this.locationForm = this.fb.group({
      name_no: ['', Validators.required],
      name_en: '',
      type: 'none',
      mazemap_campus_id: 0,
      mazemap_poi_id: 0,
      address_street: '',
      address_postcode: 0,
      city_name: '',
      coordinate_lat: 0,
      coordinate_long: 0,
      url: ''
    });

    this.locationForm.valueChanges.subscribe(x => {
      console.log(x)
    })
  }

  private clearTypes() {
    this.locationForm.patchValue({
      mazemap_campus_id: 0,
      mazemap_poi_id: 0,
      address_street: '',
      address_postcode: 0,
      city_name: '',
      coordinate_lat: 0,
      coordinate_long: 0,
      url: ''
    });
  }

  onNewCoords(newVal: { lat: string; long: string }) {
    this.locationForm.get('coordinate_lat')?.setValue(newVal.lat);
    this.locationForm.get('coordinate_long')?.setValue(newVal.long);
  }
}
