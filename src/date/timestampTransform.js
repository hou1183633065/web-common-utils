import addZero from '../string/addZero'
/**
 * timestampTransform时间戳转换成指定格式日期
 * @memberof module:date
 * @param {number|string} timestamp 时间戳
 * @param {string} formats 所需转换的格式
 * @return {string} 返回根据formats格式转换后的时间
 * @example
 * timestamptransform(11111111111111, 'Y年M月D日 H时I分S秒')
 * // => "2322年02月06日 03时45分"
 * formats格式
 * // 1. Y-M-D
 * // 2. Y-M-D H:I:S
 * // 3. Y年M月D日
 * // 4. Y年M月D日 H时I分
 */

export default function timestampTransform(timestamp, formats) {

  formats = formats || 'Y-M-D';

  let myDate = timestamp ? new Date(timestamp) : new Date();

  let year = myDate.getFullYear();
  let month = addZero(myDate.getMonth() + 1);
  let day = addZero(myDate.getDate());

  let hour = addZero(myDate.getHours());
  let minite = addZero(myDate.getMinutes());
  let second = addZero(myDate.getSeconds());

  return formats.replace(/Y|M|D|H|I|S/ig, function (matches) {
    return ({
      Y: year,
      M: month,
      D: day,
      H: hour,
      I: minite,
      S: second
    })[matches];
  });
};
