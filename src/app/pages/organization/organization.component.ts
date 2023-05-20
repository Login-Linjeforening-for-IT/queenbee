import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import { OrganizationConstants } from '../pages.constants';

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
    private route: ActivatedRoute
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
      organization_type: '',
      url_homepage: '',
      url_linkedin: '',
      url_facebook: '',
      url_instagram: '',
      logo: ''
    })

    this.organizationForm.valueChanges.subscribe(console.log)
  }
}
