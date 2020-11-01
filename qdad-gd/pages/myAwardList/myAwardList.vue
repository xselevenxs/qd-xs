<template>
	<view class="container">
		<view v-for="(item,index) in awardList" :key="index" >
			<view class="item">
				<image class="img" v-if="item.type == '1'" mode="aspectFit" src="/static/daijinquan.jpg"></image>
				<image class="img" v-if="item.type == '2'" mode="aspectFit" src="../../static/iphone12.jpeg"></image>
				<image class="img" v-if="item.type == '3'" mode="aspectFit" src="../../static/lipinquan.jpg"></image>
				<view class="middle">
					<view class="type">虚拟券</view>
					<view>有效期；2020-09-09</view>
				</view>
				
				<view class="state" v-if="item.type == '0'">未使用</view>
				<view class="state" v-if="item.type == '1'">已使用</view>
				<view class="state" v-if="item.type == '2'">已提交</view>
				<view class="state" v-if="item.type == '3'">未提交</view>
			</view>
		</view>
		<view  style="text-align: center;margin-top: 50upx;">客服电话：400900998</view>
	</view>
	
</template>

<script>
	var that
	export default {
		data() {
			return {
				awardList: [{
					type: '1'
				},{
					type: '2'
				},{
					type: '3'
				}]
			}
		},
		onLoad() {
			that = this
		},
		onReady() {
			that.getMyAwards()
		},
		methods: {
			getMyAwards(){
				that.$api.getAwardList({
				}).then((res) => {
					let resData = res.data
					if(resData.state_code == '400200'){
						
					}else{
						that.showToast(resData.msg)
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
	width: 300upx;
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
}
</style>
