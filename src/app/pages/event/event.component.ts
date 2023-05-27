import { Component } from '@angular/core';
import { FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import { EventConstants } from '../pages.constants';
import { EventService } from 'src/app/services/api/event.service';
import { EventDetail } from 'src/app/models/dataInterfaces.model';
import { htmlToMarkdown } from 'src/app/common/utils';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html'
})
export class EventComponent {
  categories = EventConstants.CATEGORIES
  organizations = EventConstants.ORGANIZATIONS
  
  fetchedEvent$!: Observable<EventDetail>;

  eventForm!: FormGroup;
  pathElements!: string[];
  title!: string;
  submit!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
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
    });
  }  

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
        const eventID = +this.pathElements[2];
        this.fetchedEvent$ = this.eventService.fetchEvent(eventID).pipe(
          tap((event: EventDetail) => {
          const mdDescription_no = htmlToMarkdown(event.description_no);
          const mdDescription_en = htmlToMarkdown(event.description_en);
          console.log("Description is: " + mdDescription_no)

          this.eventForm.patchValue({
            name_no: event.name_no,
            name_en: event.name_en,
            description_no: mdDescription_no,
            description_en: mdDescription_en,
            info_no: event.information_no,
            info_en: event.information_en,
            time_start: event.time_start,
            time_end: event.time_end,
            time_signup_release: event.time_signup_release,
            time_signup_deadline: event.time_signup_deadline,
            link_signup: event.link_signup,
            image_small: event.image_small,
            image_banner: event.image_banner,
            link_facebook: event.link_facebook,
            link_discord: event.link_discord,
            digital: event.digital,
            link_stream: event.link_stream,
          });
        })
      );
      this.title = EventConstants.TITLE_EDIT;
      this.submit = EventConstants.SUBMIT_EDIT;
      break;
      default:
        this.title = 'title not set!';
        this.submit = 'submit not set!'
    }

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
