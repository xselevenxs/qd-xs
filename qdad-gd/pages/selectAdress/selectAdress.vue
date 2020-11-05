<template>
	<view class="conbox">
		<view class="container2">
			<image src="/static/q-bg.jpg" class="cont"></image>
			<image src="/static/title.png" style="width: 600upx;height: 150upx;position: absolute;left: 75upx;top: 100upx;"></image>
			<image src="/static/diqiu.png" style="width: 650upx;height: 680upx;position: absolute;left: 50upx;bottom: 50upx;"></image>
			<view class="itemBackView">
				<image src="../../static/biankuang.png" style="width: 100%; height: 100%;"></image>
				<!-- <view class="leftClass">街道</view> -->
				<view @click="townAddressChoose" class="mesClass">
					<view>填写街道仅用于统计功能</view>
					<view>您只需填写一次</view>
				</view>
				<view @click="areaChoose">
					<input type="text" placeholder-class="adressPlasce" placeholder="点击选择区" disabled="true" :value="area" class="inputClass2" />
				</view>
				<view @click="townAddressChoose">
					<input type="text" placeholder-class="adressPlasce" placeholder="点击选择街道" disabled="true" :value="townAddress"
					 class="inputClass3" />
				</view>

				<!-- <image class="rightSelectImage" src="/static/show_more.png"></image> -->
				<view @click="getAddOrUpdateUser" class="mitBtn">提交</view>
			</view>

			<!-- 区 -->
			<w-picker-new :visible.sync="areaVisible" :value="area" mode="selector" @confirm="areaConfirm" default-type="name"
			 :default-props="defaultProps" :options="areaList" ref="personnelTypeChoose"></w-picker-new>
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
					label: 'name',
					value: 'adcode'
				},
				subdistrictList: [],
				areaList: [],
				areaVisible: false,
				area: '',
				cityCode: '',
				districtCode: ''
			}
		},
		onLoad() {
			that = this
			uni.getSystemInfo({
				success(res) {
					that.screenHeight = res.windowHeight + 44;
				}
			});
			that.getAreaDate()
		},
		onShow() {

		},
		methods: {
			areaConfirm: function(e) {
				that.area = e.result
				console.log('**********************' + JSON.stringify(that.townAddress))
				for (let i = 0; i < that.areaList.length; i++) {
					let item = that.areaList[i]
					if (that.area == item.name) {
						that.districtCode = item.adcode
						that.subdistrictList = item.districts
						break
					}
				}
			},
			onTownAddressConfirm: function(e) {
				that.townAddress = e.result
			},
			areaChoose() {
				// 点击地址触发事件
				if (that.areaList.length > 0) {
					that.areaVisible = true
				} else {
					that.showToast('请先选择区')
				}

			},
			townAddressChoose() {
				// 点击地址触发事件
				if (that.subdistrictList.length > 0) {
					that.townAddressVisible = true
				} else {
					that.getAreaDate()
				}

			},
			getAddOrUpdateUser() { //
				if (that.districtCode.length == 0) {
					that.showToast('请选择区')
					return
				}
				if (that.townAddress.length == 0) {
					that.showToast('请选择街道')
					return
				}

				that.$api.getAddOrUpdateUser({
					cityCode: that.cityCode,
					districtCode: that.districtCode,
					streetName: that.townAddress
				}).then((res) => {
					let resData = res.data
					if (resData.state_code == '400200') {
						that.getUserInfo()

					} else {

					}

				}).catch((err) => {

				})
			},
			getUserInfo() { //
				that.$api.getLoginUserInfo({}).then((res) => {
					let resData = res.data
					if (resData.state_code == '400200') {
						that.$store.commit('setUserInfo', resData.data)
						that.$store.commit('setwxHeaderImage', resData.data.headImage)
						uni.navigateBack({

						})
					} else {

					}

				}).catch((err) => {

				})
			},
			getAreaDate() {
				that.$api.getAreaDate({}).then((res) => {
					let resData = res.data
					if (resData.state_code == '400200') {
						var qd = resData.data[0]

						that.cityCode = qd.adcode
						that.areaList = qd.districts

						// console.log('**********************'+JSON.stringify(that.areaList))
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
		width: 700upx;
		height: 300upx;
		padding: 15upx 15upx;
		/* background-color: #0081FF; */
		position: absolute;
		bottom: 600upx;
		left: 25upx;
	}

	.mesClass {
		position: absolute;
		top: 40upx;
		left: 75upx;
		font-size: 30upx;
		color: #D89720;
	}

	.inputClass2 {
		border: 1upx solid #C9C9C9;
		width: 450upx;
		border-radius: 10upx;
		/* padding: 20upx; */
		height: 60upx;
		color: #666666;
		background-color: #F8F8F8;
		margin: 0upx auto;
		position: absolute;
		bottom: 110upx;
		left: 75upx;
	}

	.inputClass3 {
		border: 1upx solid #C9C9C9;
		width: 450upx;
		border-radius: 10upx;
		/* padding: 5upx; */
		height: 60upx;
		color: #666666;
		background-color: #F8F8F8;
		margin: 0upx auto;
		position: absolute;
		bottom: 40upx;
		left: 75upx;
	}

	.adressPlasce {
		color: #C9C9C9;
		font-size: 30upx;
	}

	.mitBtn {
		position: absolute;
		bottom: 40upx;
		right: 75upx;
		padding: 10upx 20upx;
		border-radius: 10upx;
		background-color: #09BB07;
		color: #FFFFFF;
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
