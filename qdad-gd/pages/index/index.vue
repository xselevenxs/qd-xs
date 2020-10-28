<template>
	<view class="container">
		<image src="/static/images/bg.png" class="backView"></image>
		<view class="header">
			<view class="padding-xl radius shadow bg-white info">
				<view class="cu-avatar xl round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
				<view class="mid">
					<view>昵称：</view>
					<view>积分：</view>
				</view>
				<view class="padding-sm radius shadow bg-red">
					我的奖品
				</view>
			</view>
		</view>
		<view class="middle">
			<image src="../../static/startans.png" class="startans"></image>
		</view>
		
		
		<view class="ans">答题</view>
		<view @click="drawClick" class="draw">抽奖</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {
			drawClick(){
				uni.navigateTo({
					url: '../activity/draw'
				})
			}
		}
	}
</script>

<style>
	.container {
		width: 100%;
		height: 100%;
		font-size: 30upx;
	}
	image.backView {
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
	.mid{
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
</style>
