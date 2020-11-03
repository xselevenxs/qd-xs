<template>
	<view class="container" v-bind:style="{height:screenHeight+'px'}">
		<view class="header">
			<view class="ticket">
				<!-- <view class="type">兔师傅健康保护套餐</view>
				<view class="from">由兔师傅提供健康保护券券一张</view>
				<view class="time">有效期：2021年01月31日</view>
				<view @click="convertClick" class="btn">兑换</view> -->
				<image src="../../static/baohu-m.png" style="width: 100%;height: 100%;"></image>
			</view>
		</view>
		<view @click="convertClick" class="btn">兑换</view>
		<view class="adress">
			<view>门店地址：</view>
			<view>XXXX店</view>
			<view>营业时间：8：00-16：00</view>
			<view>使用方式</view>
		</view>
	</view>
</template>

<script>
	var that
	export default {
		data() {
			return {
				screenHeight: 0,
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
		methods: {
			convertClick(){
				that.$api.getAddAward({
					productId: '1'
				}).then((res) => {
					let resData = res.data
					if(resData.state_code == '400200'){
						that.showToast('兑换成功，请到我的奖品查看')
					}else{
						that.showToast(resData.state_msg)
					}
				
				}).catch((err) => {
					
				})
			}
		}
	}
</script>

<style>
.header {
		width: 100%;
		height: 400upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
	}
	.ticket {
		width: 700upx;
		height: 370upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
	}
	.type {
		position: absolute;
		left: 40upx;
		top: 30upx;
		color: #DD514C;
		font-size: 45upx;
	}
	.from {
		position: absolute;
		left: 20upx;
		bottom: 100upx;
		color: #999999;
		font-size: 35upx;
	}
	.time {
		position: absolute;
		left: 20upx;
		bottom: 20upx;
		color: #999999;
	}
	.btn {
		background-color: #39B54A;
		padding: 20upx 40upx;
		border-radius: 5upx;
		width: 500upx;
		color: #FFFFFF;
		margin: 30upx auto;
		text-align: center;
	}
	.adress {
		padding: 40upx;
	}
</style>
