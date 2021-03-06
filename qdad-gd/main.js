import Vue from 'vue'
import App from './App'
import store from './store'
import Vuex from 'vuex'
import api from '@/common/vmeitime-http/'
import VueJsonp from 'vue-jsonp'
import * as util from './common/util.js'

Vue.config.productionTip = false
// Vue.use(VueJsonp)
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()

Vue.prototype.$store = store;
Vue.prototype.$api = api;
Vue.prototype.$util = { ...util } // 绑定工具供全局访问
// 显示提示信息
Vue.prototype.showToast = function(value) {
	uni.showToast({
		title: value,
		mask: false,
		duration: 1500,
		icon: 'none'
	});
}
var level = 1
var INFO = 2;
//执行打印信息
Vue.prototype.log = function(value) {
	if (level <= INFO) {
		console.log(value);
	}
}

//显示打印信息
Vue.prototype.showToast = function(value) {
	uni.showToast({
		title: value,
		duration: 2000,
		icon: "none"
	});
}

var http = "http://huimin-api1-dev.grip8.com";

var myAppId = "wx0d277c1eaeab1102";
var myWeiXinHttp = "http%3A%2F%2Fxs-dev.grip8.com";

//获取APPID
Vue.prototype.getAppId = function() {
	return myAppId;
}
//获取微信跳转地址
Vue.prototype.getWeiXinHttp = function() {
	return myWeiXinHttp;
}


//1、获取access_token与超时时间
Vue.prototype.getTokenAndTime = function(appId, code) {
	return http + "/api//weixin/authcode?wx_appid=" + appId + "&wx_authcode=" + code;
}
