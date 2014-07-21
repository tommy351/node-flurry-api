exports = module.exports = require('util');

exports.formatDate = function(date){
  if (typeof date === 'string') return date;
  date = new Date(date);

  var month = date.getMonth() + 1,
    day = date.getDate(),
    str = date.getFullYear();

  str += '-';
  if (month < 10) str += '0';
  str += month;

  str += '-';
  if (day < 10) str += '0';
  str += day;

  return str;
};