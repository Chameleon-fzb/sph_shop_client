import { reqDetailInfo } from '@/api'

const state = {
	skuDetailInfo: []
}
const actions = {
	async getDetailInfo({ commit }, skuId) {
		const result = await reqDetailInfo(skuId)
		if (result.code === 200) {
			commit('RECEIVE_SKU_DETAIL_INFO', result.data)
		}
	}
}
const mutations = {
	RECEIVE_SKU_DETAIL_INFO(state, skuDetailInfo) {
		state.skuDetailInfo = skuDetailInfo
	}
}
const getters = {
	categoryView: state => state.skuDetailInfo.categoryView || {},
	skuInfo: state => state.skuDetailInfo.skuInfo || {},
	spuSaleAttrList: state => state.skuDetailInfo.spuSaleAttrList || {}
}
export default {
	state,
	actions,
	mutations,
	getters
}
