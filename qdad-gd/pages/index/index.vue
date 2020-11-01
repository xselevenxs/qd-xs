<template>
	<view class="conbox">
		<view class="container">
			<image src="/static/images/bg.png" class="cont"></image>
			<view class="header">
				<view class="padding-xl radius shadow bg-white info">
					<!-- <view class="cu-avatar xl round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view> -->
					<image v-bind:src=wxHeaderImage class="cu-avatar xl round"></image>
					<view class="mid">
						<view>昵称：{{userInfo.userName}}</view>
						<view>积分：{{userInfo.integral}}</view>
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
	import {
		mapState,
		mapMutations
	} from 'vuex';
	var that
	export default {
		computed: {
			...mapState(['userInfo'])
		},
		data() {
			return {
				nickname: '',
				wxHeaderImage:  'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
			}
		},
		onLoad() {
			that = this
			
		},
		onShow() {
				that.getUserInfo()
				if(that.userInfo.headImage){
					that.wxHeaderImage = that.userInfo.headImage
				}
		},
		methods: {
			drawClick() {
				uni.navigateTo({
					url: '../activity/draw'
				})
			},
			startAns(){
				if(that.userInfo.isAnswer == '0' || that.userInfo.isAnswer == 0){
					that.$api.getTikuListRandom({
					}).then((res) => {
						let resData = res.data
						if(resData.state_code == '400200'){
							that.$store.commit('setAnsList',resData.data)
							uni.navigateTo({
								url: '../ans/ans'
							})
						}else{
							that.showToast(resData.msg)
						}
					
					}).catch((err) => {
						
					})
				}else{
					that.showToast('您今日已答题，每人每天仅能答题一次')
				}
				
			},
			getUserInfo(){//
				that.$api.getLoginUserInfo({
				}).then((res) => {
					let resData = res.data
					if(resData.state_code == '400200'){
						that.$store.commit('setUserInfo', resData.data)
					}else{
						
					}
				
				}).catch((err) => {
					
				})
			},
			getMobileLogin(){
				that.$api.getMobileLogin({
					mobile: '17091008732'
				}).then((res) => {
					let resData = res.data
					if(resData.state_code == '400200'){
						uni.setStorage({
							key: "nativeTokenInfo_key",
							data: resData.data.access_token,
						})
						that.$store.commit('setToken',resData.data.access_token)
						that.getUserInfo()
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
