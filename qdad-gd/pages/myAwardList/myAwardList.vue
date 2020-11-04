<template>
	<view class="container" v-bind:style="{height:screenHeight+'px'}">
		<view v-for="(item,index) in awardList" :key="index" >
			<view class="item" @click="itemClick(item)">
				<image class="img" v-if="item.productId == '1'&&item.productType == '2'" mode="aspectFit" src="/static/huiweiM40-s.jpg"></image>
				<image class="img" v-if="item.productId == '1'&&item.productType == '1'" mode="aspectFit" src="/static/healthBH-s.png"></image>
				<image class="img" v-if="item.productId == '2'" mode="aspectFit" src="/static/huiweiM40-s.jpeg"></image>
				<image class="img" v-if="item.productId == '3'" mode="aspectFit" src="/static/dianyiing-s.png"></image>
				<image class="img" v-if="item.productId == '4'" mode="aspectFit" src="/static/daijinquan.jpg"></image>
				<image class="img" v-if="item.productId == '5'" mode="aspectFit" src="/static/baoyang-s.png"></image>
				<image class="img" v-if="item.productId == '6'" mode="aspectFit" src="/static/healthBH-s.png"></image>
				<view class="middle">
					<view class="type">{{item.productName}}</view>
					<view v-if="item.productType == 1">有效期：2021-01-31</view>
					<view v-else>中奖时间：{{item.createTime}}</view>
				</view>
				
				<view class="state" style="color: #0081FF;" v-if="item.productType == '1'&&item.state == '0'">未使用</view>
				<view class="state" style="color: #C0C0C0;" v-if="item.productType == '1'&&item.state == '1'">已使用</view>
				<view class="state" style="color: #DD514C;" v-if="item.productType == '2'&&item.hasAddress == '0'">未提交</view>
				<view class="state" style="color: #D89720;" v-if="item.productType == '2'&&item.hasAddress == '1'">已提交</view>
			</view>
		</view>
		<view  class="connect">客服电话：0532—85702909</view>
	</view>
	
</template>

<script>
	var that
	export default {
		data() {
			return {
				screenHeight: 0,
				awardList: []
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
		onReady() {
			
		},
		onShow() {
			that.getMyAwards()
		},
		methods: {
			itemClick(item){
				if(item.productType == '1'){
					if(item.state == '0'){
						uni.navigateTo({
							url: '../virtualGoodsDetail/virtualGoodsDetail?awardId=' + item.id
						})
					}else{
						that.showToast('该奖品您已使用')
					}
					
				}else{
					if(item.hasAddress == '0'){
						uni.navigateTo({
							url: '../submitInfo/submitInfo?awardId=' + item.id+'&name=' + item.productName+'&typeId=' + item.productId
						})
					}else{
						that.showToast('您的奖品我们将在3-5个工作日安排寄出')
					}
					
				}
					
			},
			getMyAwards(){
				that.$api.getAwardList({pageSize:'50'}).then((res) => {
					let resData = res.data
					if(resData.state_code == '400200'){
						that.awardList = resData.data
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
.item{
	width: 720upx;
	height: 200upx;
	background-color: #E7EBED;
	margin: 15upx;
	border-radius: 15upx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
.img{
	width: 150upx;
	height: 150upx;
	margin: 25upx 15upx;
	border-radius: 10upx;
}
.middle{
	height: 150upx;
	width: 450upx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.type{
	font-size: 35upx;
	color: #09BB07;
}
.state{
	width: 150upx;
	font-size: 30upx;
	text-align: right;
	padding-right: 30upx;
}
.connect {
	text-align: center;
	/* position: absolute;
	bottom: 30upx; */
	width: 100%;
}
</style>
