import Vue from 'vue'
import clientInfo from './client.info.js'

// 截取url参数
Vue.prototype.getParameter = function(queryName) {
    return decodeURIComponent((new RegExp('[?|&]' + queryName + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}

Vue.prototype.getEnvironmentEvent = function () {
	console.log(clientInfo, 'clientInfo')
	return clientInfo
}