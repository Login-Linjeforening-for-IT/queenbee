import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Organization } from 'src/app/models/dataInterfaces.model';

@Component({
  selector: 'app-org-form',
  templateUrl: './org-form.component.html'
})
export class OrgFormComponent {
  @Input() org!: Organization;
  orgForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();

    // If a rule is inputed into this component: populate input fields with data
    if(this.org) {
      this.updateFormFields();
    }
  }

  getFormValues(): Organization {
    return this.orgForm.value;
  }

  onDescriptionNoChange(newVal: { ht: string }) {
    this.orgForm.get('description_no')!.setValue(newVal.ht);
  }

  onDescriptionEnChange(newVal: { ht: string }) {
    this.orgForm.get('description_en')!.setValue(newVal.ht);
  }

  private initForm() {
    this.orgForm = this.fb.group({
      name_no: ['', Validators.required],
      name_en: ['', Validators.required],
      description_no: '',
      description_en: '',
      link_homepage: '',
      link_linkedin: '',
      link_facebook: '',
      link_instagram: '',
      logo: ''
    })

    // Subscribe to value changes for a specific form control
    this.orgForm?.valueChanges.subscribe((value) => {
      console.log('ruleform value changed:', value);
    });
  }

  private updateFormFields() {
    if(this.org) {
      this.orgForm.patchValue({
        name_no: this.org.name_no || '',
        name_en: this.org.name_en || '',
        description_no: this.org.description_no || '',
        description_en: this.org.description_en || '',
        link_homepage: this.org.link_homepage || '',
        link_linkedin: this.org.link_linkedin || '',
        link_facebook: this.org.link_facebook || '',
        link_instagram: this.org.link_instagram || '',
        logo: this.org.logo || ''
      })
    }
  }
}
