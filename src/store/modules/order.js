import { reqMyOrderInfo } from '@/api'
const state = {
	orderInfo: {}
}
const mutations = {
	RECEIVE_MY_ORDER_INFO(state, orderInfo) {
		state.orderInfo = orderInfo
	}
}
const actions = {
	async getMyOrderInfo({ commit }, { page, limit }) {
		const result = await reqMyOrderInfo(page, limit)
		if (result.code === 200) {
			commit('RECEIVE_MY_ORDER_INFO', result.data)
			return 'ok'
		} else return Promise.reject(new Error(result.message))
	}
}
const getters = {}
export default {
	state,
	mutations,
	actions,
	getters
}
