/**
 * 
 * @desc 是否为闰年
 * @memberof module:date
 * @param {Number} year
 * @returns {Boolean}
 */

export default function isLeapYear(year) {
    if (0 === year % 4 && (year % 100 !== 0 || year % 400 === 0)) {
      return true
    }
    return false;
  }