import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calendar';
  form = {
    startDate: '2018/08/01',
    number: 180,
    countryCode: 'United States'
  };
  error = false;
  errorMessage = '';

  @ViewChild(CalendarComponent) calendarComponent;

  generateCalendar() {
    this.error = false;
    if (!moment(this.form.startDate, 'YYYY/mm/dd').isValid()) {
      this.error = true;
      this.errorMessage = 'The format date is YYYY/mm/dd';
    }

    if (this.form.number < 0) {
      this.error = true;
      this.errorMessage = 'Number must be integer';
    }

    if (this.form.countryCode === '') {
      this.error = true;
      this.errorMessage = 'Country code is required';
    }

    this.calendarComponent.renderValidDays();
  }
}
