import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { EventConstants } from '../pages.constants';
import { EventService } from 'src/app/services/api/event.service';
import { CategoryService } from 'src/app/services/api/category.service';
import { OrganizationService } from 'src/app/services/api/organizations.service';
import { DropDownMenu, EventDetail } from 'src/app/models/dataInterfaces.model';
import { convertToRFC3339, convertFromRFC3339, isDatetimeUnset } from 'src/app/utils/time';
import { htmlToMarkdown } from 'src/app/utils/core'
import { Observable, of, tap } from 'rxjs';
import { NoDecimalValidator } from 'src/app/common/validators';
import { ErrorComponent } from 'src/app/components/dialog/error/error.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html'
})
export class EventComponent implements OnInit{
  categories: DropDownMenu[] = [];
  organizations: DropDownMenu[] = [];
  
  fetchedEvent$!: Observable<EventDetail>;
  mode! : 'new' | 'edit' | 'copy';

  eventForm!: FormGroup;
  pathElements!: string[];
  title!: string;
  submit!: string;

  // Used for 'edit' mode
  timeUpdated!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private eventService: EventService,
    private categoryService: CategoryService,
    private orgService: OrganizationService,
    private dialog: MatDialog
  ) {}  

  ngOnInit() {
    this.eventForm = this.fb.group({
      name_no: ['', Validators.required],
      name_en: '',
      description_no: '',
      description_en: '',
      info_no: '',
      info_en: '',
      time_start: '',
      time_end: '',
      time_publish: '',
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
      category: ['', Validators.required],
      organization: ['', Validators.required],
    });

    this.route.url.subscribe(segments => {
      this.pathElements = segments.map(segment => segment.path);
    
      this.fetchCategories();
      this.fetchOrganizations();

      switch (this.pathElements[1]) {
        case 'new':
          this.mode = 'new'
          this.fetchedEvent$ = of({} as EventDetail); // Trick comopnents ngIf
          this.title = EventConstants.TITLE_NEW;
          this.submit = EventConstants.SUBMIT_NEW;
          break;
        case 'edit':
          this.mode = 'edit'

          const eventID = +this.pathElements[2];
          this.fetchedEvent$ = this.eventService.fetchEvent(eventID).pipe(
            tap((event: EventDetail) => {
              this.timeUpdated = convertFromRFC3339(event.time_updated);
              
              const mdDescription_no = htmlToMarkdown(event.description_no);
              const mdDescription_en = htmlToMarkdown(event.description_en);
              
              this.eventForm.patchValue({
                name_no: event.name_no,
                name_en: event.name_en,
                description_no: mdDescription_no,
                description_en: mdDescription_en,
                info_no: event.information_no,
                info_en: event.information_en,
                time_start: !isDatetimeUnset(event.time_start)? event.time_start : "",
                time_end: !isDatetimeUnset(event.time_end)? event.time_end : "",
                time_publish: !isDatetimeUnset(event.time_publish)? event.time_publish : "",
                time_signup_release: !isDatetimeUnset(event.time_signup_release)? event.time_signup_release : "",
                time_signup_deadline: !isDatetimeUnset(event.time_signup_deadline)? event.time_signup_deadline : "",
                link_signup: event.link_signup,
                capacity: event.capacity !== 0 ? event.capacity : null,
                full: event.full,
                image_small: event.image_small,
                image_banner: event.image_banner,
                link_facebook: event.link_facebook,
                link_discord: event.link_discord,
                digital: event.digital,
                canceled: event.canceled,
                link_stream: event.link_stream,
                category: event.category.id,
                organization: event.organizations? event.organizations[0].shortname : ""
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

    this.eventForm.valueChanges.subscribe(() => console.log(this.eventForm))
    });
  }

  // The following functions is used to update various variables
  onTimeStartChange(newVal: {dt: string}) {
    this.eventForm.get('time_start')?.setValue(convertToRFC3339(newVal.dt));
  }

  onTimeEndChange(newVal: {dt: string}) {
      this.eventForm.get('time_end')?.setValue(convertToRFC3339(newVal.dt));
  }

  onTimePublishChange(newVal: {dt: string}) {
    this.eventForm.get('time_publish')?.setValue(convertToRFC3339(newVal.dt));
}

  onSignupReleaseChange(newVal: { dt: string }) {
      this.eventForm.get('time_signup_release')?.setValue(convertToRFC3339(newVal.dt));
  }

  onSignupDeadlineChange(newVal: { dt: string }) {
      this.eventForm.get('time_signup_deadline')?.setValue(convertToRFC3339(newVal.dt));
  }

  onDescriptionNoChange(newVal: { ht: string }) {
      this.eventForm.get('description_no')?.setValue(newVal.ht);
  }

  onDescriptionEnChange(newVal: { ht: string }) {
      this.eventForm.get('description_en')?.setValue(newVal.ht);
  }
  
  submitEvent() {
    this.validateEvent();

    if(this.pathElements[1] === 'new') {
      this.eventService.createEvent(this.eventForm.value).subscribe({
        next: () => {
          console.log("Event created successfully");
          // here you could navigate to another page, or show a success message, etc.
        },
        error: (error) => {
          console.log("Erroring")
          this.dialog.open(ErrorComponent, {
            data: {
              title: "Error: " + error.status + " " + error.statusText,
              details: error.error.error,
            },
          });

        }
      });
    }
  }

  cancelEvent() {
    if(confirm("Are you sure you want to cancel this event? (it will not be deleted)")) {
      this.eventForm.get('canceled')?.setValue(true);
    }
  }

  private fetchCategories() {
    this.categoryService.getDropDownMenuCategories().subscribe((c: DropDownMenu[]) => {
      this.categories = c;
    });
  }

  private fetchOrganizations() {
    this.orgService.getDropDownMenuOrganizations().subscribe((o: DropDownMenu[]) => {
      this.organizations = o;
    });
  }

  private validateEvent() {
    
  }
}
