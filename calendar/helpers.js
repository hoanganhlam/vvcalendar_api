const _ = require('lodash');
const moment = require('moment');

const createPage = (months, holidays, startWeek = 1) => {
  const month_date = months[months.length - 1].clone()
  const rows = [[]];
  let rowIndex = 0;
  let dayIndex = 0;
  const addDay = (day) => {
    if (dayIndex !== 0 && dayIndex % 7 === 0) {
      rows[++rowIndex] = [];
      dayIndex = 0;
    }
    rows[rowIndex][dayIndex++] = day;
  };
  months.forEach((date) => {
    const distance = startWeek - date.day()
    const start = date.add(distance < 0 ? distance : distance - 7, 'day')
    _.times(42).forEach(i => {
      const new_date = new moment(start).add(i, 'day')
      addDay({
        date: new_date,
        show: new_date.month() === month_date.month()
      })
    })
  });
  return {
    rows,
    date: month_date
  };
};

exports.createPage = createPage;
