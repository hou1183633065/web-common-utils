/**
* 方法说明
* @method  new CheckFormFun(params)
* @for 检索Input输入框活字符串中内容是否合法
* @param {String or Number} 参数名 参数说明
* @return {true or false} 返回值说明
*/

class CheckFormFun {
  constructor (paramString) {
    this.paramString = paramString || ''
    this.AllSpecialString = /\u0060|\u007e|\u0021|\u0040|\u0023|\u0024|\u0025|\u005e|\u0026|\u002a|\u0028|\u0029|\u002d|\u003d|\u002b|\u003c|\u003e|\u003f|\u002c|\u002e|\u002f|\u003a|\u0022|\u003b|\u0027|\u007b|\u007d|\u005b|\u005d|\u005c|\u007c|\uff01|\u0040|\u0023|\uffe5|\u0025|\u2026|\u2026|\u0026|\u002a|\uff08|\uff09|\u2014|\u2014|\u002b|\u300c|\u300d|\u3010|\u3011|\u300a|\u300b|\uff1f|\uff1a|\u201c|\u201d|\uff1b|\u2018|\u2019|\u007c|\u3001|\u0020/
    this.SpecialString = /\u0060|\u0024|\u0026|\u002a|\u005c|\u003c|\u003e/
    this.email = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,20}/
    this.url = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/
    this.password = /^[A-Za-z0-9]{6,12}$/
    this.Registration = /^[A-Za-z0-9]{1,30}$/
    this.code = /^[A-Za-z0-9]{4}$/
    this.phone = /^1[3456789]\d{9}$/
    this.name = /^[\u4E00-\u9FA5A-Za-z]+$/
    this.EnString = /^[A-Za-z]+$/
    this.EnNumber = /^[A-Za-z0-9]+$/
    this.CnString = /^[\u4E00-\u9FA5]+$/
    this.CnNumber = /^[\u4E00-\u9FA50-9]+$/
    this.RegisterNumber = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/
    this.BankCount = /([\d]{4})([\d]{4})([\d]{4})([\d]{4})([\d]{0,})?/
    this.PersonNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    this.CarNo = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5,6}$/
    this.DrivingMileage = /^\+?[1-9][0-9]*$/
    this.MinNumber = /^[1-9][0-9]*\d{5,}$/
    this.PriceNo = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
  }

  // 检索字符串全部特殊字符
  checkString (newString) {
    if (!newString) {
      return false
    }
    // 没有匹配到则返回null，非null则为合格字符串
    if (!(newString || this.paramString || '').match(this.AllSpecialString)) {
      return true
    } else {
      return false
    }
  }

  // 检索文本部分特殊字符
  checkTextArea (newString) {
    // 没有匹配到则返回null，非null则为合格字符串
    if (!(newString || this.paramString || '').match(this.SpecialString)) {
      return true
    } else {
      return false
    }
  }

  // 检索邮箱
  checkEmail (newString) {
    return this.email.test(newString || this.paramString || '')
  }

  // 检索密码
  checkPassword (newString) {
    return this.password.test(newString || this.paramString || '')
  }

  // 检索4位验证码
  checkCode (newString) {
    return this.code.test(newString || this.paramString || '')
  }

  // 检索手机号
  checkPhone (newString) {
    return this.phone.test(newString || this.paramString || '')
  }

  // 检索姓名
  checkCName (newString) {
    return this.name.test(newString || this.paramString || '')
  }

  // 检索英文字符串
  checkEnString (newString) {
    return this.EnString.test(newString || this.paramString || '')
  }

  // 检索英文+数字字符串
  checkEnNumber (newString) {
    return this.EnNumber.test(newString || this.paramString || '')
  }

  // 检索中文字符串
  checkCnString (newString) {
    return this.CnString.test(newString || this.paramString || '')
  }

  // 检索中文+数字字符串
  checkCnNumber (newString) {
    return this.CnNumber.test(newString || this.paramString || '')
  }

  // 检索企业注册号
  checkRegisterNumber (newString) {
    // 没有匹配到则返回null，非null则为合格字符串
    return this.RegisterNumber.test(newString || this.paramString || '')
  }
  // 检索纳税号
  checkRegistration (newString) {
    // 没有匹配到则返回null，非null则为合格字符串
    return this.Registration.test(newString || this.paramString || '')
  }

  // 检索URL
  checkUrl (newString) {
    return this.url.test(newString || this.paramString || '')
  }

  // 检索银行账号
  checkBankCount (newString) {
    return this.BankCount.test(newString)
  }

  // 检索身份证号
  checkPersonCount (newString) {
    return this.PersonNo.test(newString)
  }

  // 检索行驶证号
  checkDrivingNo (newString) {
    return this.MinNumber.test(newString)
  }

  // 检索车牌号
  checkCarNo (newString) {
    return this.CarNo.test(newString)
  }

  // 检索行驶证号
  checkDrivingNumber (newString) {
    if (newString === '') {
      return true
    } else {
      return this.DrivingMileage.test(newString)
    }
  }

  // 检索价格
  checkPrice (newString) {
    if (newString === '') {
      return true
    } else {
      return this.PriceNo.test(newString)
    }
  }
}

export default CheckFormFun
