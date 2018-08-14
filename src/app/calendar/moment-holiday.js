const moment = require('moment-holiday');

export default function (day, countryCode) {
  return moment(day).isHoliday();
}
