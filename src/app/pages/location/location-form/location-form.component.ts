import { Component, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Location } from 'src/app/models/dataInterfaces.model';

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
  @Input() loc!: Location;
  @Input() disableRadioBtn!: boolean;
  locationForm!: FormGroup;
  edit_type!: string;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();

    // If a location is inputed into this component: populate input fields with data
    if(this.loc) {
      this.updateFormFields();
    }
  }

  onTypeChange() {
    this.clearTypes();
  }

  getFormValues() {
    return this.locationForm.value;
  }

  onNewCoords(newVal: { lat: string; long: string }) {
    this.locationForm.get('coordinate_lat')?.setValue(newVal.lat);
    this.locationForm.get('coordinate_long')?.setValue(newVal.long);
  }

  private initForm() {
    if(this.disableRadioBtn) {
      this.locationForm = this.fb.group({
        id: -1,
        name_no: ['', Validators.required],
        name_en: '',
        type: {value: 'none', disabled: true},
        mazemap_campus_id: 0,
        mazemap_poi_id: 0,
        address_street: '',
        address_postcode: 0,
        city_name: '',
        coordinate_lat: 0,
        coordinate_long: 0,
        url: ''
      });
    } else {
      this.locationForm = this.fb.group({
        id: -1,
        name_no: ['', Validators.required],
        name_en: '',
        type: {value: 'none', disabled: false},
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

  private updateFormFields() {
    if(this.loc) {
      this.locationForm.patchValue({
        id: this.loc.id,
        name_no: this.loc.name_no || '',
        name_en: this.loc.name_en || '',
        type: this.loc.type || 'none',
        mazemap_campus_id: this.loc.mazemap_poi_id || 0,
        mazemap_poi_id: this.loc.mazemap_poi_id || 0,
        address_street: this.loc.address_street ||  '',
        address_postcode: this.loc.address_postcode || 0,
        city_name: this.loc.city_name || '',
        coordinate_lat: this.loc.coordinate_lat || 0,
        coordinate_long: this.loc.coordinate_long || 0,
        url: this.loc.url || ''
      })
    }
  }
}
