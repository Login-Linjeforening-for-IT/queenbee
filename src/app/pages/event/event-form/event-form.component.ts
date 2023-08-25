import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { NoDecimalValidator } from 'src/app/common/validators';
import { DropDownMenu, EventDetail } from 'src/app/models/dataInterfaces.model';
import { CategoryService } from 'src/app/services/api/category.service';
import { OrganizationService } from 'src/app/services/api/organizations.service';
import { convertToRFC3339 } from 'src/app/utils/time';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html'
})
export class EventFormComponent implements OnInit{
  @Input() event!: EventDetail;
  @Output() formValues = new EventEmitter<{fv: EventDetail}>();

  categories: DropDownMenu[] = [];
  organizations: DropDownMenu[] = [];
  
  fetchedEvent$!: Observable<EventDetail>;

  eventForm!: FormGroup;

  autoControlCats = new FormControl<string | DropDownMenu>('');
  filteredCats!: Observable<DropDownMenu[]>;
  autoControlOrgs = new FormControl<string | DropDownMenu>('');
  filteredOrgs!: Observable<DropDownMenu[]>;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private orgService: OrganizationService
  ) {}
  
  ngOnInit() {
    this.filteredOrgs = this.autoControlOrgs.valueChanges.pipe(
      startWith(''),
      map(value => {
        const viewValue = typeof value === 'string' ? value : value?.viewValue;
        return viewValue ? this._filter(viewValue as string) : this.organizations.slice();
      })
    );

    this.filteredCats = this.autoControlCats.valueChanges.pipe(
      startWith(''),
      map(value => {
        const viewValue = typeof value === 'string' ? value : value?.viewValue;
        return viewValue ? this._filter(viewValue as string) : this.categories.slice();
      })
    );  

    this.initForm();
    this.fetchCategories();
    this.fetchOrganizations();

    if (this.event) {
      this.updateFormFields();
    }
  }

  onEmit() {
    this.formValues.emit({fv: this.eventForm.value});
  }

  // The following functions is used to update various variables
  onTimeStartChange(newVal: {dt: string}) {
    this.eventForm.get('time_start')?.setValue(convertToRFC3339(newVal.dt));
  }

  onTimeEndChange(newVal: {dt: string}) {
      this.eventForm.get('time_end')?.setValue(convertToRFC3339(newVal.dt));
  }

  onTimePublishChange(newVal: {dt: string}) {
    this.eventForm.get('time_publish')?.setValue(convertToRFC3339(newVal.dt));
}

  onSignupReleaseChange(newVal: { dt: string }) {
      this.eventForm.get('time_signup_release')?.setValue(convertToRFC3339(newVal.dt));
  }

  onSignupDeadlineChange(newVal: { dt: string }) {
      this.eventForm.get('time_signup_deadline')?.setValue(convertToRFC3339(newVal.dt));
  }

  onDescriptionNoChange(newVal: { ht: string }) {
      this.eventForm.get('description_no')?.setValue(newVal.ht);
  }

  onDescriptionEnChange(newVal: { ht: string }) {
      this.eventForm.get('description_en')?.setValue(newVal.ht);
  }

  displayFn(subject: DropDownMenu): string {
    return subject && subject.viewValue ? subject.viewValue : '';
  }

  private initForm() {
    this.eventForm = this.fb.group({
      name_no: ['', Validators.required],
      name_en: '',
      description_no: '',
      description_en: '',
      info_no: '',
      info_en: '',
      time_start: '',
      time_end: '',
      time_publish: '',
      time_signup_release: '',
      time_signup_deadline: '',
      link_signup: '',
      capacity: [null, [Validators.min(0), NoDecimalValidator()]],
      full: false,
      image_small: '',
      image_banner: '',
      link_facebook: '',
      link_discord: '',
      digital: false,
      canceled: false,
      link_stream: '',
      category: ['', Validators.required],
      organization: ['', Validators.required],
      test: ''
    });
  }

  private updateFormFields() {
    if (this.event) {
      this.eventForm.patchValue({
        name_no: this.event.name_no || '',
        name_en: this.event.name_en || '',
        description_no: this.event.description_no || '',
        description_en: this.event.description_en || '',
        info_no: this.event.information_no || '',
        info_en: this.event.information_en || '',
        time_start: this.event.time_start || '',
        time_end: this.event.time_end || '',
        time_publish: this.event.time_publish || '',
        time_signup_release: this.event.time_signup_release || '',
        time_signup_deadline: this.event.time_signup_deadline || '',
        link_signup: this.event.link_signup || '',
        capacity: this.event.capacity || null,
        full: this.event.full || false,
        image_small: this.event.image_small || '',
        image_banner: this.event.image_banner || '',
        link_facebook: this.event.link_facebook || '',
        link_discord: this.event.link_discord || '',
        digital: this.event.digital || false,
        canceled: this.event.canceled || false,
        link_stream: this.event.link_stream || '',
        category: this.event.category || '',
        organization: this.event.organizations || '',
        test: ''
      });
    } else {
      // Reset the form fields when the event is undefined
      this.initForm();
    }
  }

  private fetchCategories() {
    this.categoryService.getDropDownMenuCategories().subscribe((c: DropDownMenu[]) => {
      this.categories = c;
    });
  }

  private fetchOrganizations() {
    this.orgService.getDropDownMenuOrganizations().subscribe((o: DropDownMenu[]) => {
      this.organizations = o;
    });
  }

  // Function for filtering dropdown menu
  private _filter(value: string): DropDownMenu[] {
    const filterValue = value.toLowerCase();

    return this.organizations.filter(option => option.viewValue.toLowerCase().includes(filterValue));
  }
}
