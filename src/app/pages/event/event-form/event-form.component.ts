import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { NoDecimalValidator } from 'src/app/common/validators';
import { Audience, AudienceChip, Category, FullEvent, OrgTableItem } from 'src/app/models/dataInterfaces.model';
import { AudienceService } from 'src/app/services/admin-api/audience.service';
import { CategoryService } from 'src/app/services/admin-api/category.service';
import { OrganizationService } from 'src/app/services/admin-api/organizations.service';
import { convertToRFC3339, isDatetimeUnset } from 'src/app/utils/time';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html'
})

/**
 * The 'EventFormComponent' is the form used to manipulate all events.
 *
 * @example
 * <app-event-form
 *   [fe]="fullEvent">
 * </app-event-form>
 */
export class EventFormComponent implements OnInit{
  @Input() fe!: FullEvent;

  categories: Category[] = [];
  organizations: OrgTableItem[] = [];

  fetchedEvent$!: Observable<FullEvent>;

  eventForm!: FormGroup;

  // Variables used by autocomplete
  autoControlCats = new FormControl<string | Category>('');
  filteredCats!: Observable<Category[]>;
  autoControlOrgs = new FormControl<string | OrgTableItem>('');
  filteredOrgs!: Observable<OrgTableItem[]>;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private orgService: OrganizationService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.initDropdownControls();
    this.fetchCategories();
    this.fetchOrganizations();

    if (this.fe.event) {
      this.updateFormFields();
    }
  }

  /**
   * Simply returns the value of the form
   * @returns The whole form
   */
  getFormValues(): FullEvent {
    return this.eventForm.value;
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

  onImageBannerChange(newVal: {val: string}) {
    this.eventForm.get('image_banner')?.setValue(newVal.val);
  }

  onImageSmallChange(newVal: {val: string}) {
    this.eventForm.get('image_small')?.setValue(newVal.val);
  }

  onAudienceSetChange(newVal: {as: number[]}) {
    this.eventForm.get('audience')?.setValue(newVal.as);
  }

  displayCategoryFn(category: Category): string {
    if(category) {
      return category.name_en || category.name_no
    }
    return ''
  }

  displayOrganizationFn(organization: OrgTableItem): string {
    if(organization) {
      return organization.name
    }
    return ''
  }

  /**
   * Initialize the form, alongside corresponding validators
   */
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
      audience: []
    });

    // Subscribe to value changes for a specific form control
    this.eventForm?.valueChanges.subscribe((value) => {
      console.log('eventName value changed:', value);
    });
  }

  /**
   * Initialized needed logic for the autocompleting dropdown menues.
   */
  private initDropdownControls() {
    this.filteredOrgs = this.autoControlOrgs.valueChanges.pipe(
      startWith(''),
      map(value => {
        const viewValue = typeof value === 'string' ? value : value?.name;
        return viewValue ? this._filterOrganizations(viewValue as string) : this.organizations.slice();
      })
    );

    this.filteredCats = this.autoControlCats.valueChanges.pipe(
      startWith(''),
      map(value => {
        const viewValue = typeof value === 'string' ? value : value?.name_no;
        return viewValue ? this._filterCategories(viewValue as string) : this.categories.slice();
      })
    );

    this.autoControlOrgs.valueChanges.subscribe(value => {
      if (value && typeof value === 'object') {
        this.eventForm.get('organization')?.setValue(value.shortname);
      } else {
        this.eventForm.get('organization')?.setValue(value);
      }
    });

    this.autoControlCats.valueChanges.subscribe(value => {
      if (value && typeof value === 'object') {
        this.eventForm.get('category')?.setValue(value.id);
      } else {
        this.eventForm.get('category')?.setValue(value);
      }
    });
  }

  /**
   * Used to update the formfields with provided values
   */
  private updateFormFields() {
    if (this.fe) {
      console.log(this.fe.event)

      this.eventForm.patchValue({
        name_no: this.fe.event.name_no || '',
        name_en: this.fe.event.name_en || '',
        description_no: this.fe.event.description_no || '',
        description_en: this.fe.event.description_en || '',
        //info_no: this.fe.event.information_no || '',
        //info_en: this.fe.event.information_en || '',
        time_start: !isDatetimeUnset(this.fe.event.time_start) ? this.fe.event.time_start : '',
        time_end: !isDatetimeUnset(this.fe.event.time_end) ? this.fe.event.time_end : '',
        time_publish: !isDatetimeUnset(this.fe.event.time_publish) ? this.fe.event.time_publish : '',
        time_signup_release: !isDatetimeUnset(this.fe.event.time_signup_release) ? this.fe.event.time_signup_release : '',
        time_signup_deadline: !isDatetimeUnset(this.fe.event.time_signup_deadline) ? this.fe.event.time_signup_deadline : '',
        link_signup: this.fe.event.link_signup || '',
        capacity: this.fe.event.capacity || null,
        full: this.fe.event.full || false,
        image_small: this.fe.event.image_small || '',
        image_banner: this.fe.event.image_banner || '',
        link_facebook: this.fe.event.link_facebook || '',
        link_discord: this.fe.event.link_discord || '',
        digital: this.fe.event.digital || false,
        canceled: this.fe.event.canceled || false,
        link_stream: this.fe.event.link_stream || '',
        category: this.fe.event.category || '',
        //organization: this.fe.event.organizations || '',
      });

      //this.autoControlCats.setValue(this.fe.event.category);
      //this.autoControlOrgs.setValue(this.fe.event.organizations[0]);
    } else {
      // Reset the form fields when the event is undefined
      this.initForm();
    }
  }

  private fetchCategories() {
    this.categoryService.fetchCategories().subscribe((c: Category[]) => {
      this.categories = c;
    });
  }

  private fetchOrganizations() {
    this.orgService.fetchOrganizations().subscribe((o: OrgTableItem[]) => {
      this.organizations = o;
    });
  }

  // Function for filtering category dropdown
  private _filterCategories(value: string): Category[] {
    const filterValue = value.toLowerCase();
    return this.categories.filter(category =>
      category.name_en.toLowerCase().includes(filterValue) ||
      category.name_no.toLowerCase().includes(filterValue)
    );
  }

  // Function for filtering organization dropdown
  private _filterOrganizations(value: string): OrgTableItem[] {
    const filterValue = value.toLowerCase();
    return this.organizations.filter(organization =>
      organization.name.toLowerCase().includes(filterValue)
    );
  }
}
