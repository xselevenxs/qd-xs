<script>
	var that;
	export default {
		onLaunch: function() {
			console.log('App Launch');
			that = this
			//  临时修改为默认的token  >>>>>
			// var nativeTokenInfo
			// nativeTokenInfo.recordTime = Date.parse(new Date()); //记录时间
			// nativeTokenInfo.token = "aaaa"; //token的值
			// // nativeTokenInfo.appid = that.getAppId();
			// console.log("获取用户相关信息nativeTokenInfo=" + JSON.stringify(nativeTokenInfo));
			// uni.setStorage({
			// 	key: "nativeTokenInfo_key",
			// 	data: nativeTokenInfo
			// })
			//  临时修改为默认的token  <<<<
			return
			var myAppId = "wx86a1e0f53265f9f7";
			var myWeiXinHttp = "http%3A%2F%2Fxs-dev.grip8.com";
			window.location.href =
				"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + myAppId + "&redirect_uri=" + myWeiXinHttp +
				"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
				return
			// 			判断是微信环境
			if (that.is_weixin()) {
				uni.getStorage({
					key: "nativeTokenInfo_key",
					success(res) {
						var nativeTokenInfo = res.data;
						that.patientID = nativeTokenInfo.token;
						console.log('本地有缓存的tokenInfo===' + JSON.stringify(nativeTokenInfo));

						var currentTime = Date.parse(new Date()); //获取当前时间	

						//判断向后台请求的token是否超时，超时需要重新调用微信接口
						if (currentTime - nativeTokenInfo.recordTime < nativeTokenInfo.validTime * 1000) { //token没有超出有效时间的情况下,无操作 

						} else { //token超出有效时间的情况下,重新请求token
							uni.removeStorageSync('nativeTokenInfo_key');
							window.location.href =
								"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + that.getAppId() + "&redirect_uri=" + that.getWeiXinHttp() +
								"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
						}
					},
					fail() {
						var url = window.location.href;
						var netCode = that.UrlSearch(url);
						if (netCode) {
							uni.setStorageSync('nativeCode_key', netCode);
						}
						var nativeCode = uni.getStorageSync('nativeCode_key');

						// if(value != undefined&value.length>0)
						if (nativeCode) {
							uni.request({
								url: that.getTokenAndTime(that.getAppId(), nativeCode),
								success(res) {
									console.log("xs获取token相关信息=" + JSON.stringify(res.data));
									if (res.data.code == '10000') {
										nativeTokenInfo.recordTime = Date.parse(new Date()); //记录时间
										nativeTokenInfo.validTime = res.data.data.expire; //有效时间
										nativeTokenInfo.token = res.data.data.token; //token的值

										that.patientID = res.data.data.token;
										console.log("xs获取token相关信息nativeTokenInfo=" + JSON.stringify(nativeTokenInfo));
										uni.setStorage({
											key: "nativeTokenInfo_key",
											data: nativeTokenInfo,
											success() {
												console.log("xs保存成功" + JSON.stringify(nativeTokenInfo));
											}
										})
									} else {
										uni.showModal({
											title: '提示',
											content: res.data.message,
											success: function(res) {
												if (res.confirm) {
													console.log('用户点击确定');
												} else if (res.cancel) {
													console.log('用户点击取消');
												}
											}
										});
									}

								},
								fail(res) {
									console.log("xs获取用户相关信息失败 res=" + JSON.stringify(res));
								}
							})
							uni.removeStorageSync('nativeCode_key');
						} else {
							window.location.href =
								"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + that.getAppId() + "&redirect_uri=" + that.getWeiXinHttp() +
								"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";

						}
					}
				});
			} else { // 非微信环境

			}
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			is_weixin() {
				var ua = navigator.userAgent.toLowerCase();
				return (ua.match(/MicroMessenger/i) == "micromessenger");
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
		}
	};
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}

	/* #endif */
</style>


