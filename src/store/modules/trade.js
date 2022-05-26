import { reqTradeInfo, reqUserAddressList } from '@/api'

const state = {
	tradeInfo: {},
	userAddressList: []
}
const actions = {
	/*获取交易信息*/
	async getTradeInfo({ commit }) {
		const result = await reqTradeInfo()
		result.code === 200 && commit('RECEIVE_TRADE_INFO', result.data)
	},
	/** 获取用户地址 */
	async getUserAddressList({ commit }) {
		const result = await reqUserAddressList()
		result.code === 200 && commit('RECEIVE_ADDRESS_LIST', result.data)
	},
	/**
	 *提交订单
	 */
	async submitOrder(_, { tradeNo, tradeData }) {
		const result = await reqSubmitOrder(tradeNo, tradeData)
		if (result.code === 200) return result.data
		else return Promise.reject(new Error(result.message))
	}
}
const mutations = {
	RECEIVE_TRADE_INFO(state, tradeInfo) {
		state.tradeInfo = tradeInfo
	},
	RECEIVE_ADDRESS_LIST(state, userAddressList) {
		state.userAddressList = userAddressList
	}
}
const getters = {
	detailArrayList: state => state.tradeInfo.detailArrayList || []
}
export default {
	state,
	mutations,
	actions,
	getters
}
