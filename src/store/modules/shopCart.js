import { addOrUpdCart } from '@/api'

const state = {}

const actions = {
	async addOrUpdCart({ commit }, { skuId, skuNum }) {
		const result = await addOrUpdCart(skuId, skuNum)
		if (result.code === 200) {
			return 'ok'
		} else {
			return Promise.reject(new Error('failed'))
		}
	}
}

const mutations = {}

const getters = {}

export default {
	state,
	actions,
	mutations,
	getters
}
