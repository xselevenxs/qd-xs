<template>
	<view class="conbox">
		<view class="container2">
			<!-- <image src="/static/glable-bgconfirm.jpg" class="cont"></image> -->
			<image src="/static/q-bg.jpg" class="cont"></image>
			<view class="header">
				<view class="padding-xl radius shadow bg-white info">
					<!-- <view class="cu-avatar xl round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view> -->
					<image v-bind:src=wxHeaderImage class="cu-avatar xl round"></image>
					<view class="mid">
						<view @click="toSelectAdress">昵称：{{userInfo.userName}}</view>
						<view style="display: flex;flex-direction: row;">
							<view style="padding: 10upx 0upx;">积分：{{userInfo.integral}}</view>
							<view @click="dhClick" style="color: #F29D5D;margin-left: 10upx;padding: 10upx;border-radius: 5upx;">兑换</view>
						</view>
					</view>
					<view @click="myAward" class="padding-sm radius shadow bg-red">
						我的奖品
					</view>
				</view>
			</view>
			<view class="middle">
				<image src="/static/diqiu.png" style="width: 650upx;height: 680upx;position: absolute;left: 50upx;bottom: 100upx;"></image>
				<!-- <image @click="startAns" src="../../static/startAns2.png" class="startans"></image> -->
				<image @click="startAns" src="../../static/anss.png" class="startans"></image>
				<image @click="drawClick" src="../../static/drawss.png" class="draws"></image>
				<view @click="ruleClick" class="bottom">
					活动规则
				</view>
			</view>

			<!-- <view class="ans">答题</view>
			<view @click="drawClick" class="draw">抽奖</view> -->
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
			...mapState(['userInfo','token','wxHeaderImage'])
		},
		data() {
			return {
				screenHeight: 0,
				nickname: '',
				isToAdressSelect: false
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
		onShow() {
			if(that.token){
				that.getUserInfo()
			}
			
		},
		methods: {
			toSelectAdress(){
					uni.navigateTo({
						url: "../selectAdress/selectAdress"
					})
			},
			dhClick(){
				uni.navigateTo({
					url: '../convert/convert'
				})
			},
			myAward(){
				
				uni.navigateTo({
					url: '../myAwardList/myAwardList'
				})
			},
			drawClick() {
				that.getUserInfo()
				//that.getMobileLogin()
				uni.navigateTo({
					url: '../activity/draw'
				})
			},
			ruleClick() {
				uni.navigateTo({
					url: '../rule/rule'
				})
			},
			startAns(){
				// uni.navigateTo({
				// 	url: '../ans/ans'
				// })
				// return
				that.getUserInfo()
				if(that.userInfo.isPutAddress == '0' || that.userInfo.isPutAddress == 0 ){
					uni.navigateTo({
						url: '../selectAdress/selectAdress'
					})
				}else{
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
								that.showToast(resData.state_msg)
							}
						
						}).catch((err) => {
							
						})
					}else{
						that.showToast('您今日已答题，每人每天仅能答题一次')
					}
				}
			},
			getUserInfo(){//
				that.$api.getLoginUserInfo({
				}).then((res) => {
					let resData = res.data
					if(resData.state_code == '400200'){
						that.$store.commit('setUserInfo', resData.data)
						that.$store.commit('setwxHeaderImage',resData.data.headImage)
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
		background-image: url(../../static/mybjtin.png);
		background-repeat: no-repeat;
		background-attachment:fixed;
		/* background-position:center; */
		background-size: 730upx 300upx;
	}

	.mid {
		height: 120upx;
		width: 50%;
		margin-left: 10upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		color: #FFFFFF;
	}
	.middle{
		
		/* background-image: url(../../static/diqiu.png);
		background-repeat: no-repeat;
		background-attachment:fixed;
		background-size: 730upx 300upx; */
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
	.titliecontent{
		width: 400upx;
		height: 136upx;
		position: absolute;
		right: 175upx;
		bottom: 800upx;
	}
	.startans {
		width: 400upx;
		height: 136upx;
		position: absolute;
		right: 175upx;
		bottom: 400upx;
	}
	.draws {
		width: 400upx;
		height: 136upx;
		position: absolute;
		right: 175upx;
		bottom: 200upx;
	}
	.bottom {
		position: absolute;
		bottom: 100upx;
		left: 50%;
		margin-left: -60upx;
		border-bottom: 1px solid #FFFFFF;
		font-size: 30upx;
		color: #FFFFFF;
		text-align:center;
	
	}
</style>
