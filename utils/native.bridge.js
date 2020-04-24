function requestBack (params) {
  // 请求返回
  return new Promise(function (resolve, reject) {
    window.WebViewJavascriptBridge.callHandler(
      'nativeFunction',
      params,
      function (responseData) {
        resolve(responseData)
      },
      function (error) {
        reject('唤起客户端失败')
      }
    )
  })
}
export default {
  requestBack
}
