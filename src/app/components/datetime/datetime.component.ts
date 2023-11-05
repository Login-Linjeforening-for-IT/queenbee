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
  @Input() disableTime!: boolean;
  @Input() prefillWithTimeNow!: boolean;
  @Input() minDate!: Date;
  @Input() maxDate!: Date;
  @Output() newDatetime = new EventEmitter<{dt: string} | null>();

  timeForm!: FormGroup;  // FormGroup where the actual form values from the html is stored.

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit() {
    this.setDateConstraints(); // Sets minDate and maxDate

    if(this.value) {
      this.updateForm();
    }
  }

  ngOnChanges() {
    if(this.timeForm.get('isTimeDisabled')) {
      this.timeForm.get('isTimeDisabled')?.patchValue(this.disableTime);
      this.clearTime();
    } 

    this.emitDatetime();
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

  // Formats Date to a string on format HH:mm
  private getTime(dt: Date): string {
    const hour = dt.getHours().toString().padStart(2, '0'); // Padding with '0'
    const minute = dt.getMinutes().toString().padStart(2, '0'); // Padding with '0'

    return `${hour}:${minute}`;
  }

  private getDate(dt: Date): string {
    const year = dt.getFullYear();
    const month = (dt.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to the month since it is zero-based, and padding with '0'
    const day = dt.getDate().toString().padStart(2, '0'); // Padding with '0'

    return `${year}-${month}-${day}`;
  }

  private initForm() {
    this.timeForm = this.fb.group({
      date: '',
      time: '',
      isTimeDisabled: false
    })
  }

  private updateForm() {
    if(this.timeForm) {
      let inputDate;
      let inputTime;

    // Convert optional inputted value to correct format+
    if (this.value) {
      console.log(this.value); // Assuming this.value is a string in ISO format
      const dateParts = this.value.split('T')[0].split('-').map(Number);
      const timeParts = this.value.split('T')[1].split('.')[0].split(':').map(Number);

      const datetime = new Date(
        dateParts[0],  // Year
        dateParts[1] - 1,  // Month (subtract 1 since months are 0-indexed)
        dateParts[2],  // Day
        timeParts[0],  // Hours
        timeParts[1],  // Minutes
        timeParts[2]   // Seconds
      );

      console.log(datetime);

      // ISO format is 'yyyy-mm-dd'
      inputDate = datetime.toISOString().slice(0,10);
      // Time format is 'hh:mm'
      if(!this.disableTime) {
        inputTime = this.getTime(datetime);
      } else {
        inputTime = '';
      }
    } else if(this.prefillWithTimeNow) {
      const datetimeNow  = new Date();

      inputDate = this.getDate(datetimeNow);
      // Time format is 'hh:mm'
      inputTime = this.getTime(datetimeNow);
    }

    // Set date and time value
    this.timeForm.patchValue({
      date: inputDate? inputDate : "",
      time: inputTime? inputTime : "",
      isTimeDisabled: this.disableTime
    })
    }
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
