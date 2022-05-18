import { reqCategoryList } from '@/api/index'

const state = {
	CategoryList: []
}
const actions = {
	/** ? 获取三级菜单数据 */
	async getCategoryList({ commit }) {
		const result = await reqCategoryList()
		if (result.code === 200) {
			commit('RECEIVE_CATEGORY_LIST', result.data)
		}
	}
}
const mutations = {
	/** ? 接收三级菜单数据 */
	RECEIVE_CATEGORY_LIST(state, CategoryList) {
		state.CategoryList = CategoryList
	}
}
const getters = {}

export default {
	state,
	mutations,
	actions,
	getters
}
