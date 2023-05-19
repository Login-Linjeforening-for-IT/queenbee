import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.css']
})

// Class is used to get the user inputs and combine them into a datetime on the format "YYYY-MM-DD HH:mm:ss". The
// datetime is outputted to the parent component.
export class DatetimeComponent {
  @Input() dateLabel!: string;
  @Input() timeLabel!: string;
  @Input() timeDisableable!: boolean;
  @Output() newDatetime = new EventEmitter<{dt: string}>();

  isTimeDisabled = false;
  minDate = new Date();

  timeForm!: FormGroup;  // FormGroup where the actual form values from the html is stored.

  constructor(private fb: FormBuilder) {}

  // Initialize the form group
  ngOnInit() {
    this.timeForm = this.fb.group({
      date: '',
      time: ''
    })
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

  // Triggered when the slide toggle is clicked. Function is used to reset the time value and to trigger the emit
  // function onValueChange().
  onTimeToggle() {
    if (this.isTimeDisabled) {
      this.timeForm.value.time = '';
      this.onValueChange();
    }
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
  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
}
