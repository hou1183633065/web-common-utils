/*
* @Author: qitingyue
* @Date:   2019-12-18 15:14:33
 * @Last Modified by: houzhiqiag
 * @Last Modified time: 2020-03-23 13:39:49
*/
import Vue from 'vue'
import './common.js'
import './filter.util.js'
import './prototype.fun.js'
import './checkNativeEnv.js'
import requestBack from './native.bridge'
import CheckFormFun from './check.form.fun'
import { sensitiveFormatter } from "./DataFormatterFun";

Vue.prototype.$nativeRequest = requestBack.requestBack
Vue.prototype.$CheckFormFun = new CheckFormFun()
Vue.prototype.$sensitiveFormatter = sensitiveFormatter