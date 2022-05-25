import { getUserTempId, getToken, setToken } from '@/utils/userAbout'
import {
	reqRegister,
	reqSecurityCode,
	reqLogin,
	reqUserInfo,
	reqUserLogout
} from '@/api'
import { removeToken } from '@/utils/userAbout'
const state = {
	//获取临时标识id
	userTempId: getUserTempId(),
	//验证码
	securityCode: '',
	token: getToken(),
	userInfo: null
}
const actions = {
	/**获取验证码*/
	async getSecurityCode({ commit }, phone) {
		const result = await reqSecurityCode(phone)
		result.code === 200 && commit('RECEIVE_SECURITY_CODE', result.data)
	},
	/** 注册 */
	async userRegister(_, userInfo) {
		const result = await reqRegister(userInfo)
		if (result.code === 200) return 'ok'
		else return Promise.reject(new Error(result.message))
	},
	/**用户登录 */
	async userLogin({ commit }, userInfo) {
		const result = await reqLogin(userInfo)
		if (result.code === 200) {
			commit('RECEIVE_TOKEN', result.data.token)
			return 'ok'
		} else return Promise.reject(new Error('failed'))
	},
	/**
	 * 获取用户信息
	 */
	/*获取用户信息  */
	async getUserInfo({ commit }) {
		const result = await reqUserInfo()
		if (result.code === 200) {
			commit('RECEIVE_USER_INFO', result.data)
			return 'ok'
		} else return Promise.reject(new Error(result.message))
	},
	/**token过期后 重设用户信息 */
	async resetUserInfo({ commit }) {
		removeToken()
		commit('RESET_USER_INFO')
	},
	/**退出登录 */
	async userLogout({ dispatch }) {
		const result = await reqUserLogout()
		if (result.code === 200) {
			dispatch('resetUserInfo')
			return 'ok'
		} else return Promise.reject(new Error(result.message))
	}
}
const mutations = {
	/**接收验证码  */
	RECEIVE_SECURITY_CODE(state, securityCode) {
		state.securityCode = securityCode
	},
	/** 接收token*/
	RECEIVE_TOKEN(state, token) {
		state.token = token
		setToken(token)
	},
	/**接收 用户信息*/
	RECEIVE_USER_INFO(state, userInfo) {
		state.userInfo = userInfo
	},
	/**重设用户信息 */
	RESET_USER_INFO(state) {
		state.token = ''
		state.userInfo = null
	}
}
const getters = {}

export default {
	state,
	mutations,
	actions,
	getters
}
