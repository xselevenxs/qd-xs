<template>
	<view class="content">
		<uni-swiper-dot :info="info" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
			<swiper class="swiper-box" @change="change" autoplay="true" interval="2000" circular="true">
				<swiper-item v-for="(item, index) in info" :key="index">
					<view :class="item.colorClass" class="swiper-item">
						<image class="image" :src="item.url" mode="aspectFill" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view style="display: flex;flex-direction: column; align-items: center;justify-content: space-around;width: 100%;">
			<view style="width: 100%;height: 80upx;display: flex;flex-direction: row;" class="primaryBlackText">
				<view style="width: 50%;height: 100%;display: flex;align-items: center;justify-content: center;" v-bind:style="{color:noColor}"
				 @click="noClick">logo</view>
				<view style="width: 50%;height: 100%;display: flex;align-items: center;justify-content: center;" v-bind:style="{color:okColor}"
				 @click="okClick">吉祥物</view>
			</view>
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="width:50%;height: 1upx;display: inline-block;" v-bind:style="{background:noLine}"></view>
				<view style="width:50%;height: 1upx;display: inline-block;" v-bind:style="{background:okLine}"></view>
			</view>
		</view>
		<view  class="listView">
			<view v-for="(item,index) in list" :key="index" class="radius shadow bg-white" style="width: 47%;height: 250upx;margin: 10upx;" @click="itemClick(item)">
				<view class="listItem" >
					<image :src="item.icon" mode="aspectFit" style="width: 100%;height: 150upx;"></image>
					<view class="itemBottom">
						<view>{{item.name}}</view>
						<view>{{item.count}}票</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	var isTabChangePermit = true
	export default {
		components: {
			uniSection,
			uniSwiperDot
		},
		data() {
			return {
				info: [{
						colorClass: 'uni-bg-red',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
						content: '内容 A'
					},
					{
						colorClass: 'uni-bg-green',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg',
						content: '内容 B'
					},
					{
						colorClass: 'uni-bg-blue',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
						content: '内容 C'
					}
				],
				modeIndex: -1,
				styleIndex: -1,
				current: 0,
				mode: 'dot',
				dotsStyles: {
					backgroundColor: 'rgba(255, 90, 95,0.3)',
					border: '1px rgba(255, 90, 95,0.3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
					selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
				},
				noColor: "#0077DD",
				okColor: "#6F6F6F",
				noLine: "#0077DD",
				okLine: "#FFFFFF",
				list: [{
					id: '1',
					icon: '/static/baoyang-s.png',
					name: '1111',
					count: '8'
				},{
					id: '2',
					icon: '/static/car.jpeg',
					name: '1111',
					count: '7'
				},{
					id: '3',
					icon: '/static/cbd.jpg',
					name: '1111',
					count: '9'
				},{
					id: '4',
					icon: '/static/diqiu.png',
					name: '1111',
					count: '123'
				}]
			}
		},
		onLoad() {},
		onShow() {},
		methods: {
			change(e) {
				this.current = e.detail.current
			},
			noClick: function(res) {
				if (isTabChangePermit) {
					that.noColor = "#0077DD";
					that.okColor = "#6f6f6f";
					that.noLine = "#0077DD";
					that.okLine = "#FFFFFF";
					// that.isOutPatient = true;
					// page = 1;
					// isPermitLoadMore = true;
					// that.list = [];
					// that.getFirstData(false);
					isTabChangePermit = false
				}
			
			},
			okClick: function(res) {
				if (isTabChangePermit) {
					that.noColor = "#6f6f6f";
					that.okColor = "#0077DD";
					that.noLine = "#FFFFFF";
					that.okLine = "#0077DD";
					// that.isOutPatient = false;
					// page = 1;
					// isPermitLoadMore = true;
					// that.list = [];
					// that.getFirstData(false);
					isTabChangePermit = false
				}
			},
		}
	}
</script>

<style>
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #FFFFFF;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 28rpx;
		line-height: inherit;
	}

	.example {
		padding: 0 30rpx 30rpx;
	}

	.example-info {
		padding: 30rpx;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14rpx;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 30rpx;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 30rpx;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 30rpx;
	}

	.example-info-text {
		font-size: 28rpx;
		line-height: 36rpx;
	}


	.example-body {
		flex-direction: column;
		padding: 30rpx;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}


	.swiper-box {
		height: 200px;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #999;
		color: #fff;
	}

	.image {
		width: 750rpx;
		height: 200px;
	}

	.uni-bg-red {
		background-color: #ff5a5f;
	}

	.uni-bg-green {
		background-color: #09bb07;
	}

	.uni-bg-blue {
		background-color: #007aff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 20rpx;
	}

	.example-body-item {

		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 15rpx;
		padding: 15rpx;
		height: 60rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		padding: 0 15rpx;
		/* #endif */
		flex: 1;
		border-color: #e5e5e5;
		border-style: solid;
		border-width: 1px;
		border-radius: 5px;
	}

	.example-body-item-text {
		font-size: 28rpx;
		color: #333;
	}

	.example-body-dots {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50px;
		background-color: #333333;
		margin-left: 10rpx;
	}

	.active {
		border-style: solid;
		border-color: #007aff;
		border-width: 1px;
	}
	.listView {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		background-color: #f3f3f3;
		width: 100%;
	}
	.listItem {
		display: flex;
		flex-direction: column;
		align-items: center; 
		justify-content: space-between;
		width: 100%;
		height: 100%;
		padding: 15upx 15upx;
		position: relative;
	}
	.itemBottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 50upx;
	}
</style>
