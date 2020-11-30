<template>
	<view class="content" v-bind:style="{height:screenHeight+'px'}">
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
		<view v-if="isLogo" class="listView">
			<no_data v-if="list.length == 0 && isNoDataShow"></no_data>
			<view v-for="(item,index) in list" :key="index" class="radius shadow bg-white" style="width: 47%;height: 300upx;margin: 10upx;">
				<view class="listItem">
					<view class="itemTop" @click="selectItem(item)">
						<image v-if="item.checked" class="select" src="/static/selected-dh.png"></image>
						<image v-else class="select" src="/static/noselect-dh.png"></image>
					</view>
					<image :src="item.infoA" mode="aspectFit" style="width: 100%;height: 150upx;" @click="imageShow(item.infoA)"></image>
					<view class="itemBottom">
						<view>{{item.name}}</view>
						<view>{{item.num}}票</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="listView">
			<no_data v-if="list.length == 0 && isNoDataShow"></no_data>
			<view v-for="(item,index) in list" :key="index" class="radius shadow bg-white" style="width: 47%;height: 300upx;margin: 10upx;">
				<view class="listItem">
					<view class="itemTop" @click="selectItem(item)">
						<image v-if="item.checked" class="select" src="/static/selected-dh.png"></image>
						<image v-else class="select" src="/static/noselect-dh.png"></image>
					</view>
					<image :src="item.infoA" mode="aspectFit" style="width: 100%;height: 150upx;" @click="imageShow(item.infoA)"></image>
					<view class="itemBottom">
						<view>{{item.name}}</view>
						<view>{{item.num}}票</view>
					</view>
				</view>
			</view>
		</view>

		<view style="width: 100%;height: 100upx;"></view>
		<view style="width: 100%;height: 100upx;">
			<view @click="voteClick" class="voteBtn">投票</view>
		</view>
		<!-- <view style="width: 100%;height: 60upx;background: #F3F3F3;display: flex;align-items: center;justify-content: center;position: fixed;bottom: 55px;"
		 class="textNormalSize" v-if="isBottomLoading">
			<image src="/static/loading.gif" style="width: 40upx;height: 40upx;margin-right: 20upx;"></image>
			<text>加载中...</text>
		</view> -->
	</view>
</template>

<script>
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	import no_data from "../../components/no-data.vue"

	var page = 1;
	var size = 10;
	var isPermitLoadMore = true;
	var isTabChangePermit = true
	var that;
	export default {
		components: {
			uniSection,
			uniSwiperDot,
			no_data
		},
		data() {
			return {
				screenHeight: 0,
				isBottomLoading: false,
				isNoDataShow: false,
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
				isLogo: true,
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
				list: [],
				typeFlag: 1
			}
		},
		onLoad() {
			that = this;
			uni.getSystemInfo({
				success(res) {
					that.screenHeight = res.windowHeight + 44;
				}
			});
		},
		onReady() {
			page = 1;
			that.list = [];
			that.isNoDataShow = true;
			isPermitLoadMore = true;
			that.getFirstData(true);
		},
		onShow() {

		},
		onUnload() {
			page = 1;
			size = 10;
			isPermitLoadMore = true;
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
			page = 1;
			that.list = [];
			that.isNoDataShow = true;
			isPermitLoadMore = true;
			that.getFirstData(true);
		},
		onReachBottom() {
			if (isPermitLoadMore) {
				page++;
				that.isBottomLoading = true;
				that.getFirstData(true);
			} else {
				//that.showToast("没有更多数据了！")
			}
		},
		methods: {
			
			voteClick() {
				var voteId = ''
				for (let i = 0; i < that.list.length; i++) {
					let row = that.list[i]
					if (row.checked && row.checked == true) {
						voteId = row.id
					}
				}
				if (voteId.length == 0) {
					that.showToast('请先选择作品')
					return
				}
				that.$api.getVoteDetailVoteDesign({
					id: voteId
				}).then((res) => {
					let resData = res.data
					if(resData.state_code == '400200'){
						that.showToast('投票成功')
					} else {
						that.showToast(resData.state_msg)
					}

				}).catch((err) => {

			})
		},
		selectItem(item) {
			for (let i = 0; i < that.list.length; i++) {
				let row = that.list[i]
				if (row.id == item.id) {
					that.list[i].checked = true
				} else {
					that.list[i].checked = false
				}
			}
		},
		change(e) {
			this.current = e.detail.current
		},
		noClick: function(res) {
			if (isTabChangePermit) {
				that.noColor = "#0077DD";
				that.okColor = "#6f6f6f";
				that.noLine = "#0077DD";
				that.okLine = "#FFFFFF";
				page = 1;
				isPermitLoadMore = true;
				that.list = [];
				that.typeFlag = 1;
				that.getFirstData(false);
				that.isLogo = true
				isTabChangePermit = false
			}

		},
		okClick: function(res) {
			if (isTabChangePermit) {
				that.noColor = "#6f6f6f";
				that.okColor = "#0077DD";
				that.noLine = "#FFFFFF";
				that.okLine = "#0077DD";
				page = 1;
				isPermitLoadMore = true;
				that.list = [];
				that.typeFlag = 2;
				that.getFirstData(false);
				that.isLogo = false
				isTabChangePermit = false
			}
		},
		imageShow(res) {
			uni.previewImage({
				urls: [res],
			});
		},
		getFirstData(isRefresh) {
			that.isNoDataShow = false;
			that.$api.getVoteDesignList({
				pageNo: page,
				pageSize: size,
				type: that.typeFlag
			}).then((res) => {
				isTabChangePermit = true
				var data = res.data;
				if (data.state_code == 400200) {
					if (data.data) {
						var oldArray = that.list;
						var newArray = data.data;
						if (newArray.length > 0) {
							that.list = oldArray.concat(newArray);
							if (newArray.length != size) {
								isPermitLoadMore = false;
							}
						} else {
							page--;
							isPermitLoadMore = false;
							//that.showToast("没有数据了！")
						}
					} else {
						page--;
						isPermitLoadMore = false;
					}

				} else {
					page--;
					isPermitLoadMore = false;
					that.showToast(data.message)
				}
				that.isNoDataShow = true;
				if (page > 1) {
					that.isNoDataShow = false;
				}
				that.isBottomLoading = false;
				uni.stopPullDownRefresh();
			}).catch((err) => {
				if (page == 1) {
					that.isNoDataShow = true;
					that.list = [];
				}
				isTabChangePermit = true
				that.isBottomLoading = false;
				uni.stopPullDownRefresh();
				that.showToast("查询出错啦，请稍后重试！")
			})
		}
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

	.itemTop {
		width: 100%;
		height: 50upx;
		/* background-color: #09BB07; */
		position: relative;
	}

	.select {
		width: 40upx;
		height: 40upx;
		position: absolute;
		top: 2upx;
		right: 2upx;
	}

	.itemBottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 50upx;
	}

	.voteBtn {
		width: 550upx;
		height: 60upx;
		margin: 0 auto;
		text-align: center;
		line-height: 60upx;
		border-radius: 10upx;
		font-size: 30upx;
		position: fixed;
		bottom: 20upx;
		left: 100upx;
		z-index: 999;
		background-color: rgba(200, 200, 200, 0.6);
	}
</style>
