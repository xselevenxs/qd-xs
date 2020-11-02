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
				<input @input="phoneInput" :value="info.phone" class="inputClass" placeholder="请输入电话" />
			</view>
			<view class="itemBackView">
				<view class="leftClass">地址</view>
				<input @input="adressInput" :value="info.adress" class="inputClass" placeholder="请输入地址" />
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
	export default {
		computed: {
			...mapState(['userInfo'])
		},
		data() {
			return {
				goodsName: 'iphone12',
				info: {
					name: '',
					phone: '',
					adress: ''
				}
			}
		},
		methods: {
			nameInput: function(e) {
				that.registerInfo.name = e.detail.value
			},
			phoneInput: function(e) {
				that.registerInfo.name = e.detail.value
			},
			adressInput: function(e) {
				that.registerInfo.name = e.detail.value
			},
			onSubmit() {
				if (that.info.name.length == 0) {
					that.showToast('请输入姓名')
					return
				}
				if (that.info.phone.length == 0) {
					that.showToast('请输入电话')
					return
				}
				if (that.info.adress.length == 0) {
					that.showToast('请输入地址')
					return
				}
				
				that.$api.getAwardList(that.info).then((res) => {
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
