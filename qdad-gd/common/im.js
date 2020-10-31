import Vue from 'vue'
import md5 from '../libs/md5/src/md5.js'
import store from '@/store'
/*
 * 极光IM初始化
 * @param 
 * @return true false
 *   
 */
export function JIMInit() {
	console.log('*********************测试数据*********************isInit=' + JSON.stringify(Vue.prototype.JIM.isInit()))
	if (!Vue.prototype.JIM.isInit()) {

		var http = store.state.globalBaseUrl;
		uni.request({
			url: http + '/im/im/info',
			method: 'POST',
			data: {
				token: store.state.token
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			success(res) {
				var resObject = res.data
				if (resObject.code == '10000' || resObject.code == 10000) {
					let info = resObject.data
					Vue.prototype.JIM.init({
						"appkey": info.appKey,
						"random_str": info.random_str,
						"signature": info.signature,
						"timestamp": info.timestamp,
						"flag": 1
					}).onSuccess(function(data) {
						console.log('APPVUEJIM--INIT')
						console.log(data)
						JIMLogin()
						return true
					}).onFail(function(data) {
						//TODO
						console.log(data)
						return false
					});
				}
			},
			fail() {
				return false
			}
		})
	} else {
		JIMLogin()
		return true
	}
}
/*
 * 极光IM登录
 * @param 
 * @return true false
 *   
 */
export function JIMLogin() {
	console.log('*********************测试数据*********************isLogin=' + JSON.stringify(Vue.prototype.JIM.isLogin()))
	if (!Vue.prototype.JIM.isLogin()) {
		console.log('*********************测试数据*********************isLogin222=' + JSON.stringify(Vue.prototype.JIM.isLogin()))
		var userInfo = uni.getStorageSync('IM_patientUser')
		Vue.prototype.JIM.login({
			'username': userInfo.username,
			'password': userInfo.password
		}).onSuccess(function(data) {
			console.log("%c%s", "color: red; font-size: 24px;", "登录成功IM.JS");
			console.log(data)
			return true
		}).onFail(function(data) {
			console.log('JIM -登录失败')
			return false
		});
	} else {
		return true
	}
}
export function JIMInitAndLogin(callback) {
	console.log('*********************测试数据*********************isInit=' + JSON.stringify(Vue.prototype.JIM.isInit()))
	if (!Vue.prototype.JIM.isInit()) {
		var http = store.state.globalBaseUrl;
		uni.request({
			url: http + '/im/im/info',
			method: 'POST',
			data: {
				token: store.state.token
			},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			success(res) {
				var resObject = res.data
				if (resObject.code == '10000' || resObject.code == 10000) {
					let info = resObject.data
					Vue.prototype.JIM.init({
						"appkey": info.appKey,
						"random_str": info.random_str,
						"signature": info.signature,
						"timestamp": info.timestamp,
						"flag": 1
					}).onSuccess(function(data) {
						console.log('APPVUEJIM--INIT')
						console.log(data)
						if (!Vue.prototype.JIM.isLogin()) {
							var userInfo = uni.getStorageSync('IM_patientUser')
							Vue.prototype.JIM.login({
								'username': userInfo.username,
								'password': userInfo.password
							}).onSuccess(function(data) {
								console.log("%c%s", "color: red; font-size: 24px;", "登录成功IM.JS");
								console.log(data)
								let info = {
									login: 'success'
								}
								callback(info)
							}).onFail(function(data) {
								console.log('JIM -登录失败')
								let info = {
									login: 'fail'
								}
								callback(info)
							});
						} else {
							let info = {
								login: 'success'
							}
							callback(info)
						}
					}).onFail(function(data) {
						//TODO
						console.log(data)
						let info = {
							login: 'fail'
						}
						callback(info)
					});
				}else{
					let info = {
						login: 'fail'
					}
					callback(info)
				}
			},
			fail() {
				let info = {
					login: 'fail'
				}
				callback(info)
			}
		})
	} else {
		console.log('*********************测试数据*********************isLogin2=' + JSON.stringify(Vue.prototype.JIM.isLogin()))
		if (!Vue.prototype.JIM.isLogin()) {
			var userInfo = uni.getStorageSync('IM_patientUser')
			Vue.prototype.JIM.login({
				'username': userInfo.username,
				'password': userInfo.password
			}).onSuccess(function(data) {
				console.log("%c%s", "color: red; font-size: 24px;", "登录成功IM.JS");
				console.log(data)
				let info = {
					login: 'success'
				}
				callback(info)
			}).onFail(function(data) {
				console.log('JIM -登录失败')
				let info = {
					login: 'fail'
				}
				callback(info)
			});
		} else {
			let info = {
				login: 'success'
			}
			callback(info)
		}
	}
}