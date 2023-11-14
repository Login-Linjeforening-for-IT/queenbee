import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { NoDecimalValidator } from 'src/app/common/validators';
import { AudienceSelectorComponent } from 'src/app/components/chip-selectors/audience-selector/audience-selector.component';
import { TIME, TIME_TYPE } from 'src/app/config/constants';
import { Category, FullEvent, DropDownItem, OrgTableItem, EventData } from 'src/app/models/dataInterfaces.model';
import { AudienceService } from 'src/app/services/admin-api/audience.service';
import { CategoryService } from 'src/app/services/admin-api/category.service';
import { LocationService } from 'src/app/services/admin-api/location.service';
import { OrganizationService } from 'src/app/services/admin-api/organizations.service';
import { RulesService } from 'src/app/services/admin-api/rules.service';
import {convertDateToRFC3339, convertToRFC3339, getTime, isDatetimeUnset} from 'src/app/utils/time';

export interface TimeTypeSelect {
  type: string;
  name: string;
  show: boolean;
}

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

  @ViewChild('audienceSelector') audienceSelector!: AudienceSelectorComponent;

  fetchedEvent$!: Observable<FullEvent>;
  eventForm!: FormGroup;

  categories: Category[] = [];
  organizations: OrgTableItem[] = [];
  locations: DropDownItem[] = [];
  rules: DropDownItem[] = [];

  time_types: TimeTypeSelect[] = [];
  isStartTimeDisabled: boolean = false;
  isEndTimeDisabled: boolean = false;

  // Variables used by autocomplete
  autoControlCats = new FormControl<string | Category>('');
  filteredCats!: Observable<Category[]>;
  autoControlOrgs = new FormControl<string | OrgTableItem>('');
  filteredOrgs!: Observable<OrgTableItem[]>;
  autoControlLocs = new FormControl<string | DropDownItem>('');
  filteredLocs!: Observable<DropDownItem[]>;
  autoControlRules = new FormControl<string | DropDownItem>('');
  filteredRules!: Observable<DropDownItem[]>;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private orgService: OrganizationService,
    private locService: LocationService,
    private ruleService: RulesService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initForm();
    this.initDropdownControls();
    this.initTimeTypeSelect();
    this.fetchCategories();
    this.fetchOrganizations();
    this.fetchLocations();
    this.fetchRules();

    if (this.fe.event) {
      this.updateFormFields();
    }
  }

  /**
   * Simply returns the value of the form
   * @returns The whole form
   */
  getFormValues(): EventData {
    console.log("Sending form values: ", this.eventForm.value)
    return this.eventForm.value;
  }

  // The following functions is used to update various variables
  onTimeStartChange(newVal: {dt: string} | null) {
    newVal && this.eventForm.get('time_start')?.setValue(convertToRFC3339(newVal.dt));
  }

  onTimeEndChange(newVal: {dt: string} | null) {
    newVal && this.eventForm.get('time_end')?.setValue(convertToRFC3339(newVal.dt));
  }

  onTimePublishChange(newVal: {dt: string} | null) {
    newVal && this.eventForm.get('time_publish')?.setValue(convertToRFC3339(newVal.dt));
  }

  onSignupReleaseChange(newVal: { dt: string } | null) {
    newVal && this.eventForm.get('time_signup_release')?.setValue(convertToRFC3339(newVal.dt));
  }

  onSignupDeadlineChange(newVal: { dt: string } | null) {
    newVal && this.eventForm.get('time_signup_deadline')?.setValue(convertToRFC3339(newVal.dt));
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

  displayLocationFn(location: DropDownItem): string {
    if(location) {
      return location.name
    }
    return ''
  }

  displayRuleFn(rule: DropDownItem): string {
    if(rule) {
      return rule.name
    }
    return ''
  }

  /**
   * Initialize the form, alongside corresponding validators
   */
  private initForm() {
    const datetimeNow = convertDateToRFC3339(new Date());

    this.eventForm = this.fb.group({
      /*name_no: ['', Validators.required],
      name_en: '',
      description_no: '',
      description_en: '',
      informational_no: '',
      informational_en: '',
      time_type: [TIME_TYPE.TO_BE_DETERMINED, Validators.required],
      time_start: null,
      time_end: null,
      time_publish: datetimeNow,
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
      category: [0, Validators.required],
      organization: ['', Validators.required],
      location: [0],
      rule: [0],
      audience: []*/
      name_no: ['test123', Validators.required],
      name_en: 'test321',
      description_no: 'Hei på deg!',
      description_en: '',
      informational_no: '',
      informational_en: '',
      time_type: [TIME_TYPE.TO_BE_DETERMINED, Validators.required],
      time_start: '2023-11-11T01:00:00Z',
      time_end: '2023-11-11T15:00:00Z',
      time_publish: datetimeNow,
      time_signup_release: '',
      time_signup_deadline: '',
      link_signup: '',
      capacity: [null, [Validators.min(0), NoDecimalValidator()]],
      full: false,
      image_small: 'Halloween_104.jpg',
      image_banner: '',
      link_facebook: '',
      link_discord: '',
      digital: false,
      canceled: false,
      link_stream: '',
      category: [0, Validators.required],
      organization: ['', Validators.required],
      location: [0],
      rule: [0],
      audience: []
    });

    // Subscribe to value changes for a specific form control
    this.eventForm?.valueChanges.subscribe((value) => {
      console.log('eventName value changed:', value);
    });

    // Subscribe to value changes for time_start form control
    this.eventForm.get('time_type')?.valueChanges.subscribe((value) => {
      this.updateTimeRequirements();
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

    this.filteredLocs = this.autoControlLocs.valueChanges.pipe(
      startWith(''),
      map(value => {
        const viewValue = typeof value === 'string' ? value : value?.name;
        return viewValue ? this._filterLocations(viewValue as string) : this.locations.slice();
      })
    );

    this.filteredRules = this.autoControlRules.valueChanges.pipe(
      startWith(''),
      map(value => {
        const viewValue = typeof value === 'string' ? value : value?.name;
        return viewValue ? this._filterRules(viewValue as string) : this.rules.slice();
      })
    );

    this.autoControlOrgs.valueChanges.subscribe(value => {
      if (value && typeof value === 'object') {
        this.eventForm.get('organization')?.setValue(value.id);
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

    this.autoControlLocs.valueChanges.subscribe(value => {
      if (value && typeof value === 'object') {
        this.eventForm.get('location')?.setValue(value.id);
      } else {
        this.eventForm.get('location')?.setValue(value);
      }
    });

    this.autoControlRules.valueChanges.subscribe(value => {
      if (value && typeof value === 'object') {
        this.eventForm.get('rule')?.setValue(value.id);
      } else {
        this.eventForm.get('rule')?.setValue(value);
      }
    });
  }

  /**
   * Used to update the formfields with provided values
   */
  private updateFormFields() {
    if (this.fe) {
      this.eventForm.patchValue({
        name_no: this.fe.event.name_no || '',
        name_en: this.fe.event.name_en || '',
        description_no: this.fe.event.description_no || '',
        description_en: this.fe.event.description_en || '',
        informational_no: this.fe.event.informational_no || '',
        informational_en: this.fe.event.informational_en || '',
        time_start: !isDatetimeUnset(this.fe.event.time_start) ? this.fe.event.time_start : '',
        time_end: !isDatetimeUnset(this.fe.event.time_end) ? this.fe.event.time_end : '',
        time_type: this.fe.event.time_type || TIME_TYPE.TO_BE_DETERMINED,
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
        category: this.fe.event.category || 0,
        organization: this.fe.organizations[0]?.shortname || '',
        rule: this.fe.rule?.id || 0,
        location: this.fe.location?.id || 0,
        audience: this.fe.audiences || []
      });
    } else {
      // Reset the form fields when the event is undefined
      this.initForm();
    }
  }

  private fetchCategories() {
    this.categoryService.fetchCategories().subscribe((c: Category[]) => {
      this.categories = c;

      const categoryID = this.eventForm.get('category')?.value;
      if (categoryID) {
        const matchingCat = this.categories.find(val => val.id === categoryID);
        if (matchingCat) {
          this.autoControlCats.setValue(matchingCat);
        }
      }
    });
  }

  private fetchOrganizations() {
    this.orgService.fetchOrganizations().subscribe((o: OrgTableItem[]) => {
      this.organizations = o;

      const orgID = this.eventForm.get('organization')?.value;
      if (orgID) {
        const matchingOrg = this.organizations.find(val => val.id === orgID);
        if (matchingOrg) {
          this.autoControlOrgs.setValue(matchingOrg);
        }
      }
    });
  }

  private fetchLocations() {
    this.locService.fetchDropDown().subscribe((l: DropDownItem[]) => {
      this.locations = l;

      const locID = this.eventForm.get('location')?.value;
      if (locID) {
        const matchingLoc = this.locations.find(val => val.id === locID);
        if(matchingLoc) {
          this.autoControlLocs.setValue(matchingLoc);
        }
      }
    });
  }

  private fetchRules() {
    this.ruleService.fetchDropDown().subscribe((r: DropDownItem[]) => {
      this.rules = r;

      const ruleID = this.eventForm.get('rule')?.value;
      if (ruleID) {
        const matchingRule = this.rules.find(val => val.id === ruleID);
        if (matchingRule) {
          this.autoControlRules.setValue(matchingRule);
        }
      }
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

  // Function for filtering location dropdown
  private _filterLocations(value: string): DropDownItem[] {
    const filterValue = value.toLowerCase();
    return this.locations.filter(loc =>
      loc.name.toLowerCase().includes(filterValue) ||
      loc.details.toLowerCase().includes(filterValue)
    );
  }

  // Function for filtering rule dropdown
  private _filterRules(value: string): DropDownItem[] {
    const filterValue = value.toLowerCase();
    return this.rules.filter(rule =>
      rule.name.toLowerCase().includes(filterValue)
    );
  }

  private updateTimeRequirements() {
    switch(this.eventForm.get('time_type')?.value) {
      case TIME_TYPE.TO_BE_DETERMINED:
        this.isStartTimeDisabled = true;
        this.isEndTimeDisabled = true;
        break;
      case TIME_TYPE.WHOLE_DAY:
        this.isStartTimeDisabled = true;
        this.isEndTimeDisabled = true;
        break;
      case TIME_TYPE.NO_END:
        this.isStartTimeDisabled = false;
        this.isEndTimeDisabled = true;
        break;
      default:
        this.isStartTimeDisabled = false;
        this.isEndTimeDisabled = false;
    }
  }

  private initTimeTypeSelect() {
    this.time_types.push(
      {type: TIME_TYPE.DEFAULT, name: "Default", show: true},
      {type: TIME_TYPE.WHOLE_DAY, name: "Whole Day", show: true},
      {type: TIME_TYPE.NO_END, name: "No End", show: true},
      {type: TIME_TYPE.TO_BE_DETERMINED, name: "To Be Determined", show: true})
  }
}
