const moment = require('moment-holiday');

export default function (day, countryCode) {
  moment.modifyHolidays.set(countryCode);

  return moment(day).isHoliday();
}
