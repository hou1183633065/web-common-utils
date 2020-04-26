/**
 * 字符串脱敏显示，替换成*
 * @memberof module:string
 * @param {String|Number} str 被脱敏字符串
 * @param {Number} firstIndex 脱敏开始字符下标（默认从0开始）
 * @param {Number} lastIndex 脱敏结束字符下标（默认到结尾）
 * @return {String} 返回依据键值对在对象中取值后的数组
 * @example
 * let arr = [{key: 'key1',value: ''},{key: 'key2',value: ''}]
 * let obj = {key1: 123, key2: 456}
 * doffSensitive(16612345678)
 * // => ***********
 * doffSensitive(16612345678, -3, -1)
 * // => 16612345**8
 */
export default function doffSensitive(str = '', firstIndex = 0, lastIndex) {
  let formatter_str = str.toString()
  let result = ""
  firstIndex = firstIndex < 0 ? formatter_str.length + firstIndex : firstIndex
  lastIndex = !lastIndex ? formatter_str.length : lastIndex < 0 ? formatter_str.length + lastIndex : lastIndex

  for (let i = 0; i < formatter_str.length; i++) {
    let element = formatter_str[i]

    if (firstIndex <= i && i < lastIndex) {
      element = '*'
    }
    result += element
  }
  return result
}