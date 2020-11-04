<template>
	<view class="conbox">
		<view class="container2">
			<image src="/static/rule.jpeg" class="cont"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
</style>
