<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>





<!-- <script>
	var nativeTokenInfo = {};
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//  临时修改为默认的token  >>>>>
			
			nativeTokenInfo.recordTime = Date.parse(new Date()); //记录时间
			nativeTokenInfo.token = "aaaa"; //token的值
			// nativeTokenInfo.appid = that.getAppId();
			console.log("获取用户相关信息nativeTokenInfo=" + JSON.stringify(nativeTokenInfo));
			uni.setStorage({
				key: "nativeTokenInfo_key",
				data: nativeTokenInfo
			})
			//  临时修改为默认的token  <<<<
			
						//判断是微信环境
			// 			if (that.is_weixin()) {
			// 				uni.getStorage({
			// 					key: "nativeTokenInfo_key",
			// 					success(res) {
			// 						var nativeTokenInfo = res.data;
			// 						that.patientID = nativeTokenInfo.token;
			// 						console.log('本地有缓存的tokenInfo===' + JSON.stringify(nativeTokenInfo));
			// 
			// 						var currentTime = Date.parse(new Date()); //获取当前时间	
			// 
			// 						//判断向后台请求的token是否超时，超时需要重新调用微信接口
			// 						if (currentTime - nativeTokenInfo.recordTime < nativeTokenInfo.validTime * 1000) { //token没有超出有效时间的情况下,无操作 
			// 
			// 						} else { //token超出有效时间的情况下,重新请求token
			// 							uni.removeStorageSync('nativeTokenInfo_key');
			// 							window.location.href =
			// 								"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + that.getAppId() + "&redirect_uri=" + that.getWeiXinHttp() +
			// 								"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
			// 						}
			// 					},
			// 					fail() {
			// 						var url = window.location.href;
			// 						var netCode = that.UrlSearch(url);
			// 						if (netCode) {
			// 							uni.setStorageSync('nativeCode_key', netCode);
			// 						}
			// 						var nativeCode = uni.getStorageSync('nativeCode_key');
			// 
			// 						// if(value != undefined&value.length>0)
			// 						if (nativeCode) {
			// 							uni.request({
			// 								url: that.getTokenAndTime(that.getAppId(), nativeCode),
			// 								success(res) {
			// 									console.log("xs获取token相关信息=" + JSON.stringify(res.data));
			// 									if (res.data.code == '10000') {
			// 										nativeTokenInfo.recordTime = Date.parse(new Date()); //记录时间
			// 										nativeTokenInfo.validTime = res.data.data.expire; //有效时间
			// 										nativeTokenInfo.token = res.data.data.token; //token的值
			// 										
			// 										that.patientID = res.data.data.token;
			// 										console.log("xs获取token相关信息nativeTokenInfo=" + JSON.stringify(nativeTokenInfo));
			// 										uni.setStorage({
			// 											key: "nativeTokenInfo_key",
			// 											data: nativeTokenInfo,
			// 											success() {
			// 												console.log("xs保存成功" + JSON.stringify(nativeTokenInfo));
			// 											}
			// 										})
			// 									} else {
			// 										uni.showModal({
			// 											title: '提示',
			// 											content: res.data.message,
			// 											success: function(res) {
			// 												if (res.confirm) {
			// 													console.log('用户点击确定');
			// 												} else if (res.cancel) {
			// 													console.log('用户点击取消');
			// 												}
			// 											}
			// 										});
			// 									}
			// 
			// 								},
			// 								fail(res) {
			// 									console.log("xs获取用户相关信息失败 res=" + JSON.stringify(res));
			// 								}
			// 							})
			// 							uni.removeStorageSync('nativeCode_key');
			// 						} else {
			// 							window.location.href =
			// 								"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + that.getAppId() + "&redirect_uri=" + that.getWeiXinHttp() +
			// 								"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
			// 
			// 						}
			// 					}
			// 				});
			// 			}else{ // 非微信环境
			// 				
			// 			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 背景 */
	.backgroundOrange {
		background: #FDA109;
	}

	.backgroundBlue {
		background: #0077DD;
	}

	.backgroundDeepBlue {
		background: #3275D6;
	}

	.backgroundYellow {
		background: #FFFCC7;
	}

	/* 文本颜色 */
	.textOrange {
		color: #FDA109;
	}

	.textBlue {
		color: #0077DD;
	}

	.textGray {
		color: #666666;
	}

	.textOrange {
		color: #ff6600;
	}

	/* 文本大小 */
	.textBigSize {
		font-size: 34upx;
	}

	.textNormalSize {
		font-size: 28upx;
	}

	.textSmallSize {
		font-size: 22upx;
	}

	/* 控件距离周围的距离 */
	.viewPadding {
		padding: 20upx 25upx;
	}

	/* 细的横线 */
	.line {
		background: #f3f3f3;
		height: 1upx;
		width: 100%
	}

	/* 粗的横线 */
	.thickLine {
		background: #f3f3f3;
		height: 13upx;
		width: 100%
	}

	/* 页面的整体底色 */
	.allColor {
		background: #f3f3f3;
		width: 100%;
	}

	/* 但行文本省略 */
	text_line {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* 多行文本省略 */
	text_more {
		display: -webkit-box;

		overflow: hidden;

		text-overflow: ellipsis;

		word-wrap: break-word;

		white-space: normal !important;

		-webkit-line-clamp: 2;

		-webkit-box-orient: vertical;
	}
</style> -->




<!-- <script>
	var nativeTokenInfo = {};
	var that;
	var appIdKey;
	export default {
		onLaunch: function() {
			console.log('App Launch')
			that = this
		},
		onShow: function() {
			console.log('App Show')
			that = this

			var zlAppId = that.$route.query.appId;
			var zlAppId2 = that.getParam('appId');

			console.log('8888888' + zlAppId + '***' + zlAppId2);
			if (typeof(zlAppId) != 'undefined' || (zlAppId2 && typeof(zlAppId2) != 'undefined')) { //appid存在
				if (typeof(zlAppId) != 'undefined') {
					appIdKey = zlAppId;
				} else if (typeof(zlAppId2) != 'undefined') {
					appIdKey = zlAppId2;
				}
				that.$store.commit('setZlAppId', appIdKey);
				that.sendRequestGetAppId(appIdKey);
			} else {
				var stateId = that.getParam('state');
				if(stateId && typeof(stateId) != 'undefined'){
					that.getWeixinUserInfo(stateId);
				}
			}
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			sendRequestGetAppId(zlId) {
				var http = that.$store.state.globalBaseUrl;
				uni.request({
					url: http + '/api/hospital/getWxmpAppId',
					method: 'POST',
					data: {
						appId: zlId
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					},
					success(res) {
						console.log('77777' + JSON.stringify(res));
						if (res.data && res.data.code == '10000') {
							// that.$store.commit('setWeiXinAppId', res.data.data);
							uni.setStorageSync('weixinAppId_' + zlId, res.data.data);
							that.getWeixinUserInfo(zlId);
						} else {
							that.showSystemError();
						}
					},
					fail() {
						that.showSystemError();
					}
				})
			},
			UrlSearch(url) {
				var array = [];
				var name, value;
				var str = url; //获取当前页面的网址（微信会生成一个带有code的网址）
				var num = str.indexOf("?");
				str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
				var arr = str.split("&"); //各个参数放到数组里
				for (var i = 0; i < arr.length; i++) {
					num = arr[i].indexOf("=");
					if (num > 0) {
						name = arr[i].substring(0, num);
						value = arr[i].substr(num + 1);
						array[i] = value;
					}
				}
				console.log("分割内容name=" + JSON.stringify(array));
				return array[0];
			},
			is_weixin() {
				var ua = navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == "micromessenger") {
					return true;
				} else {
					return false;
				}
			},
			getParam(paramName) {
				var paramValue = "";
				var isFound = !1;
				if (window.location.search.indexOf("?") == 0 && window.location.search.indexOf("=") > 1) {
					var arrSource = unescape(window.location.search).substring(1, window.location.search.length).split("&");
					var i = 0;
					while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() ==
						paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
				}
				return paramValue == "" && (paramValue = null), paramValue
			},
			getWeixinUserInfo(zlId) {
				console.log('99999getWeixinUserInfo' + zlId);
				// 判断是微信环境
				if (that.is_weixin()) {
					var http = that.$store.state.globalBaseUrl;
					var myAppId = uni.getStorageSync('weixinAppId_' + zlId);
					var myWeiXinHttp = that.$store.state.myWeiXinHttp;
					uni.getStorage({
						key: "nativeUserInfoKey" + zlId,
						success(res) {
							nativeTokenInfo = res.data;
							// that.patientID = nativeTokenInfo.token;
							console.log('本地有缓存的tokenInfo===' + JSON.stringify(nativeTokenInfo));
							// uni.showToast({
							// 	title: '本地有缓存的tokenInfo === ' + JSON.stringify(nativeTokenInfo),
							// 	duration: 5000
							// });
							var currentTime = Date.parse(new Date()); //获取当前时间	

							//判断向后台请求的token是否超时，超时需要重新调用微信接口
							if (currentTime - nativeTokenInfo.recordTime < nativeTokenInfo.validTime * 1000) { //token没有超出有效时间的情况下,无操作 

							} else { //token超出有效时间的情况下,重新请求token
								// uni.removeStorageSync('nativeTokenInfo_key');
								uni.removeStorageSync("nativeUserInfoKey" + zlId);
								window.location.href =
									"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + myAppId + "&redirect_uri=" + myWeiXinHttp +
									"&response_type=code&scope=snsapi_userinfo&state=" + zlId + "#wechat_redirect";
							}
						},
						fail() {
							var url = window.location.href;
							var netCode = that.getParam('code');
							if (netCode) {
								uni.setStorageSync('nativeCode_key', netCode);
							}
							var nativeCode = uni.getStorageSync('nativeCode_key');

							if (nativeCode) {
								uni.request({
									url: http + "/api/weixin/authcode",
									method: 'POST',
									data: {
										wx_appid: myAppId,
										wx_authcode: nativeCode
									},
									header: {
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									},
									success(res) {
										console.log("xs获取token相关信息成功=" + JSON.stringify(res.data));
										if (res.data.code == '10000') {
											nativeTokenInfo.recordTime = Date.parse(new Date()); //记录时间
											nativeTokenInfo.validTime = res.data.data.expire; //有效时间
											nativeTokenInfo.token = res.data.data.token; //token的值
											// that.patientID = res.data.data.token;
											console.log("xs获取token相关信息nativeTokenInfo=" + JSON.stringify(nativeTokenInfo));
											// uni.showToast({
											// 	title: 'xs获取token相关信息',
											// 	duration: 5000
											// });
											if (res.data.data.user.defaultResident) {
												that.$store.commit('currentPatientExistAction', true)
												that.$store.commit('currentPatientAction', res.data.data.user.defaultResident)
											}
											that.$store.commit('setZlAppId', zlId);
											uni.setStorage({
												// key: "nativeTokenInfo_key",
												key: "nativeUserInfoKey" + zlId,
												data: nativeTokenInfo,
												success() {
													console.log("xs保存成功" + JSON.stringify(nativeTokenInfo));
												}
											})
										} else {
											that.showSystemError();
											
										}

									},
									fail(res) {
										console.log("xs获取用户相关信息失败 res=" + JSON.stringify(res));
										that.showSystemError();
									}
								})
								uni.removeStorageSync('nativeCode_key');
							} else {
								window.location.href =
									"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + myAppId + "&redirect_uri=" + myWeiXinHttp +
									"&response_type=code&scope=snsapi_userinfo&state=" + zlId + "#wechat_redirect";

							}
						}
					});
				} else { // 非微信环境 

				}
			},
			showSystemError() {
				uni.showModal({
					title: '提示',
					content: '系统出错了，请稍后退出重试或联系管理员',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 背景 */
	.backgroundOrange {
		background: #FDA109;
	}

	.backgroundBlue {
		background: #0077DD;
	}

	.backgroundDeepBlue {
		background: #46A0FC;
	}

	.backgroundYellow {
		background: #FFFCC7;
	}

	/* 文本颜色 */
	.textOrange {
		color: #FDA109;
	}

	.textBlue {
		color: #0077DD;
	}

	.textGray {
		color: #666666;
	}

	.textOrange {
		color: #ff6600;
	}

	/* 文本大小 */
	.textBigSize {
		font-size: 34upx;
	}

	.textNormalSize {
		font-size: 28upx;
	}

	.textSmallSize {
		font-size: 22upx;
	}

	/* 控件距离周围的距离 */
	.viewPadding {
		padding: 20upx 25upx;
	}

	/* 细的横线 */
	.line {
		background: #f3f3f3;
		height: 1upx;
		width: 100%
	}

	/* 粗的横线 */
	.thickLine {
		background: #f3f3f3;
		height: 13upx;
		width: 100%
	}

	/* 页面的整体底色 */
	.allColor {
		background: #f3f3f3;
		width: 100%;
	}

	/* 页面的整体底色 */
	.allWhiteColor {
		background: #FFFFFF;
		width: 100%;
	}

	/* 但行文本省略 */
	text_line {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* 多行文本省略 */
	text_more {
		display: -webkit-box;

		overflow: hidden;

		text-overflow: ellipsis;

		word-wrap: break-word;

		white-space: normal !important;

		-webkit-line-clamp: 2;

		-webkit-box-orient: vertical;
	}
</style> -->
