/**
 * used to get the user inputs and combine them into a datetime on the format "YYYY-MM-DD HH:mm:ss". The
 * datetime is outputted to the parent component.
 */
import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { getFullDate, getFullTime } from 'src/app/utils/time';

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
export class DatetimeComponent implements OnInit, OnChanges{
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

  constructor(private fb: FormBuilder) {}

  // Initialize the form group
  ngOnInit() {
    this.initForm();
    this.setDateConstraints(); // Sets minDate and maxDate

    this.timeForm.valueChanges.subscribe(() => {
      this.onValueChange();
    })
  }

  ngAfterViewInit() {
    if(this.value) {
      this.updateFormFields();
    } else if(this.prefillWithTimeNow) {
      this.updateFormFieldsToNow();
    }
  }

  ngOnChanges() {
    if(this.disableTime) {
      this.clearTime();
    }
  }

  // onValueChange emits value changes when it is called. It must be called whenever the user enters new data.
  onValueChange() {
    const hour = this.timeForm.value.time.toString().slice(0,2);
    const min = this.timeForm.value.time.toString().slice(3,5);

    const datetime = new Date(this.timeForm.value.date);
    datetime.setHours(hour);
    datetime.setMinutes(min);

    this.newDatetime.emit({dt: this.formatDate(datetime)})
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

  private initForm() {
    this.timeForm = this.fb.group({
      date: '',
      time: ''
    });
  }

  /**
   * Used to min/max date on datepicker.
   */
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

  private updateFormFields() {
    let inputDate;
    let inputTime;

    // Convert optional inputted value to correct format
    if (this.value) {
      const datetime = new Date(this.value);

      // ISO format is 'yyyy-mm-dd'
      inputDate = datetime.toISOString().slice(0,10);

      // Time format is 'hh:mm'
      inputTime = this.padTo2Digits(datetime.getUTCHours()) + ':' +
                  this.padTo2Digits(datetime.getUTCMinutes());
    }

    // Set date and time value
    this.timeForm.patchValue({
      date: inputDate? inputDate : "",
      time: inputTime? inputTime : ""
    })
  }

  private updateFormFieldsToNow() {
    const d = new Date();

    this.timeForm.patchValue({
      date: getFullDate(d),
      time: getFullTime(d)
    })
  }
}
