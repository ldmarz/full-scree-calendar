import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import _ from 'lodash';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  allCalendars: Array<any> = [];
  daysOfWeek: Array<String> = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  weekendsNumber: Array<Number> = [0, 6];
  arraysOfDays: Array<Object> = [];
  finalDate: any;

  @Input() selectedDate: any;
  @Input() number: any;

  constructor() { }

  up() {
    this.number += 1;
    this.allCalendars = [];
    this.renderValidDays();
  }

  down() {
    this.number -= 1;
    this.allCalendars = [];
    this.renderValidDays();
  }

  renderValidDays() {
    this.allCalendars = [];
    this.selectedDate = moment(this.selectedDate);
    console.log(this.number);
    this.finalDate = moment(this.selectedDate).add(this.number, 'days');
    const date = moment(this.selectedDate);
    console.log(this.finalDate.format());
    console.log(date.format());

    while (this.finalDate.isSameOrAfter(date.startOf('week'))) {
      const arrayWeek = this.generateArrayWeek(date);
      const monthInvolvedThisWeek = this.getInvolvedMonthInAWeek(arrayWeek);

      _.each(monthInvolvedThisWeek, month => {
        const week = this.getNumberWeek(month);
        _.each(arrayWeek, days => {
          this.pushDayToCalendar(month, week, days);
        });
      });
      date.add(1, 'week');
    }

    console.log(this.allCalendars);
  }

  generateArrayWeek(date) {
    const start = moment(date).startOf('week');
    const end = moment(date).endOf('week');
    const arrayDaysOfWeek = [];

    while (start.isSameOrBefore(end)) {
      arrayDaysOfWeek.push(moment(start));
      start.add(1, 'day');
    }

    return arrayDaysOfWeek;
  }

  getInvolvedMonthInAWeek(week) {
    const months = _.map(week, o => {
      if (this.ifGreaterInMonthOrLessInYear(o) && this.ifLessInMonthOrGreaterInYear(o)) {
        return this.getKey(o);
      }
    });

    return _.uniq(_.compact(months));
  }

  ifGreaterInMonthOrLessInYear(date) {
    return date.month() >= this.selectedDate.month() || date.year() > this.selectedDate.year();
  }

  ifLessInMonthOrGreaterInYear(date) {
    return date.month() <= this.finalDate.month() || date.year() < this.finalDate.year();
  }

  pushDayToCalendar(month, week, date) {
    const dayToPush = {
      numberDay: date.format('D'),
      classes: this.getClassByDay(date, month),
    };

    this.allCalendars[month][week].push(dayToPush);
  }

  getNumberWeek(month) {
    let week;
    if (!_.has(this.allCalendars, month)) {
      week = 0;
      _.set(this.allCalendars, `${month}.${week}`, []);
    } else {
      week = Number(_.last(Object.keys(this.allCalendars[month]))) + 1;
      _.set(this.allCalendars, `${month}.${week}`, []);
    }

    return week;
  }

  validateDate(date) {
    return moment(date);
  }

  getObjectKeys() {
    return Object.keys(this.allCalendars);
  }

  getClassByDay(day, month) {
    const classes = [];
    if (this.weekendsNumber.indexOf(day.day()) > -1) {
      classes.push('is-weekend');
    } else {
      classes.push('is-regular-day');
    }

    if (this.isInvalidDate(day, month)) {
      classes.push('is-invalid');
    }
    return classes;
  }

  isInvalidDate(day, month) {
    let isInvalid = false;
    if (this.getKey(day) !== month) {
      isInvalid = true;
    }

    if (day.isBefore(this.selectedDate) || day.isAfter(this.finalDate)) {
      isInvalid = true;
    }

    return isInvalid;
  }

  getKey(date) {
    return `${date.format('MMM')}, ${date.format('YYYY')}`;
  }

}
