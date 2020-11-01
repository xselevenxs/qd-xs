import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = new Vuex.Store({
	//定义状态
	state: {
		// serviceUrl: 'http://182.92.91.60:8001/dati',
		serviceUrl: 'http://wctest.lanbenzi.cn:8001/dati',
		token: '',
		myAppId: "wx86a1e0f53265f9f7",
		myWeiXinHttp: "http%3A%2F%2Fxs-dev.grip8.com",
		userInfo: {},
		ansList: []
	},
	mutations: {
		setToken(state,res){
			state.token = res
		},
		setUserInfo(state,res){
			state.userInfo = res
		},
		setAnsList(state,res){
			state.ansList = res
		},
	}
})
export default state 