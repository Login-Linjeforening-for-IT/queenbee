import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import { OrganizationConstants } from '../pages.constants';
import { OrganizationService } from 'src/app/services/api/organizations.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html'
})
export class OrganizationComponent {
  org_types = OrganizationConstants.ORG_TYPES

  organizationForm!: FormGroup;
  pathElements!: string[];
  title!: string;
  submit!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private organizationService: OrganizationService
  ) {}


  ngOnInit() {
    this.route.url.subscribe(segments => {
      this.pathElements = segments.map(segment => segment.path);
      console.log('Path elements:', this.pathElements);
    });

    switch (this.pathElements[1]) {
      case 'new':
        this.title = 'Create New Organization';
        this.submit = 'Create Organization';
        break;
      case 'edit':
        this.title = 'Edit Organization';
        this.submit = 'Update Organization';
        break;
      default:
        this.title = 'title';
        this.submit = 'submit';
    }

    this.organizationForm = this.fb.group({
      shortname: '',
      name_no: '',
      name_en: '',
      description_no: '',
      description_en: '',
      //organization_type: '',
      url_homepage: '',
      url_linkedin: '',
      url_facebook: '',
      url_instagram: '',
      logo: ''
    })

    this.organizationForm.valueChanges.subscribe(console.log)
  }

  onDescriptionNoChange(newVal: { ht: string }) {
    this.organizationForm.get('description_no')!.patchValue(newVal.ht);
  }

  onDescriptionEnChange(newVal: { ht: string }) {
    this.organizationForm.get('description_en')!.patchValue(newVal.ht);
  }

  submitEvent() {
    if(this.pathElements[1] === 'new') {
      console.log("clicked org")
      this.organizationService.createOrganization(this.organizationForm.value).subscribe(
        response => console.log(response),
        error => console.error(error)
      );
    }
  }
}
