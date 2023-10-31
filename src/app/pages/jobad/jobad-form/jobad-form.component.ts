import { Component, Input, ViewChild } from '@angular/core';
import { JobadConstants } from '../../pages.constants';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {JobadDetail, OrgTableItem } from 'src/app/models/dataInterfaces.model';
import { convertToRFC3339 } from 'src/app/utils/time';
import {map, Observable, startWith} from "rxjs";
import {OrganizationService} from "../../../services/admin-api/organizations.service";
import { InputSelectorComponent } from 'src/app/components/input-selector/input-selector.component';

@Component({
  selector: 'app-jobad-form',
  templateUrl: './jobad-form.component.html'
})

/**
 * The 'JobFormComponent' is the form used to manipulate all job ads.
 *
 * @example
 * <app-job-form
 *   [jobad]="jobadObject">
 * </app-job-form>
 */
export class JobadFormComponent {
  @Input() jobad!: JobadDetail;

  types = JobadConstants.TYPES
  priorities = JobadConstants.PRIORITIES

  jobAdForm!: FormGroup;

  skills!: string[];
  @ViewChild('skillSelector') skillSelector!: InputSelectorComponent;
  @ViewChild('citySelector') citySelector!: InputSelectorComponent;

  pathElements!: string[];

  organizations: OrgTableItem[] = [];
  autoControlOrgs = new FormControl<string | OrgTableItem>('');
  filteredOrgs!: Observable<OrgTableItem[]>;

  constructor(
    private fb: FormBuilder,
    private orgService: OrganizationService
  ) {}

  ngOnInit() {
    this.initForm();
    this.fetchOrganizations();
    this.initDropdownControls();
    

    if (this.jobad) {
      this.updateFormFields();
    }
  }

  getFormValues(): JobadDetail {
    console.log(this.skillSelector.getChips())
    console.log(this.citySelector.getChips())
    return this.jobAdForm.value;
  }

  onPublishChange(newVal: {dt: string} | null) {
    newVal && this.jobAdForm.get('time_publish')?.setValue(convertToRFC3339(newVal.dt));
  }

  onDeadlineChange(newVal: {dt: string} | null) {
    newVal && this.jobAdForm.get('application_deadline')?.setValue(convertToRFC3339(newVal.dt));
  }

  onDescriptionNoChange(newVal: { ht: string }) {
    this.jobAdForm.get('description_long_no')!.patchValue(newVal.ht);
  }

  onDescriptionEnChange(newVal: { ht: string }) {
    this.jobAdForm.get('description_long_en')!.patchValue(newVal.ht);
  }

  displayOrganizationFn(organization: OrgTableItem): string {
    if(organization) {
      return organization.name
    }
    return ''
  }

  private initForm() {
    this.jobAdForm = this.fb.group({
      title_no: '',
      title_en: '',
      position_title_no: '',
      position_title_en: '',
      description_short_no: '',
      description_short_en: '',
      description_long_no: '',
      description_long_en: '',
      organization: '',
      time_publish: '',
      application_deadline: '',
      application_url: '',
      application_email: '',
      contact_email: '',
      contact_phone: '',
      image_small: '',
      image_banner: '',
      remote: '',
      job_type: '',
      priority: '',
      visible: true
    })

    this.jobAdForm?.valueChanges.subscribe((value) => {
      console.log('jobadform value changed:', value);
    });
  }

  private updateFormFields() {
    if(this.jobad) {
      this.jobAdForm.patchValue({
        title_no: this.jobad.title_no || '',
        title_en: this.jobad.title_en || '',
        position_title_no: this.jobad.position_title_no || '',
        position_title_en: this.jobad.position_title_en || '',
        description_short_no: this.jobad.description_short_no || '',
        description_short_en: this.jobad.description_short_en || '',
        description_long_no: this.jobad.description_long_no || '',
        description_long_en: this.jobad.description_long_en || '',
        organization: this.jobad.organization || '',
        time_publish: this.jobad.time_publish || '',
        application_deadline: this.jobad.application_deadline || '',
        application_url: this.jobad.application_url || '',
        application_email: this.jobad.application_email || '',
        contact_email: this.jobad.contact_email || '',
        contact_phone: this.jobad.contact_phone || '',
        image_small: this.jobad.image_small || '',
        image_banner: this.jobad.image_banner || '',
        remote: this.jobad.remote || false,
        job_type: this.jobad.type || '',
        priority: this.jobad.priority || 0,
        visible: true
      });
    } else {
      // Reset the form fields when the event is undefined
      this.initForm();
    }
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

    this.autoControlOrgs.valueChanges.subscribe(value => {
      if (value && typeof value === 'object') {
        this.jobAdForm.get('organization')?.setValue(value.id);
      } else {
        this.jobAdForm.get('organization')?.setValue(value);
      }
    });
  }

  private fetchOrganizations() {
    this.orgService.fetchOrganizations().subscribe((o: OrgTableItem[]) => {
      this.organizations = o;
    });
  }

  // Function for filtering organization dropdown
  private _filterOrganizations(value: string): OrgTableItem[] {
    const filterValue = value.toLowerCase();
    return this.organizations.filter(organization =>
      organization.name.toLowerCase().includes(filterValue)
    );
  }
}
