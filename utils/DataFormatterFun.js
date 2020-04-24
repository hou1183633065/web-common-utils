
export function keySetValue() {
  let [resultArray = [], resultObject = {}, keyArr = ['key'], valueArr = ['value']] = arguments
  if (JSON.stringify(resultObject) === '{}') return resultArray
  return resultArray.map((item) => {
    keyArr.forEach((ele, index) => {
      if (resultObject.hasOwnProperty(item[ele])) {
        let resultValue = resultObject[item[ele]]
        item[valueArr[index]] = resultValue === null ? '' : resultValue.toString()
      }
    })
    return item
  })
}

// 字符串脱敏显示，替换成*
export function sensitiveFormatter(str = '', firstIndex = 0, lastIndex = -1) {
  let formatter_str = str.toString()
  let result = ""
  lastIndex = lastIndex < 0 ? formatter_str.length + lastIndex : lastIndex

  for (let i = 0; i < formatter_str.length; i++) {
    let element = formatter_str[i]
    
    if (firstIndex <= i && i < lastIndex) {
      element = '*'
    }
    result += element
  }
  return result
}