import http from './interface'
import store from '@/store'
/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const test = (data) => {
	/* http.config.baseUrl = "http://localhost:8080/api/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log('个性化response....')
		// uni.showToast({
		//                       title: '个性化response....',
		//                       icon: 'success',
		//                       mask: true
		//                   });
		//判断返回状态 执行相应操作
		return response;
	}
	return http.request({
		// baseUrl: 'https://unidemo.dcloud.net.cn/',
		url: '/api/hospital/getWxmpAppId',
		dataType: 'json',
		data,
	})
}
// 手机登录
export const getMobileLogin = (data) => {

	//设置请求结束后拦截器
	http.interceptor.response = (response) => {

		//判断返回状态 执行相应操作
		return response;
	}
	return http.request({
		url: '/login/login',
		dataType: 'json',
		data,
	})
}
// 获取用户信息
export const getUserGetById = (data) => {

	//设置请求结束后拦截器
	http.interceptor.response = (response) => {

		//判断返回状态 执行相应操作
		return response;
	}
	return http.request({
		url: '/user/getById',
		dataType: 'json',
		data,
	})
}
// 获取用户信息
export const getLoginUserInfo = (data) => {

	//设置请求结束后拦截器
	http.interceptor.response = (response) => {

		//判断返回状态 执行相应操作
		return response;
	}
	return http.request({
		url: '/login/getUserInfo',
		dataType: 'json',
		data,
	})
}
// 抽题
export const getTikuListRandom = (data) => {

	//设置请求结束后拦截器
	http.interceptor.response = (response) => {

		//判断返回状态 执行相应操作
		return response;
	}
	return http.request({
		url: '/tiku/listRandom',
		dataType: 'json',
		data,
	})
}
//提交答案 得分
export const getAnswerDetailAddOrUpdateAward = (data) => {

	//设置请求结束后拦截器
	http.interceptor.response = (response) => {

		//判断返回状态 执行相应操作
		return response;
	}
	return http.request({
		url: '/answerDetail/addOrUpdateAward',
		dataType: 'json',
		data,
	})
}
//我的奖品列表
export const getAwardList = (data) => {

	//设置请求结束后拦截器
	http.interceptor.response = (response) => {

		//判断返回状态 执行相应操作
		return response;
	}
	return http.request({
		url: '/award/list',
		dataType: 'json',
		data,
	})
}
//开始抽奖
export const getProductPrizeStartProductPrize = (data) => {

	//设置请求结束后拦截器
	http.interceptor.response = (response) => {

		//判断返回状态 执行相应操作
		return response;
	}
	return http.request({
		url: '/productPrize/startProductPrize',
		dataType: 'json',
		data,
	})
}
//添加地址
export const getAddOrUpdateAddress = (data) => {

	//设置请求结束后拦截器
	http.interceptor.response = (response) => {

		//判断返回状态 执行相应操作
		return response;
	}
	return http.request({
		url: '/address/addOrUpdateAddress',
		dataType: 'json',
		data,
	})
}
//兑换商品
export const getAddAward = (data) => {

	//设置请求结束后拦截器
	http.interceptor.response = (response) => {

		//判断返回状态 执行相应操作
		return response;
	}
	return http.request({
		url: '/award/addAward',
		dataType: 'json',
		data,
	})
}
//详情商品
export const getAwardById = (data) => {

	//设置请求结束后拦截器
	http.interceptor.response = (response) => {

		//判断返回状态 执行相应操作
		return response;
	}
	return http.request({
		url: '/award/getById',
		dataType: 'json',
		data,
	})
}
//行政区
export const getAreaDate = (data) => {

	//设置请求结束后拦截器
	http.interceptor.response = (response) => {

		//判断返回状态 执行相应操作
		return response;
	}
	return http.request({
		url: '/area/getAreaDate',
		dataType: 'json',
		data,
	})
}
//行政区增加
export const getAddOrUpdateUser = (data) => {

	//设置请求结束后拦截器
	http.interceptor.response = (response) => {

		//判断返回状态 执行相应操作
		return response;
	}
	return http.request({
		url: '/user/addOrUpdateUser',
		dataType: 'json',
		data,
	})
}
//作品列表
export const getVoteDesignList = (data) => {

	//设置请求结束后拦截器
	http.interceptor.response = (response) => {

		//判断返回状态 执行相应操作
		return response;
	}
	return http.request({
		url: '/design/list',
		dataType: 'json',
		data,
	})
}
//作品投票
export const getVoteDetailVoteDesign = (data) => {

	//设置请求结束后拦截器
	http.interceptor.response = (response) => {

		//判断返回状态 执行相应操作
		return response;
	}
	return http.request({
		url: '/voteDetail/voteDesign',
		dataType: 'json',
		data,
	})
}
// 轮播图   
export const banner = (data) => {
	return http.request({
		url: '/banner/36kr',
		method: 'GET',
		data,
		// handle:true
	})
}


// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	test,
	getMobileLogin,
	getUserGetById,
	getLoginUserInfo,
	getTikuListRandom,
	getAnswerDetailAddOrUpdateAward,
	getAwardList,
	getProductPrizeStartProductPrize,
	getAddOrUpdateAddress,
	getAddAward,
	getAwardById,
	getAreaDate,
	getAddOrUpdateUser,
	getVoteDesignList,
	getVoteDetailVoteDesign,
	banner
}
