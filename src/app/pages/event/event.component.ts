import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import { EventConstants } from '../pages.constants';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html'
})
export class EventComponent {
  categories = EventConstants.CATEGORIES
  organizations = EventConstants.ORGANIZATIONS

  eventForm!: FormGroup;
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
    });

    switch (this.pathElements[1]) {
      case 'new':
        this.title = EventConstants.TITLE_NEW;
        this.submit = EventConstants.SUBMIT_NEW;
        break;
      case 'edit':
        this.title = EventConstants.TITLE_EDIT;
        this.submit = EventConstants.SUBMIT_EDIT;
        break;
      default:
        this.title = 'title not set!';
        this.submit = 'submit not set!'
    }

    this.eventForm = this.fb.group({
      name_no: '',
      name_en: '',
      description_no: '',
      description_en: '',
      info_no: '',
      info_en: '',
      category: '',
      organization: '',
      time_start: '',
      time_end: '',
      time_signup_release: '',
      time_signup_deadline: '',
      link_signup: '',
      info: '',
      image_small: '',
      image_banner: '',
      link_facebook: '',
      link_discord: '',
      digital: false,
      link_stream: ''
    })

    this.eventForm.valueChanges.subscribe(console.log)
  }

  // The following functions is used to update various variables
  onTimeStartChange(newVal: {dt: string}) {
    this.eventForm.value.time_start = newVal.dt;
  }

  onTimeEndChange(newVal: {dt: string}) {
    this.eventForm.value.time_end = newVal.dt;
  }

  onSignupReleaseChange(newVal: { dt: string }) {
    this.eventForm.value.time_signup_release = newVal.dt;
  }

  onSignupDeadlineChange(newVal: { dt: string }) {
    this.eventForm.value.time_signup_deadline = newVal.dt;
  }

  onDescriptionNoChange(newVal: { ht: string }) {
    this.eventForm.get('description_no')!.patchValue(newVal.ht);
  }

  onDescriptionEnChange(newVal: { ht: string }) {
    this.eventForm.get('description_en')!.patchValue(newVal.ht);
  }
}
