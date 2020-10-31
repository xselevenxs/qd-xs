<template>
	<view class="conbox">
		<view class="container">
			<image src="/static/images/bg.png" class="cont"></image>
			<view class="header">
				<view class="padding-xl radius shadow bg-white info">
					<view class="cu-avatar xl round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
					<view class="mid">
						<view>昵称：{{nickname}}</view>
						<view>积分：</view>
					</view>
					<view class="padding-sm radius shadow bg-red">
						我的奖品
					</view>
				</view>
			</view>
			<view class="middle">
				<image @click="startAns" src="../../static/startans.png" class="startans"></image>
			</view>


			<view class="ans">答题</view>
			<view @click="drawClick" class="draw">抽奖</view>
		</view>
	</view>
</template>

<script>
	var that
	export default {
		data() {
			return {
				nickname: ''
			}
		},
		onLoad() {
			that = this
		},
		methods: {
			drawClick() {
				// uni.navigateTo({
				// 	url: '../activity/draw'
				// })
				// uni.request({
				//     url: 'http://182.92.91.60:8001/dati/login/login', //仅为示例，并非真实接口地址。
				//     data: {
				//         mobile: '18583309227', 
				//     },
				//     success: (res) => {
				//         console.log('*******************333***'+JSON.stringify(res))
				//         console.log('*******************222***'+JSON.stringify(res.data))
				// 		console.log('*******************666***'+JSON.stringify(res.data.state_msg))
				//     }
				// });
				
				// return
				// config.log('****'+JSON.stringify('33'))
				that.$api.getMobileLogin({
					mobile: '18583309227'
				}).then((res) => {
				that.nickname = res.data.state_msg
					console.log('**********************'+JSON.stringify(res))
				}).catch((err) => {
					
				})
			},
			startAns(){
				uni.navigateTo({
					url: '../ans/ans'
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

	.container,
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
</style>
