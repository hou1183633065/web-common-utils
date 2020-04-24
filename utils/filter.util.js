import Vue from 'vue'
Vue.filter('MoneyFormat', function (money) {
  if (money && money != null) {
    money = String(money)
    var left = money.split('.')[0]; var right = money.split('.')[1]
    right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00'
    var temp = left.split('').reverse().join('').match(/(\d{1,3})/g)
    return (Number(money) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right
  } else if (money === 0) { // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
    return '0.00'
  } else {
    return ''
  }
})

Vue.filter('InvoiceType', function (type) {
  console.log(type)
  // let invoiceIndex = this.$store.state.invoiceType.toString() + this.$store.state.personType.toString();
  let invoiceValue = ['01', '02', '11', '12', '21', '22']
  let invoiceText = ['不开具发票', '不开具发票', '电子（个人）', '电子（企业）', '增值税发票', '增值税发票']
  let invoiceType = invoiceText[invoiceValue.indexOf(type)]
  return invoiceType
})
