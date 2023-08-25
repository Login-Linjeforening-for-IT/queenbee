import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JobadConstants } from '../../pages.constants';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobadDetail } from 'src/app/models/dataInterfaces.model';

@Component({
  selector: 'app-jobad-form',
  templateUrl: './jobad-form.component.html'
})
export class JobadFormComponent {
  @Input() jobad!: JobadDetail;
  @Output() formValues = new EventEmitter<{fv: JobadDetail}>();

  types = JobadConstants.TYPES
  priorities = JobadConstants.PRIORITIES

  jobAdForm!: FormGroup;
  pathElements!: string[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm();

    if (this.jobad) {
      this.updateFormFields();
    }
  }

  onEmit() {
    this.formValues.emit({fv: this.jobAdForm.value});
  }

  onPublishChange(newVal: {dt: string}) {
    this.jobAdForm.value.time_publish = newVal.dt;
  }

  onDeadlineChange(newVal: {dt: string}) {
    this.jobAdForm.value.time_deadline = newVal.dt;
  }

  onDescriptionNoChange(newVal: { ht: string }) {
    this.jobAdForm.get('description_long_no')!.patchValue(newVal.ht);
  }

  onDescriptionEnChange(newVal: { ht: string }) {
    this.jobAdForm.get('description_long_en')!.patchValue(newVal.ht);
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
      time_publish: '',
      application_deadline: '',
      application_url: '',
      application_email: '',
      contact_email: '',
      contact_phone: '',
      image_small: '',
      image_banner: '',
      remote: '',
      type: '',
      priority: ''
    })
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
        time_publish: this.jobad.time_publish || '',
        application_deadline: this.jobad.application_deadline || '',
        /*application_url: this.jobad.application_url || '',
        application_email: this.jobad.application_email || '',
        contact_email: this.jobad.contact_email || '',
        contact_phone: this.jobad.contact_phone || '',
        image_small: this.jobad.image_small || '',
        image_banner: this.jobad.image_banner || '',
        remote: this.jobad.remote || false,
        type: this.jobad.type || '',
        priority: this.jobad.priority || 0*/
      });
    } else {
      // Reset the form fields when the event is undefined
      this.initForm();
    }
  }
}
