import { Component, Input, ViewChild } from '@angular/core';
import { JobadConstants } from '../../pages.constants';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {JobadDetail, OrgTableItem } from 'src/app/models/dataInterfaces.model';
import { convertToRFC3339 } from 'src/app/utils/time';
import {map, Observable, startWith} from "rxjs";
import {OrganizationService} from "../../../services/admin-api/organizations.service";
import { InputSelectorComponent } from 'src/app/components/chip-selectors/input-selector/input-selector.component';
import { ImageManagerComponent } from 'src/app/components/dialog/image-manager/image-manager.component';
import { MatDialog } from '@angular/material/dialog';

interface Option {
  id: string;
  name: string;
}

@Component({
  selector: 'app-jobad-form',
  templateUrl: './jobad-form.component.html',
  styleUrls: ['./jobad-form.component.css']
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
  @Input() skills: string[] = [];
  @Input() cities: string[] = [];

  types = JobadConstants.TYPES

  jobAdForm!: FormGroup;

  @ViewChild('skillSelector') skillSelector!: InputSelectorComponent;
  @ViewChild('citySelector') citySelector!: InputSelectorComponent;

  pathElements!: string[];

  organizations: OrgTableItem[] = [];
  autoControlOrgs = new FormControl<string | OrgTableItem>('');
  filteredOrgs!: Observable<OrgTableItem[]>;

  JOB_TYPES: Option[] = [
    {"id": "full", "name":"Full Time"},
    {"id": "part", "name":"Part Time"},
    {"id": "summer", "name":"Summer"},
    {"id": "verv", "name":"Verv"},
  ];

  constructor(
    private fb: FormBuilder,
    private orgService: OrganizationService,
    private dialog: MatDialog
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
    this.skillSelector.getChips();
    this.citySelector.getChips();
    return this.jobAdForm.value;
  }

  getCities(): string[] {
    return this.citySelector.getChips();
  }

  getSkills(): string[] {
    return this.skillSelector.getChips();
  }

  onPublishChange(newVal: {dt: string} | null) {
    newVal && this.jobAdForm.get('time_publish')?.setValue(convertToRFC3339(newVal.dt));
  }

  onDeadlineChange(newVal: {dt: string} | null) {
    newVal && this.jobAdForm.get('application_deadline')?.setValue(convertToRFC3339(newVal.dt));
  }

  onDescriptionNoChange(newVal: { md: string }) {
    this.jobAdForm.get('description_long_no')?.setValue(newVal.md);
  }

  onDescriptionEnChange(newVal: { md: string }) {
    this.jobAdForm.get('description_long_en')?.setValue(newVal.md);
  }

  displayOrganizationFn(organization: OrgTableItem): string {
    return organization ? organization.name : '';
  }

  compareJobTypeFn(option: string, value: string): boolean {
    return option === value;
  }

  onBannerImageChange(newVal: {val: string}) {
    this.jobAdForm.get('banner_image')?.setValue(newVal.val);
  }

  imageManager() {
    this.dialog.open(ImageManagerComponent, {
      data: {
        title: "Job Ads",
        path: "/ads",
        aspectRatio: 3 / 2
      }
    });
  }

  private initForm() {
    this.jobAdForm = this.fb.group({
      id: 0,
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
      banner_image: '',
      job_type: '',
      highlight: false,
      visible: true
    })

    this.jobAdForm?.valueChanges.subscribe((value) => {
      console.log('jobadform value changed:', value);
    });
  }

  private updateFormFields() {
    if(this.jobad) {
      this.jobAdForm.patchValue({
        id: this.jobad.id,
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
        banner_image: this.jobad.banner_image || '',
        job_type: this.jobad.job_type || '',
        highlight: this.jobad.highlight || false,
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

      const organizationId = this.jobAdForm.value.organization;
      if (organizationId) {
        const matchingOrg = this.organizations.find(val => val.id === organizationId);
        if (matchingOrg) {
          this.autoControlOrgs.setValue(matchingOrg);
        }
      }
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
