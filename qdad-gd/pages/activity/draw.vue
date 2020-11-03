<template>
	<view class="conbox">
		<view class="container">
			<!-- 背景 -->
			<image src="../../static/images/bg.png" class="cont" mode=""></image>
			<image src="../../static/images/caidai.png" class="caidai" mode=""></image>
			<view class="main" style="padding-top: 50upx;">
				<view class="canvas-container">

					<view :animation="animationData" class="canvas-content" id="zhuanpano" style="">
						<view class="canvas-line">
							<view class="canvas-litem" v-for="(item,index) in list" :key="index" :style="{transform:'rotate('+(index * width + width / 2)+'deg)'}"></view>
						</view>

						<view class="canvas-list">
							<view class="canvas-item" :style="{transform: 'rotate('+(index * width)+'deg)', zIndex:index, }" v-for="(iteml,index) in list"
							 :key="index">
								<view class="canvas-item-text" :style="'transform:rotate('+(index )+')'">
									<text class="b" style="font-size: 25upx;">{{iteml.name}}</text>
									<image v-if="iteml.value == '1'" src="../../static/huiweiM40-s.jpg" style="width: 80upx;height: 80upx;margin-top: 20upx;"></image>
									<image v-if="iteml.value == '3'" src="../../static/dianyiing-s.png" style="width: 120upx;height: 80upx;margin-top: 20upx;"></image>
									<image v-if="iteml.value == '5'" src="../../static/baoyang-s.png" style="width: 120upx;height: 80upx;margin-top: 20upx;"></image>
									<image v-if="iteml.value == '6'" src="../../static/healthBH-s.png" style="width: 120upx;height: 80upx;margin-top: 20upx;"></image>
									<!-- <text class="icon-awrad iconfont " :class="iteml.icon"></text> -->
								</view>
							</view>
						</view>
					</view>

					<view @tap="getDrawDetail" class="canvas-btn" v-bind:class="btnDisabled">开始 </view>
				</view>
			</view>
			<view class="btnView">
				<view style="display: flex;flex-direction: row;">
					<view class="mark">已有积分：<span style="color: #0BB20C;">{{userInfo.integral}}</span>分</view>
					<view @click="convertClick" class="convert">兑换</view>
				</view>
				
				<view @click="prizeClick" class="my">我的奖品</view>
			</view>
			<!-- 规则 -->
			<view class="guize" style="margin-top: 30upx;">
				<view class="title">
					规则说明
				</view>
				<view class="g_item">
					1.用户点击大转盘抽奖按钮，每次抽奖需20积分
				</view>
				<view class="g_item">
					2.用户获得的奖品，可在我的奖品里查看
				</view>
			</view>
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
				list: [{
						"name": "华为40 Pro",
						"value": "1",
						icon: 'icondazhe text-danger',
					},
					{
						"name": "韩国多功能四方锅",
						"value": "2",
						icon: 'icondazhe text-danger',
					},
					{
						"name": "电影券",
						"value": "3",
						icon: 'icondazhe text-danger',
					},
					{
						"name": "小型垃圾桶",
						"value": "4",
						icon: 'icondazhe text-danger',
					},
					{
						"name": "兔师傅保养套餐",
						"value": "5",
						icon: 'icondazhe text-danger',
					},
					{
						"name": "兔师傅保护套餐",
						"value": "6",
						icon: 'icondazhe text-danger',
					}
				],
				width: 0,
				animationData: {},
				btnDisabled: 'disabled',
				awardInfo: {}
			}
		},
		onLoad: function() {
			that = this
			// 获取奖品列表
			this.width = 360 / this.list.length
			
		},
		onShow() {
			if(that.userInfo.integral > 20){
				this.btnDisabled = '';
			}else{
				this.btnDisabled = 'disabled';
				that.showToast('积分不足无法抽奖')
			}
		},
		methods: {
			convertClick(){
				uni.navigateTo({
					url: '../convert/convert'
				})
			},
			prizeClick() {
				// uni.navigateTo({
				// 	url: '../submitInfo/submitInfo'
				// })
				uni.navigateTo({
					url: '../myAwardList/myAwardList'
				})
			},
			animation(index, duration) {
				//中奖index
				var list = this.list;
				// var awardIndex = 1 || Math.round(Math.random() * (awardsNum.length - 1)); //随机数
				var runNum = 5; //旋转8周

				// 旋转角度
				this.runDeg = this.runDeg || 0;
				this.runDeg = this.runDeg + (360 - this.runDeg % 360) + (360 * runNum - index * (360 / list.length)) + 1
				//创建动画
				var animationRun = uni.createAnimation({
					duration: duration,
					timingFunction: 'ease'
				})
				animationRun.rotate(this.runDeg).step();
				this.animationData = animationRun.export();
				this.btnDisabled = 'disabled';

			},
			//发起抽奖
			playReward(flag) {
				let index = flag-1,
					duration = 4000
					console.log('*********************index*'+JSON.stringify(index))
				this.animation(index, duration)

				setTimeout(() => {
					// uni.showModal({
					// 	content: this.list[index].isNoPrize ? '抱歉，您未中奖' : '恭喜，中奖'
					// })
					this.btnDisabled = '';
					that.getUserInfo()
					// document.getElementById('zhuanpano').style=''
					uni.showModal({
					    title: '中奖',
					    content: '恭喜您获得'+that.awardInfo.name,
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}, duration + 1000)

			},
			getDrawDetail(){
				that.$api.getProductPrizeStartProductPrize({}).then((res) => {
					let resData = res.data
					if(resData.state_code == '400200'){
						that.awardInfo = resData.data
						let index = resData.data.id
						console.log('*********************resData.id*'+JSON.stringify(index))
						that.playReward(index)
					}else{
						that.showToast(resData.state_msg)
					}
				
				}).catch((err) => {
					
				})
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

		}

	}
</script>
<style scoped>
	.icon-awrad {
		font-size: 50upx !important;
	}

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

	image.caidai {
		position: absolute;
		top: 0;
		left: 0;
		width: 750upx;
		height: 1024upx;
	}


	.header-title>view {
		padding: 8upx 16upx;
		border: 1px solid #d89720;
		color: #d89720;
		font-size: 28upx;
		border-radius: 26upx;
	}

	/* 转盘 */
	.canvas-container {
		margin: 0 auto;
		position: relative;
		width: 600upx;
		height: 600upx;
		background: url(./img/circle.png) no-repeat;
		background-size: cover;
		border-radius: 50%;
	}


	.canvas-content {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
		display: block;
		width: 600upx;
		height: 600upx;
		border-radius: inherit;
		/* background-clip: padding-box; */
		/* background-color: #ffcb3f; */
	}

	.canvas-list {
		position: absolute;
		left: 0;
		top: 0;
		width: inherit;
		height: inherit;
		z-index: 9999;
	}

	.canvas-item {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		color: #e4370e;
		/* text-shadow: 0 1upx 1upx rgba(255, 255, 255, 0.6); */
	}

	.canvas-item-text {
		position: relative;
		display: block;
		padding-top: 46upx;
		margin: 0 auto;
		text-align: center;
		-webkit-transform-origin: 50% 300upx;
		transform-origin: 50% 300upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #FB778B;
	}

	.canvas-item-text text {
		font-size: 30upx;
	}

	/* 分隔线 */
	.canvas-line {
		position: absolute;
		left: 0;
		top: 0;
		width: inherit;
		height: inherit;
		z-index: 99;
	}

	.canvas-litem {
		position: absolute;
		left: 300upx;
		top: 0;
		width: 3upx;
		height: 300upx;
		background-color: rgba(228, 55, 14, 0.4);
		overflow: hidden;
		-webkit-transform-origin: 50% 300upx;
		transform-origin: 50% 300upx;
	}

	/**
* 抽奖按钮
*/
	.canvas-btn {
		position: absolute;
		left: 260upx;
		top: 260upx;
		z-index: 400;
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		color: #f4e9cc;
		background-color: #e44025;
		line-height: 80upx;
		text-align: center;
		font-size: 26upx;
		text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.6);
		box-shadow: 0 3px 5px rgba(0, 0, 0, 0.6);
		text-decoration: none;
	}

	.canvas-btn::after {
		position: absolute;
		display: block;
		content: ' ';
		left: 12upx;
		top: -44upx;
		width: 0;
		height: 0;
		overflow: hidden;
		border-width: 30upx;
		border-style: solid;
		border-color: transparent;
		border-bottom-color: #e44025;
	}

	.canvas-btn.disabled {
		pointer-events: none;
		background: #b07a7b;
		color: #ccc;
	}

	.canvas-btn.disabled::after {
		border-bottom-color: #b07a7b;
	}


	.typecheckbox view {
		border: 1px solid #FF3637;
		background: transparent;
		color: #FF3637;
		display: flex;
		height: 60upx;
		width: 140upx;
		border-radius: 50upx;
		align-items: center;
		justify-content: center;
		display: flex;
		margin-left: 20upx;
	}


	.guize {
		width: 602upx;
		min-height: 300upx;
		display: flex;
		flex-direction: column;
		position: relative;
		z-index: 3;
		background-image: linear-gradient(-180deg, #F48549 0%, #F2642E 100%);
		border: 18upx solid #E4431A;
		border-radius: 16px;
		margin: 0 auto;
		margin-top: -104upx;
		padding: 48upx;
		/* box-sizing: border-box; */
		color: #fff;
	}

	.guize .title {
		text-align: center;
		margin-bottom: 28upx;
	}

	.guize .g_item {
		font-family: PingFang-SC-Medium;
		font-size: 24upx;
		color: #FFFFFF;
		letter-spacing: 0.5px;
		text-align: justify;
		line-height: 20px;
	}

	.myrewards .title {
		font-family: PingFang-SC-Bold;
		font-size: 16px;
		color: #E4431A;
		letter-spacing: 0.57px;
		display: flex;
		padding-top: 36upx;
		justify-content: center;
	}

	.btnView {
		z-index: 999;
		position: relative;
		height: 100upx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		color: #FFFFFF;
		padding: 10upx;
	}

	.mark {
		padding: 20upx 10upx;
		height: 80upx;
		/* background-color: #0081FF; */
		border-radius: 10upx;
		color: #999999;
	}

	.convert {
		/* height: 80upx;
		padding: 20upx 30upx;
		background-color: #8DC63F;
		border-radius: 10upx; */
		padding: 20upx 0upx;
		color: #00B26A;
		/* margin-left: 10upx; */
		/* padding: 10upx; */
		/* border-radius: 5upx; */
	}

	.my {
		height: 80upx;
		padding: 20upx 30upx;
		background-color: #E44025;
		border-radius: 10upx;
	}
</style>
