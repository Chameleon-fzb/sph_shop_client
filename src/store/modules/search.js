import { reqSearch } from '@/api'

const state = {
	searchResult: []
}

const actions = {
	/** ? 获取搜索列表  */
	async getSearchList({ commit }, searchParams) {
		searchParams = { ...searchParams }
		Object.keys(searchParams).forEach(key => {
			if (
				searchParams[key] === '' ||
				(Array.isArray(searchParams[key]) && searchParams[key].length === 0)
			) {
				delete searchParams[key]
			}
		})
		const result = await reqSearch(searchParams)
		if (result.code === 200) {
			commit('RECEIVE_SEARCH_RESULT', result.data)
		}
	}
}
const mutations = {
	/* 获取搜索返回值  */
	RECEIVE_SEARCH_RESULT(state, searchResult) {
		state.searchResult = searchResult
	}
}

const getters = {
	goodsList: state => state.searchResult.goodsList || [],
	trademarkList: state => state.searchResult.trademarkList || [],
	attrsList: state => state.searchResult.attrsList || [],
	total: state => state.searchResult.total || 0
}
export default {
	state,
	actions,
	mutations,
	getters
}
