<template>
	<view class="container" v-bind:style="{height:screenHeight+'px'}">
		<view class="header">
			<view class="ticket">
				<view class="type">洗车券</view>
				<view class="from">由XXX提供洗车券一张</view>
				<view class="time">有效期xxxx年xx月xx日</view>
				<view class="btn">兑换</view>
			</view>
		</view>
		<view class="adress">
			<view>门店地址：</view>
			<view>XXXX店</view>
			<view>营业时间：8：00-16：00</view>
			<view>使用方式</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight: 0,
			}
		},
		methods: {
			
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
		background-color: #D2F1F0;
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
		position: absolute;
		right: 40upx;
		bottom: 200upx;
		color: #FFFFFF;
		background-color: #39B54A;
		padding: 20upx 40upx;
		border-radius: 5upx;
	}
	.adress {
		padding: 40upx;
	}
</style>
