import { getUserTempId, getToken, setToken } from '@/utils/userAbout'
import { reqRegister, reqSecurityCode, reqLogin } from '@/api'
const state = {
	//获取临时标识id
	userTempId: getUserTempId(),
	//验证码
	securityCode: '',
	token: getToken()
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
	}
}
const getters = {}

export default {
	state,
	mutations,
	actions,
	getters
}
