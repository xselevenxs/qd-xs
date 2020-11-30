<template>
	<view class="content">
		<view class="allback">
			<view class="top">
				<view class="imageView">
					<image class="aniImage" mode="aspectFit" src="../../static/startans.png"></image>
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
	var that
	export default {
		data() {
			return {

			}
		},
		onLoad() {
				that = this
		},
		onShow() {
			that.getMobileLogin()
		},
		methods: {
			toActivity(){
				uni.navigateTo({
					url: '../activity-vote/activity-vote'
				})
			},
			getMobileLogin(){
				that.$api.getMobileLogin({
					mobile: '13011112222'
				}).then((res) => {
					let resData = res.data
					if(resData.state_code == '400200'){
						uni.setStorage({
							key: "nativeTokenInfo_key",
							data: resData.data.access_token,
						})
						that.$store.commit('setToken',resData.data.access_token)
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
			top: 0upx;
			width: 300upx;
			height: 150upx;
		}
		to{
			top: 100upx;
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
