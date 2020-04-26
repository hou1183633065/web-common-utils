/**
 * @desc   格式化${timestamp}距现在的已过时间
 * @param  {Date} timestamp 
 * @return {String}
 */
export default function formatPassTime(timestamp) {
    let currentTime = Date.parse(new Date()),
        time = currentTime - timestamp,
        day = parseInt(time / (1000 * 60 * 60 * 24)),
        hour = parseInt(time / (1000 * 60 * 60)),
        min = parseInt(time / (1000 * 60)),
        month = parseInt(day / 30),
        year = parseInt(month / 12);
    if (year) return year + "年前"
    if (month) return month + "个月前"
    if (day) return day + "天前"
    if (hour) return hour + "小时前"
    if (min) return min + "分钟前"
    else return '刚刚'
}
