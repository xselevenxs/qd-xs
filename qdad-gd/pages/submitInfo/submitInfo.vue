<template>
	<view class="container" v-bind:style="{height:screenHeight+'px'}">
		<image src="../../static/car.jpeg" class="img"></image>
		<view class="mesBack">
			<text>恭喜{{userInfo.userName}}获得<span class="goods">{{goodsName}}</span>请填写个人信息，奖品会在3-5个工作日内安排寄出，<span class="nosubmit">未填写个人信息代表您放弃领奖。</span></text>
		</view>
		<view>
			<view class="itemBackView">
				<view class="leftClass">姓名</view>
				<input @input="nameInput" :value="info.name" class="inputClass" placeholder="请输入姓名" />
			</view>
			<view class="itemBackView">
				<view class="leftClass">电话</view>
				<input @input="phoneInput" :value="info.tel" class="inputClass" placeholder="请输入电话" />
			</view>
			<view class="itemBackView">
				<view class="leftClass">地址</view>
				<input @input="adressInput" :value="info.address" class="inputClass" placeholder="请输入地址" />
			</view>
		</view>
		<view class="primaryText submitBtn" @click="onSubmit">提交</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	var that
	var awardId
	export default {
		computed: {
			...mapState(['userInfo'])
		},
		data() {
			return {
				screenHeight: 0,
				goodsName: '',
				info: {
					name: '',
					tel: '',
					address: '',
					awardId: ''
				}
			}
		},
		onLoad(option) {
			that = this
			uni.getSystemInfo({
				success(res) {
					that.screenHeight = res.windowHeight + 44;
				}
			});
			awardId = option.awardId
			that.info.awardId = option.awardId
			that.goodsName = option.name
		},
		methods: {
			nameInput: function(e) {
				that.info.name = e.detail.value
			},
			phoneInput: function(e) {
				that.info.tel = e.detail.value
			},
			adressInput: function(e) {
				that.info.address = e.detail.value
			},
			onSubmit() {
				if (that.info.name.length == 0) {
					that.showToast('请输入姓名')
					return
				}
				if (that.info.tel.length == 0) {
					that.showToast('请输入电话')
					return
				}
				if (that.info.address.length == 0) {
					that.showToast('请输入地址')
					return
				}
				
				that.$api.getAddOrUpdateAddress(that.info).then((res) => {
					let resData = res.data
					if(resData.state_code == '400200'){
						that.showToast('提交成功')
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
	.img {
		width: 100%;
		height: 400upx;
	}

	.mesBack {
		width: 100%;
		padding: 20upx 40upx;
		background-color: #FFFFFF;
		color: #F29D5D;
	}

	.goods {
		color: #007AFF;
		font-size: 35upx;
	}

	.nosubmit {
		color: #E4370E;
	}

	.itemBackView {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		padding: 15upx 15upx;
		background-color: #FFFFFF;
	}

	.itemBackView2 {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 15upx 15upx;
	}

	.leftClass {
		margin-right: 10upx;
		width: 20%;
	}

	.inputClass {
		border-bottom: 1upx solid #C9C9C9;
		width: 75%;
		border-radius: 10upx;
		padding: 10upx;
		height: 60upx;
	}
	.submitBtn {
		background: #0BB20C;
		color: white;
		width: 45%;
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 40upx;
		margin: 50upx auto;
	}
</style>
