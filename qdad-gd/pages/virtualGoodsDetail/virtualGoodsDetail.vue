<template>
	<view class="container" v-bind:style="{height:screenHeight+'px'}">
		<view class="header1">
			<view class="ticket">
				<image src="/static/tsfbhtt.png"  mode="aspectFit" style="width: 100%;height: 100%"></image>
			</view>
		</view>
		<view class="qrBack">
			<tki-qrcode v-if="ifShow" cid="qrcode2" ref="qrcode2" :val="qrContent" :size="size" :onval="onval" :loadMake="loadMake"
			 :usingComponents="true" />
		</view>
		<view class="header" style="margin-top: 30upx;">
			<view class="ticket">
				<image src="/static/mddz2.png" style="width: 100%;height: 100%;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	var that
	var awardId
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				screenHeight: 0,
				qrContent: 'aa==',
				size: 400, // 二维码大小
				unit: 'upx', // 单位
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				ifShow: false
			}
		},
		onLoad(option) {
			that = this
			uni.getSystemInfo({
				success(res) {
					that.screenHeight = res.windowHeight + 44;
				}
			});
			awardId = option.awardId
			that.getDetail()
		},
		methods: { //
			getDetail() {
				that.$api.getAwardById({
					id: awardId
				}).then((res) => {
					let resData = res.data
					if (resData.state_code == '400200') {
						that.qrContent = resData.data.qrcode
						that.ifShow = true
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
	.header1{
		width: 100%;
		height: 300upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
	}
	.header {
		width: 100%;
		height: 400upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
	}

	.ticket {
		width: 600upx;
		height: 300upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
	}

	.title {
		width: 100%;
		height: 200upx;
		background-color: #FFFFFF;
		padding: 30upx 50upx;
	}

	.name {
		color: #00B26A;
		font-size: 35upx;
	}

	.invalTime {
		margin-top: 40upx;
	}

	.qrBack {
		width: 100%;
		height: 500upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
	}
</style>
