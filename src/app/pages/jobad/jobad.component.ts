import { Component } from '@angular/core';
import { JobadConstants } from '../pages.constants';
import {ActivatedRoute} from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-jobad',
  templateUrl: './jobad.component.html'
})
export class JobadComponent {
  types = JobadConstants.TYPES
  priorities = JobadConstants.PRIORITIES

  jobAdForm!: FormGroup;
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
        this.title = JobadConstants.TITLE_NEW;
        this.submit = JobadConstants.SUBMIT_NEW;
        break;
      case 'edit':
        this.title = JobadConstants.TITLE_EDIT;
        this.submit = JobadConstants.SUBMIT_EDIT;
        break;
      default:
        this.title = "unset title!";
        this.submit = "unset submit!"
    }

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
      time_deadline: '',
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

    this.jobAdForm.valueChanges.subscribe(console.log)
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
}
