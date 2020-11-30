<script>
	var that;
	export default {
		onLaunch: function() {
			console.log('App Launch');
			that = this
			return
			//  临时修改为默认的token  <<<<
			var myAppId = that.$store.state.myAppId
			var myWeiXinHttp = that.$store.state.myWeiXinHttp
			if (that.is_weixin()) {
				var nativeToken = uni.getStorageSync('nativeTokenInfo_key')
				if (nativeToken) {

				} else {
					uni.setStorageSync('nativeTokenInfo_key', 'first_save')
				}
				
				uni.getStorage({
					key: "nativeTokenInfo_key",
					success(storageRes) {
						if (storageRes.data == 'first_save') {
							uni.setStorageSync('nativeTokenInfo_key','second_save')
							window.location.href =
								"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + myAppId + "&redirect_uri=" + myWeiXinHttp +
								"&response_type=code&scope=snsapi_userinfo#wechat_redirect";
						} else if (storageRes.data == 'second_save') {
							var url = window.location.href;
							var netCode = that.UrlSearch(url);
							if (!netCode) {
								netCode = that.getParam('code');
							}

							if (netCode) {
								uni.request({
									url: that.$store.state.serviceUrl + '/weChart/authorization',
									method: 'POST',
									data: {
										code: netCode
									},
									header: {
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									},
									success(res) {
										let resData = res.data
										console.log("xs获取token相关信息3=" + JSON.stringify(resData));
										if (resData.state_code == '400200') {
											uni.setStorage({
												key: "nativeTokenInfo_key",
												data: resData.data.access_token,
											})
											console.log("xs获取token相关信息6=" + JSON.stringify(resData.data.access_token));
											that.$store.commit('setToken', resData.data.access_token)
											that.getUserInfo(resData.data.access_token)
										} else {
											// that.showToast(resData.state_msg)
										}

									},
									fail(res) {
										console.log("xs获取用户相关信息失败 res=" + JSON.stringify(res));
									}
								})
							}

						} else {
							that.$store.commit('setToken', storageRes.data)
							that.getUserInfo(storageRes.data)
						}
					},
					fail() {
						uni.setStorage({
							key: "nativeTokenInfo_key",
							data: 'second_save',
							success() {
								console.log("xs保存成功");
							}
						})
						window.location.href =
							"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + myAppId + "&redirect_uri=" + myWeiXinHttp +
							"&response_type=code&scope=snsapi_userinfo#wechat_redirect";
					}
				});
			} else {
				alert('请在微信打开')
			}
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			getUserInfo(cToken) { //
				var myAppId = that.$store.state.myAppId
				var myWeiXinHttp = that.$store.state.myWeiXinHttp
				uni.request({
					url: that.$store.state.serviceUrl + '/login/getUserInfo',
					method: 'POST',
					data: {
						token: cToken
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					},
					success(res) {
						let resData = res.data
						console.log("xs获取token相关信息=" + JSON.stringify(resData));
						if (resData.state_code == '400200') {

							that.$store.commit('setUserInfo', resData.data)
							that.$store.commit('setwxHeaderImage',resData.data.headImage)
						} else if (resData.state_code == '400407') {
							uni.setStorage({
								key: "nativeTokenInfo_key",
								data: 'second_save',
								success() {
									console.log("xs保存成功");
								}
							})
							window.location.href =
								"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + myAppId + "&redirect_uri=" + myWeiXinHttp +
								"&response_type=code&scope=snsapi_userinfo#wechat_redirect";
						} else {
							that.showToast(resData.state_msg)
						}

					},
					fail(res) {
						console.log("xs获取用户相关信息失败 res=" + JSON.stringify(res));
					}
				})
			},
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
	
	.container {
		background-color: #FFFFFF;
	}
</style>
