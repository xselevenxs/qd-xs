<template>
	<view class="conbox">
		<view class="container2">
			<image src="/static/q-bg.jpg" class="cont"></image>
			<view class="itemBackView" @click="townAddressChoose">
				<!-- <view class="leftClass">街道</view> -->
				<input type="text" placeholder-class="adressPlasce" placeholder="点击选择街道" disabled="true" :value="townAddress" class="inputClass2" />
				<!-- <image class="rightSelectImage" src="/static/show_more.png"></image> -->
			</view>
			
		
		<!-- 镇 -->
		<w-picker-new :visible.sync="townAddressVisible" :value="townAddress" mode="selector" @confirm="onTownAddressConfirm"
		 default-type="title" :default-props="defaultProps" :options="subdistrictList" ref="personnelTypeChoose"></w-picker-new>

		</view>
	</view>
</template>

<script>
	import wPickerNew from "@/components/w-picker-new/w-picker.vue";
	var that
	export default {
		components: {
			'w-picker-new': wPickerNew
		},
		data() {
			return {
				screenHeight: 0,
				townAddressVisible: false,
				townAddress: '',
				defaultProps: {
					label: 'title',
					value: 'id'
				},
				subdistrictList: [],
			}
		},
		onLoad() {
			that = this
			uni.getSystemInfo({
				success(res) {
					that.screenHeight = res.windowHeight + 44;
				}
			});
		},
		onShow() {

		},
		methods: {
			onTownAddressConfirm: function(e) {
				that.townAddress = e.result
			},
			townAddressChoose() {
				// 点击地址触发事件
				that.townAddressVisible = true
			},
			getUserInfo() { //
				that.$api.getLoginUserInfo({}).then((res) => {
					let resData = res.data
					if (resData.state_code == '400200') {
						that.$store.commit('setUserInfo', resData.data)
					} else {

					}

				}).catch((err) => {

				})
			},
			getMobileLogin() {
				that.$api.getMobileLogin({
					mobile: '17091008732'
				}).then((res) => {
					let resData = res.data
					if (resData.state_code == '400200') {
						uni.setStorage({
							key: "nativeTokenInfo_key",
							data: resData.data.access_token,
						})
						that.$store.commit('setToken', resData.data.access_token)
						that.getUserInfo()
					} else {
						that.showToast(resData.state_msg)
					}

				}).catch((err) => {

				})
			}
		}
	}
</script>

<style>
	.conbox {
		width: 750upx;
		height: 100vh;
		overflow-x: hidden;
		overflow-y: scroll;
	}

	.container2,
	image.cont {
		width: 750upx;
		min-height: 100vh;
		height: auto;
		position: relative;
	}

	image.cont {
		height: 100%;
		position: absolute;
		z-index: -1;
	}

	.header {
		width: 100%;
		height: 300upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.info {
		width: 700upx;
		height: 270upx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.mid {
		height: 120upx;
		width: 50%;
		margin-left: 10upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.ans {
		width: 50%;
		height: 120upx;
		position: absolute;
		left: 0;
		bottom: 0;
		background-color: #007AFF;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 50upx;
		color: #FFFFFF;
	}

	.draw {
		width: 50%;
		height: 120upx;
		position: absolute;
		right: 0;
		bottom: 0;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 50upx;
		color: #C0C0C0;
	}

	.startans {
		width: 400upx;
		height: 136upx;
		position: absolute;
		right: 175upx;
		bottom: 300upx;
		border-radius: 50upx;
	}
	.itemBackView {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		padding: 15upx 15upx;
		/* background-color: #FFFFFF; */
		position: absolute;
		bottom: 600upx;
		
	}
	
	.itemBackView2 {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 15upx 15upx;
	}
	
	.leftClass {
		margin-right: 10upx;
		width: 20%;
	}
	
	.inputClass {
		border-bottom: 1upx solid #C9C9C9;
		width: 75%;
		border-radius: 10upx;
		padding: 10upx;
		height: 60upx;
	}
	
	.inputClass2 {
		border-bottom: 1upx solid #C9C9C9;
		width: 71%;
		border-radius: 10upx;
		padding: 10upx;
		height: 60upx;
		color: #FFFFFF;
		background-color: #F8F8F8;
		margin: 0upx auto;
	}
	.adressPlasce{
		color: #C9C9C9;
	}
	.pickerSelect {
		border-bottom: 1upx solid #C9C9C9;
		width: 68%;
		border-radius: 10upx;
		padding: 10upx;
	}
	
	.rightSelectImage {
		width: 40upx;
		height: 40upx;
	}
	
	.foreignRadio {
		margin-left: 100upx;
	}
	
	.radioClass {
		margin-right: 10upx;
	}
	
	.bottomView {
		width: 100%;
		padding: 60upx;
		background-color: #FFFFFF;
	}
	
	.submitBackView {
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 10upx 30upx;
	}
	
	.submitBtn {
		background: #0BB20C;
		color: white;
		width: 45%;
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 40upx;
		margin: 20upx 30upx;
	}
	
	.saveBtn {
		background-color: #46A0FC;
	}
	
	.protocolView {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 15upx 20upx;
		font-size: 25upx;
	}
	
	.titleRightView {
		color: #1296db;
		position: absolute;
		right: 65upx;
	}
	
	.rightImageClass {
		position: absolute;
		right: 20upx;
		width: 40upx;
		height: 40upx;
	}
	
	.detectionMes {
		font-size: 28upx;
		color: #F29D5D;
	}
	
	.detectionResBackView {
		display: flex;
		flex-direction: row;
		width: 100%;
		padding: 15upx;
	}
	
	.detectionItem {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 10upx 0upx;
	}
	
	.detectionleftClass {
		width: 35%;
	}
	
	.detectionResultRight {
		width: 15%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
</style>
