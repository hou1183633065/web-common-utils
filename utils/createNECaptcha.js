// 创建网易云盾验证码
export const createNECaptcha = function (mode = 'popup', width = '320px') {
  let captchaDom = document.getElementById('js-captcha')
  if (!captchaDom) {
    captchaDom = document.createElement('div')
    captchaDom.setAttribute('id', 'js-captcha')
    document.body.appendChild(captchaDom)
  }
  return new Promise(resolve => {
    initNECaptcha({
      element: `#js-captcha`,
      captchaId: 'b926fc53d1714e60836bda4303bdf174',
      mode,
      width,
      onVerify: (error, data) => {
        if (!error) {
          resolve(data.validate)
        }
      }
    }, (instance) => {
      // 初始化成功后得到验证实例instance，可以调用实例的方法
      instance.popUp()
    }, (err) => {
      // 初始化失败后触发该函数，err对象描述当前错误信息
    })
  })
}