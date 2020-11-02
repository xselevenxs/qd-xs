<template>
	<view class="container" v-bind:style="{height:screenHeight+'px'}">
		<view class="title">
			<view class="name">虚拟券</view>
			<view class="invalTime">有效期：2020-09-09</view>
		</view>
		<view class="qrBack">
			<tki-qrcode v-if="ifShow" cid="qrcode2" ref="qrcode2" :val="qrContent" :size="size" :onval="onval" :loadMake="loadMake" :usingComponents="true" />
		</view>
		
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				qrContent: 'gGf1th4n4M0z2cvujUUmZg==',
				size: 400, // 二维码大小
				unit: 'upx', // 单位
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				ifShow: true
			}
		},
		methods: {
			
		}
	}
</script>

<style>
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
