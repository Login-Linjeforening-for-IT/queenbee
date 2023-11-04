/**
 * used to get the user inputs and combine them into a datetime on the format "YYYY-MM-DD HH:mm:ss". The
 * datetime is outputted to the parent component.
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.css']
})

/**
 * The 'DatetimeComponent' provide inputs for selecting both date and time. It also provides several options to
 * customize the input.
 *
 * @example
 * <app-datetime
 *  [dateLabel]="'Start Date'"
 *  [timeLabel]="'Start Time'"
 *  [isTimeRequired]="true"
 *  [isDateRequired]="false"
 *  [timeDisableable]="true"
 *  (newDatetime)=onTimeStartChange($event)>
 * </app-datetime>
 */
export class DatetimeComponent {
  @Input() dateLabel!: string;
  @Input() timeLabel!: string;
  @Input() value!: string;
  @Input() isTimeRequired!: boolean;
  @Input() isDateRequired!: boolean;
  @Input() timeDisableable!: boolean;
  @Input() prefillWithTimeNow!: boolean;
  @Input() minDate!: Date;
  @Input() maxDate!: Date;
  @Output() newDatetime = new EventEmitter<{dt: string} | null>();
  @Output() timeToggeled = new EventEmitter<{td: boolean}>();

  timeForm!: FormGroup;  // FormGroup where the actual form values from the html is stored.

  constructor(private fb: FormBuilder) {}

  // Initialize the form group
  ngOnInit() {
    this.initForm();
    this.onValueChange(); // Emits the set time
    this.setDateConstraints(); // Sets minDate and maxDate
    

    // Toggle button needs special treatment...
    this.timeForm.get('isTimeDisabled')?.valueChanges.subscribe(() => {
      this.onValueChange();
    })
  }

  onValueChange() {
    if(this.timeForm.get('isTimeDisabled')?.value) {
      this.clearTime();
    }

    this.emitDatetime();
    this.emitDisabledTimeStatus();
  }

  // formatDate formats the date to string on the format YYYY-MM-DD HH:mm:ss
  formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

  // Helper function for formatDate
  private padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  private clearTime() {
    this.timeForm.get('time')?.setValue('');
  }

  private emitDatetime() {
    const hour = this.timeForm.value.time.toString().slice(0, 2);
    const min = this.timeForm.value.time.toString().slice(3, 5);

    const datetime = new Date(this.timeForm.value.date);
    datetime.setHours(hour);
    datetime.setMinutes(min);

    if (!isNaN(datetime.getTime())) {
      // Valid datetime
      this.newDatetime.emit({ dt: this.formatDate(datetime) });
    } else {
      // Invalid datetime, emit null
      this.newDatetime.emit(null);
    }
  }

  private emitDisabledTimeStatus() {
    this.timeToggeled.emit({td: this.timeForm.get('isTimeDisabled')?.value})
  }

  // Formats Date to a string on format HH:mm
  private getTime(datetime: Date): string {
    return this.padTo2Digits(datetime.getUTCHours()) + ':' +
           this.padTo2Digits(datetime.getUTCMinutes());
  }

  private initForm() {
    let inputDate;
    let inputTime;

    // Convert optional inputted value to correct format
    if (this.value) {
      const datetime = new Date(this.value);

      // ISO format is 'yyyy-mm-dd'
      inputDate = datetime.toISOString().slice(0,10);
      // Time format is 'hh:mm'
      inputTime = this.getTime(datetime);
    } else if(this.prefillWithTimeNow) {
      const datetimeNow  = new Date();

      // ISO format is 'yyyy-mm-dd'
      inputDate = datetimeNow.toISOString().slice(0,10);
      // Time format is 'hh:mm'
      inputTime = this.getTime(datetimeNow);
    }

    // Set date and time value
    this.timeForm = this.fb.group({
      date: inputDate? inputDate : "",
      time: inputTime? inputTime : "",
      isTimeDisabled: false,
    })
  }

  private setDateConstraints() {
    if(this.minDate) {
      this.minDate = new Date(this.minDate);
    } else {
      this.minDate = new Date();
    }

    if(this.maxDate) {
      this.maxDate = new Date(this.maxDate);
    }
  }
}
