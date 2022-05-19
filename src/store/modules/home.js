import { reqBanner, reqCategoryList } from '@/api/index'

const state = {
	CategoryList: [],
	bannerList: []
}
const actions = {
	/** ? 获取三级菜单数据 */
	async getCategoryList({ commit }) {
		const result = await reqCategoryList()
		if (result.code === 200) {
			commit('RECEIVE_CATEGORY_LIST', result.data)
		}
	},
	/* ? 获取首页轮播  */
	async getBanner({ commit }) {
		const result = await reqBanner()
		if (result.code === 200) {
			commit('RECEIVE_BANNER_LIST', result.data)
		}
	}
}
const mutations = {
	/** ? 接收三级菜单数据 */
	RECEIVE_CATEGORY_LIST(state, CategoryList) {
		state.CategoryList = CategoryList
	},
	/* 接收首页轮播  */
	RECEIVE_BANNER_LIST(state, bannerList) {
		state.bannerList = bannerList
	}
}
const getters = {}

export default {
	state,
	mutations,
	actions,
	getters
}
