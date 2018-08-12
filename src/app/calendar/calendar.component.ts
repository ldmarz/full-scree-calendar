import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  allCalendars: Array<any> = [];
  daysOfWeek: Array<String> = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  arraysOfDays: Array<Object> = [];

  constructor() {
    for (let x = 0; x < 10; x++) {
      const momentHelper = moment('2018/12/31');
      this.allCalendars[x] = [];

      for (let week = 0; week < 4; week++) {
        this.allCalendars[x][week] = [];
        for (let i = 0; i < 7; i++) {
          this.allCalendars[x][week].push(momentHelper.add(1, 'days').format('D'));
        }
      }
    }

    console.log(this.allCalendars);
  }

  ngOnInit() {
  }

  getDay(day) {
    console.log(day);
  }

}
