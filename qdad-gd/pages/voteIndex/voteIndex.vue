<template>
	<view class="content">
		<view class="allback">
			<view class="top">
				<view class="imageView">
					<image class="aniImage" mode="aspectFit" src="../../static/mybjtin.png"></image>
				</view>
			</view>
			<view class="bottom">
				<view class="imageView">
					<image @click="toActivity" mode="aspectFit" class="nowImage" src="../../static/anss.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			toActivity(){
				uni.navigateTo({
					url: '../activity-vote/activity-vote'
				})
			}
		}
	}
</script>

<style>
	.content {
		background-color: #FFFFFF;
		/* width: 100%;
		height: 100%; */
	}

	.allback {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url(../../static/q-bg.jpg);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.top {
		position: relative;
		width: 100%;
		height: 50%;
	}
	.imageView {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 300upx;
		/* text-align: center; */
		display: flex;
		align-items: center;
	}
	.aniImage {
		display: inline-block;
		width: 400upx;
		height: 200upx;
		margin: 0 auto;
		animation-name: mymove;
		animation-duration: 2s;
		animation-iteration-count: infinite;
	}
	@keyframes mymove{
		from{
			/* top: 0upx; */
			width: 300upx;
			height: 150upx;
		}
		to{
			/* top: 100upx; */
			width: 500upx;
			height: 250upx;
		}
	}
	.bottom {
		position: relative;
		width: 100%;
		height: 50%;
	}
	.nowImage {
		width: 600upx;
		height: 200upx;
		margin: 0 auto;
	}
</style>
