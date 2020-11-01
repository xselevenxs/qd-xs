<template>
	<view>
		<view id="top-box" class="cu-bar bg-white solid-bottom">
			<view class="action text-black">
				<text v-if="currentType===1">判断题</text>
				<text v-else-if="currentType===2">单选题</text>
				<text v-else-if="currentType===3">多选题</text>
				<text v-else-if="currentType===4">填空题</text>
				<text v-else-if="currentType===5">问答题</text>
			</view>
			<view class="timeCount">{{timecount}}秒</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @tap="showCardModal" data-target="modalCard">答题卡</button>
			</view>
		</view>
		<view class="cu-modal" :class="modalCard=='modalCard'?'show':''" @tap="hideCardModal">
			<view class="cu-dialog" @tap.stop>

				<scroll-view class="page padding" :scroll-y=true :style="{'height':swiperHeight}">
					<view class="cu-bar solid-bottom">
						<view class="action">
							<text class="cuIcon-title text-red"></text>答题卡
						</view>
					</view>
					<view class="grid col-5 ">
						<view class="margin-tb-sm text-center" v-for="(subject,index) in subjectList" :key="index">
							<button class="cu-btn round" :class="[subject.userAnswer.length===0?'line-grey':'bg-red']" @click="AppointedSubject(index)">{{index+1}}</button>
						</view>
					</view>

				</scroll-view>
			</view>
		</view>
		<view class="cu-modal padding " :class="modalError=='modalError'?'show':''" @tap="hideErrorModal">
			<view class="cu-dialog bg-white" @tap.stop>

				<view class="cu-bar solid-bottom ">
					<view class="action">
						<text class="cuIcon-title text-red"></text>试题纠错
					</view>
				</view>

				<radio-group class="block">
					<view class="cu-list menu text-left">
						<view class="cu-item cu-item-error" v-for="error in errorList">
							<radio :value="error"></radio>
							<view class="title text-black margin-left">{{error}}</view>
						</view>
					</view>
				</radio-group>

				<view class="padding flex flex-direction ">
					<button class="cu-btn bg-red margin-tb-sm lg" @click="SubmitError">提 交</button>
				</view>
			</view>
		</view>
		<form>
			<swiper :current="subjectIndex" class="swiper-box" disable-touch="true" @change="SwiperChange" :style="{'height':swiperHeight}">
				<swiper-item v-for="(subject,index) in subjectList">

					<view v-if="index-subjectIndex>=-1&&index-subjectIndex<=1">

						<view class="cu-bar bg-white solid-bottom">
							<view class="action text-black">
								<text class="cuIcon-title text-red"></text>{{subject.title}}
							</view>
						</view>
						<view>

							<radio-group class="block" @change="RadioboxChange" v-if="subject.type===1||subject.type===2">
								<view class="cu-form-group" v-for="option in subject.optionList">
									<radio :value="option.id" :checked="subject.userAnswer.indexOf(option.id) > -1?true:false"></radio>
									<view class="title text-black">{{option.id}}.{{option.content}}</view>
								</view>
							</radio-group>

							<checkbox-group class="block" @change="CheckboxChange" v-else-if="subject.type===3">
								<view class="cu-form-group" v-for="option in subject.optionList">
									<checkbox :value="option.id" :class="subject.userAnswer.indexOf(option.id) > -1?'checked':''" :checked="subject.userAnswer.indexOf(option.id) > -1?true:false"></checkbox>
									<view class="title  text-black">{{option.id}}.{{option.content}}</view>
								</view>
							</checkbox-group>

							<view v-else-if="subject.type===4">
								<view class="cu-form-group solid-bottom">
									<view class="title  text-black">
										答：
									</view>
									<input placeholder="文本输入框" name="input" v-model="subject.userAnswer" @blur="textInput"></input>
								</view>
							</view>

							<view v-else-if="subject.type===5">
								<view class="cu-bar cu-bar-title bg-white margin-top">
									<view class="action  text-black">
										答：
									</view>
								</view>
								<view class="cu-form-group solid margin">
									<textarea maxlength="-1" @blur="textInput" v-model="subject.userAnswer" placeholder="多行文本输入框"></textarea>
								</view>
							</view>

						</view>

						<view v-show="subject.showAnswer" class="margin-top solid-top">
							<view class="cu-bar">
								<view class="action  text-grey">
									<text>正确答案：</text>
									<text class="solid-bottom  padding-left text-green">{{subject.answer}}</text>
								</view>
							</view>
							<view class="cu-bar cu-bar-title">
								<view class="action  text-grey">
									<text>解析：</text>
								</view>
							</view>
							<view class="text-content padding  text-grey">
								{{subject.explain}}
							</view>
						</view>

					</view>
				</swiper-item>
			</swiper>
		</form>
		<view id="foot-box" class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="MoveSubject(-1)">
				<view class="cuIcon-cu-image">
					<text class="lg cuIcon-back text-gray"></text>
				</view>
				<view class="text-gray">上一题</view>
			</view>
			<view class="action" @click="MoveSubject(1)">
				<view class="cuIcon-cu-image">
					<text class="lg text-gray cuIcon-right"></text>
				</view>
				<view class="text-gray">下一题</view>
			</view>

			<view class="action" @click="FavorSubject">
				<view class="cuIcon-cu-image">
					<text class="lg cuIcon-favor" :class="[userFavor?'text-red':'text-gray']"></text>
				</view>
				<view :class="[userFavor?'text-red':'text-gray']">收藏</view>
			</view>

			<view class="action" @click="ShowAnswerChange">
				<view class="cuIcon-cu-image">
					<text class="lg text-gray cuIcon-question"></text>
				</view>
				<view class="text-gray">解答</view>
			</view>
			<view class="action" @tap="showErrorModal" data-target="modalError">
				<view class="cuIcon-cu-image">
					<text class="lg text-gray cuIcon-warn"></text>
				</view>
				<view class="text-gray">纠错</view>
			</view>

		</view>

	</view>
</template>

<script>
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		computed: {
			...mapState(['ansList'])
		},
		data() {
			return {
				curIntervalId: '',
				timecount: 10,
				userFavor: false, //是否已收藏
				currentType: 0, //当前题型
				subjectIndex: 0, //跳转索引
				autoShowAnswer: true, //答错是否显答案
				autoRadioNext: false, //判断题、单项题，自动移下一题
				swiperHeight: '800px', //
				title: '答题',
				subjectList222: [{
						"title": "水是液体？",
						"type": 1,
						"optionList": [{
							"id": "A",
							"content": "对"
						}, {
							"id": "B",
							"content": "错"
						}],
						"answer": "A",
						"userAnswer": "",
						"userFavor": false,
						"explain": "难到是固体不成？"
					},
					{
						"title": "电流分有？",
						"type": 2,
						"optionList": [{
							"id": "A",
							"content": "直流"
						}, {
							"id": "B",
							"content": "交流"
						}, {
							"id": "C",
							"content": "直流和交流"
						}],
						"answer": "C",
						"userAnswer": "",
						"userFavor": false,
						"explain": "科技学依据"
					},
					{
						"title": "酸菜鱼的味道？",
						"type": 3,
						"optionList": [{
							"id": "A",
							"content": "咸味"
						}, {
							"id": "B",
							"content": "辣味"
						}, {
							"id": "C",
							"content": "甜味"
						}, {
							"id": "D",
							"content": "酸味"
						}],
						"answer": "A,B,D",
						"userAnswer": "",
						"userFavor": false,
						"explain": "你怎么想都行，要的就是这个味，答案只能选A,B,D"
					},
					{
						"title": "床前（____）光，疑是地上霜。",
						"type": 4,
						"optionList": [{
							"id": "",
							"content": ""
						}],
						"answer": "明月",
						"userAnswer": "",
						"userFavor": false,
						"explain": "问答题没有选项，无法做答，且不参与计分"
					},
					{
						"title": "什么美国要限制华为？",
						"type": 5,
						"optionList": [{
							"id": "",
							"content": ""
						}],
						"answer": "",
						"userAnswer": "",
						"userFavor": false,
						"explain": "问答题没有选项，无法做答，且不参与计分"
					}
				],
				subjectList: [{
					"title": "新建和改造的生活垃圾收集站应具备厨余垃圾和其他垃圾分类暂存及转运功能。鼓励有条件的增加可回收物和有害垃圾分类暂存及转运功能，并符合管理规范要求。（）",
					"type": 1,
					"answer": "A",
					"userAnswer": null,
					"userFavor": false,
					"explain": null,
					"optionList": [{
						"id": "A",
						"content": "正确"
					}, {
						"id": "B",
						"content": "错误"
					}]
				}, {
					"title": "单位和个人应当减少使用或者按照规定不使用（），优先采购（）产品。",
					"type": 2,
					"answer": "A",
					"userAnswer": null,
					"userFavor": false,
					"explain": null,
					"optionList": [{
						"id": "A",
						"content": "A、一次性用品，可重复使用和再利用"
					}, {
						"id": "B",
						"content": "B、石油化工用品，纸质和纯天然"
					}, {
						"id": "C",
						"content": "C、高能耗产品，低能耗"
					}, {
						"id": "D",
						"content": "D、精致包装产品，简易包装"
					}, {
						"id": "E",
						"content": null
					}]
				}, {
					"title": "易破损或有尖锐边角的可回收物，应包裹后投放。（）",
					"type": 1,
					"answer": "A",
					"userAnswer": null,
					"userFavor": false,
					"explain": null,
					"optionList": [{
						"id": "A",
						"content": "正确"
					}, {
						"id": "B",
						"content": "错误"
					}]
				}, {
					"title": "有害垃圾不包括以下哪类：（）",
					"type": 2,
					"answer": "D",
					"userAnswer": null,
					"userFavor": false,
					"explain": null,
					"optionList": [{
						"id": "A",
						"content": "A废相纸类：X光片、相片底片"
					}, {
						"id": "B",
						"content": "B废杀虫剂类：杀虫喷雾罐、消毒剂、老鼠药、农药及其包装物"
					}, {
						"id": "C",
						"content": "C废油漆类：废油漆桶、染发剂壳、过期的指甲油、洗甲水"
					}, {
						"id": "D",
						"content": "D织物：衣物、箱包、床上用品、窗帘等"
					}, {
						"id": "E",
						"content": null
					}]
				}, {
					"title": "公共机构办公场所应及时清运装修和大件垃圾，宜设置装修垃圾、大件垃圾等临时堆放点，临时堆放点应设置在不妨碍交通安全、便于管理的区域，面积宜不少于",
					"type": 1,
					"answer": "A",
					"userAnswer": null,
					"userFavor": false,
					"explain": null,
					"optionList": [{
						"id": "A",
						"content": "正确"
					}, {
						"id": "B",
						"content": "错误"
					}]
				}, {
					"title": "猪羊牛等动物大块骨头属()。",
					"type": 2,
					"answer": "B",
					"userAnswer": null,
					"userFavor": false,
					"explain": null,
					"optionList": [{
						"id": "A",
						"content": "A、厨余垃圾"
					}, {
						"id": "B",
						"content": "B、其他垃圾　"
					}, {
						"id": "C",
						"content": "C、可回收物"
					}, {
						"id": "D",
						"content": "D、有害垃圾"
					}, {
						"id": "E",
						"content": null
					}]
				}, {
					"title": "家庭日常生活中打碎的陶瓷碗碟属于可回收物。（）",
					"type": 1,
					"answer": "B",
					"userAnswer": null,
					"userFavor": false,
					"explain": null,
					"optionList": [{
						"id": "A",
						"content": "正确"
					}, {
						"id": "B",
						"content": "错误"
					}]
				}, {
					"title": "我市生活垃圾分类工作遵循（）的原则。",
					"type": 2,
					"answer": "D",
					"userAnswer": null,
					"userFavor": false,
					"explain": null,
					"optionList": [{
						"id": "A",
						"content": "A.垃圾分类举手之劳，共建和谐美好青岛"
					}, {
						"id": "B",
						"content": "B.垃圾科学分类，文明你我同行"
					}, {
						"id": "C",
						"content": "C.垃圾分类人人参与，共创岛城生态文明"
					}, {
						"id": "D",
						"content": "D.政府推动、全民参与、城乡统筹、系统推进"
					}, {
						"id": "E",
						"content": null
					}]
				}, {
					"title": "厨余垃圾不包括以下哪类：（）",
					"type": 2,
					"answer": "C",
					"userAnswer": null,
					"userFavor": false,
					"explain": null,
					"optionList": [{
						"id": "A",
						"content": "A废弃食品调料"
					}, {
						"id": "B",
						"content": "B 剩菜剩饭"
					}, {
						"id": "C",
						"content": "C废杀虫剂类"
					}, {
						"id": "D",
						"content": "D 瓜皮果核"
					}, {
						"id": "E",
						"content": null
					}]
				}, {
					"title": "未采取集中收集方式的区域内，公共机构应合理设置可回收物和有害垃圾收集点，有害垃圾收集点应设置在有人看管的区域。（）",
					"type": 1,
					"answer": "A",
					"userAnswer": null,
					"userFavor": false,
					"explain": null,
					"optionList": [{
						"id": "A",
						"content": "正确"
					}, {
						"id": "B",
						"content": "错误"
					}]
				}],
				modalCard: null, //显示答题卡
				modalError: null, //纠错卡
				errorList: ['题目不完整', '答案不正确', '含有错别字', '图片不存在', '解析不完整', '其他错误']
			}
		},
		onReady() {

			var tempHeight = 800;
			var _me = this;
			uni.getSystemInfo({
				//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高                
				success: function(res) {
					// console.log(res.model);                    
					// console.log(res.pixelRatio);                    
					// console.log(res.windowWidth);                    
					// console.log(res.windowHeight);
					// //这里是手机屏幕高度                    
					// console.log(res.language);                    
					// console.log(res.version);                    
					// console.log(res.platform);                    
					tempHeight = res.windowHeight;
					console.log("屏幕可用高度 " + tempHeight);

					uni.createSelectorQuery().select("#top-box").fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						tempHeight -= data.height;
						console.log("减掉顶部后的高度 " + tempHeight);

						uni.createSelectorQuery().select("#foot-box").fields({
							size: true,
							scrollOffset: true
						}, (data) => {
							tempHeight -= data.height;
							console.log("减掉底部后的高度 " + tempHeight);
							_me.swiperHeight = tempHeight + 'px';
							console.log("滑屏最后高度 " + _me.swiperHeight);
						}).exec();

					}).exec();
				}
			});
			// that.autoTimesNext()
		},
		onLoad() {
			that = this
			console.log('**********************' + JSON.stringify(that.ansList))
			// this.subjectList = that.ansList
			console.log('*********************this.subjectList*' + JSON.stringify(this.subjectList))
			this.currentType = this.subjectList[0].type;


			//添加用户显示答案字段
			for (var i = 0; i < this.subjectList.length; i++) {
				this.$set(this.subjectList[i], "showAnswer", false);
			}

		},
		onUnload() {
			if (that.curIntervalId) {
				clearInterval(that.curIntervalId)
			}
		},
		methods: {
			showCardModal: function(e) {
				this.modalCard = e.currentTarget.dataset.target
			},
			hideCardModal: function(e) {
				this.modalCard = null
			},
			showErrorModal: function(e) {
				this.modalError = e.currentTarget.dataset.target
			},
			hideErrorModal: function(e) {
				this.modalError = null
			},
			SwiperChange: function(e) { //滑动事件

				let index = e.target.current;

				if (index != undefined) {
					this.subjectIndex = index;
					this.currentType = this.subjectList[index].type;
					this.userFavor = this.subjectList[index].userFavor;
				}
			},
			RadioboxChange: function(e) { //单选选中

				var items = this.subjectList[this.subjectIndex].optionList;
				var values = e.detail.value;
				this.subjectList[this.subjectIndex].userAnswer = values;
				if (this.autoRadioNext && this.subjectIndex < this.subjectList.length - 1) {
					this.subjectIndex += 1;
				};

			},
			CheckboxChange: function(e) { //复选选中

				var items = this.subjectList[this.subjectIndex].optionList;
				var values = e.detail.value;
				this.subjectList[this.subjectIndex].userAnswer = "";
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].id == values[j]) {

							this.subjectList[this.subjectIndex].userAnswer += items[i].id;
							break
						}
					}
				}
			},
			textInput: function(e) { //填空题

				this.subjectList[this.subjectIndex].userAnswer = e.detail.value;

			},
			ShowAnswerChange: function(e) { //显示答案

				if (this.subjectList[this.subjectIndex].showAnswer) {
					this.subjectList[this.subjectIndex].showAnswer = false;
				} else {

					this.subjectList[this.subjectIndex].showAnswer = true;
				}
			},

			FavorSubject: function(e) { //收藏题

				if (this.userFavor) {
					this.userFavor = false;
					this.subjectList[this.subjectIndex].userFavor = false;
				} else {

					this.userFavor = true;
					this.subjectList[this.subjectIndex].userFavor = true;
				}
			},

			MoveSubject: function(e) { //上一题、下一题

				if (e === -1 && this.subjectIndex != 0) {
					this.subjectIndex -= 1;
				}
				if (e === 1 && this.subjectIndex < this.subjectList.length - 1) {
					this.subjectIndex += 1;

					that.autoTimesNext()
				}
			},
			autoTimesNext() {
				//倒计时 10秒进入下一题
				if (that.curIntervalId) {
					clearInterval(that.curIntervalId)
				}
				that.timecount = 10
				that.curIntervalId = setInterval(function() {
					that.timecount--
					if (that.timecount == 0) {
						that.MoveSubject(1)
					}
				}, 1000)
			},
			AppointedSubject: function(e) { //题卡指定

				this.modalCard = null;
				this.subjectIndex = e;
			},

			SubmitError: function(e) { //提交纠错

				this.modalError = null;
			}

		}
	}
</script>

<style>
	@import "../../colorui/animation.css";

	page {
		background-color: #FFFFFF;
	}

	.cu-form-group {
		justify-content: flex-start
	}

	.cu-form-group .title {
		padding-left: 30upx;
		padding-right: 0upx;
	}

	.cu-form-group+.cu-form-group {
		border-top: none;
	}

	.cu-bar-title {
		min-height: 50upx;
	}

	.cu-list.menu>.cu-item-error {
		justify-content: flex-start;
	}

	.timeCount {
		font-size: 30upx;
		color: #E44025;
	}
</style>
