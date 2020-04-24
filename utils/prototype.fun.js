import Vue from 'vue'
import PubSub from 'pubsub-js'
import { Dialog } from 'vant';
// 定义原生传递参数
Vue.prototype.checkStoreName = function(data) {
    let storeNameList = ['shopGoodsCartIdsFn']
    // 0 未支付订单
    function penddingOrder() {
        this.storeNameStatus = storeNameList.indexOf(data.setName) > -1
    }
    return new penddingOrder()
}
// 接收原生消息
Vue.prototype.acceptNativeData = function(data, responseCallback) {
    Vue['prototype'][data]()
    responseCallback({
        'javascriptsays': 'ios back'
    })
}
let vueFactoryModel = null
// 页面取消回退事件
Vue.prototype.cancelBack = function(data) {
    if (data.confirm === '0') {
        vueFactoryModel.$store.dispatch('penddingPayFn', {
            'penddingPay': false
        })
        // vueFactoryModel.$router.go(-1);
        Vue.prototype.callNative('appPushOrderList', {})
    }
}
// 封装native方法
Vue.prototype.callNative = function(method, data, callback) {
    Vue.prototype.$nativeRequest({
        method: method,
        data: data
    }).then((res) => {
        if (callback) {
            callback(JSON.parse(res))
        }
    }, () => {
        alert('退出失败')
    })
}
// h5调用native方法

// 页面回退弹窗
Vue.prototype.appCloseShowWindow = function(callback) {
    Dialog.confirm({
        message: '确认放弃本次交易吗?',
        confirmButtonText: '确认放弃',
        cancelButtonText: '继续支付'
    }).then(() => {
        vueFactoryModel.$store.dispatch('penddingPayFn', {
            'penddingPay': 0
        })
        Vue.prototype.jsBack();
        // vueFactoryModel.$router.go(-1)
    }).catch(() => {
        // on cancel
    });
}
Vue.prototype.appCloseShowPasswordWindow = function(initPath) {
    Dialog.confirm({
        message: '确认放弃更改安全密码',
        confirmButtonText: '确认放弃',
        cancelButtonText: '继续设置'
    }).then(() => {
        if(initPath === '/validatePassword' || initPath === '/findPassword') {
            Vue.prototype.appCloseWebView()
        } else {
            vueFactoryModel.$router.go(-2)
        }
        
        // vueFactoryModel.$router.go(-1)
    }).catch(() => {
        // on cancel
    });
}
// 关闭webview
Vue.prototype.appCloseWebView = function() {
    console.log('关闭webview')
    Vue.prototype.callNative('appCloseWebview', {})
}
// 开启加载框
Vue.prototype.appShowLoading = function() {
    Vue.prototype.callNative('appShowLoading', {})
}
// 关闭加载框
Vue.prototype.appHideLoading = function() {
    Vue.prototype.callNative('appHideLoading', {})
}

// native调用h5方法

// 页面回退
Vue.prototype.jsBack = function(data, responseCallback) {
    console.log('原生调用jsback')
    let currentPath = vueFactoryModel ? vueFactoryModel.$router.history.current.path : ''
    let initPath = vueFactoryModel ? vueFactoryModel.$store.state.initRouterPath : ''
    let penddingPay = vueFactoryModel ? vueFactoryModel.$store.state.penddingPay : 0
    console.log(penddingPay, 'penddingPay')
    console.log(vueFactoryModel, 'vueFactoryModel')
    console.log(initPath, 'initPath', penddingPay, 'currentPath')
    if (vueFactoryModel != null) {

        if(currentPath === '/resetPassword') {
            Vue.prototype.appCloseShowPasswordWindow(initPath);
            return;
        }
        // 支付结果页退出逻辑
        // if (currentPath === '/goodsDetail') {
        //     Vue.prototype.appCloseWebView()
        //     return
        // }
        if(currentPath === '/paymentResult') {
            if(initPath === '/goodsDetail') {
                vueFactoryModel.$router.push({
                    path: '/goodsDetail',
                    query: Object.assign({}, {
                        ...vueFactoryModel.$route.query
                    }, {checkResult: false})
                })
            } else {
                Vue.prototype.appCloseWebView()
            }
            return;
        }
        if (currentPath !== initPath) {
            if (penddingPay) {
                Vue.prototype.appCloseShowWindow(Vue.prototype.cancelBack)
            } else {
                vueFactoryModel.$router.go(-1)
            }
        } else {
            // 回到原生
            Vue.prototype.appCloseWebView()
        }
    } else {
        // 回到原生
        Vue.prototype.appCloseWebView()
    }
}
// 页面初始化数据
Vue.prototype.setNativeData = function(vueFactory, data) {
    vueFactoryModel = vueFactory;
}

// 购物车编辑
Vue.prototype.shoppingCartEdit = function() {
    vueFactoryModel.$store.dispatch('showDeleteButtonFn', {
        'showDeleteButton': true
    })
}

// 购物车编辑完成
Vue.prototype.shoppingCartEditFinish = function() {
    vueFactoryModel.$store.dispatch('showDeleteButtonFn', {
        'showDeleteButton': false
    })
}