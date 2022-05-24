import {
	addOrUpdCart,
	reqDelCart,
	reqShopCartList,
	reqUpdCartIsCheck
} from '@/api'

const state = {
	shopCartList: []
}

const actions = {
	async addOrUpdCart({ commit }, { skuId, skuNum }) {
		const result = await addOrUpdCart(skuId, skuNum)
		if (result.code === 200) {
			return 'ok'
		} else {
			return Promise.reject(new Error('failed'))
		}
	},
	async getShopCartList({ commit }) {
		const result = await reqShopCartList()
		if (result.code === 200) {
			commit('RECEIVE_SHOP_CART_LIST', result.data)
		}
	},
	/**
	 * 更新单个的isCheck
	 */
	async updCartIsCheck({ commit }, { skuId, isChecked }) {
		const result = await reqUpdCartIsCheck(skuId, isChecked)
		if (result.code === 200) {
			return 'ok'
		} else {
			return Promise.reject(new Error('failed'))
		}
	},
	/**
	 * 更新多个的isCheck
	 */
	updAllCartCheck({ dispatch, getters }, isChecked) {
		let PromiseAll = []
		getters.cartInfoList.forEach(item => {
			if (item.isChecked !== isChecked) {
				let promise = dispatch('updCartIsCheck', {
					skuId: item.skuId,
					isChecked
				})
				PromiseAll.push(promise)
			}
		})
		return Promise.all(PromiseAll)
	},
	/**
	 * 删除单个购物车
	 */
	async delShopCart({ commit }, skuId) {
		const result = await reqDelCart(skuId)
		if (result.code === 200) {
			return 'ok'
		} else {
			return Promise.reject(new Error('failed'))
		}
	},
	/**
	 * 删除多个购物车
	 */
	async delCheckShopCart({ dispatch, getters }) {
		let PromiseAll = []
		getters.cartInfoList.forEach(item => {
			if (item.isChecked === 1) {
				let promise = dispatch('delShopCart', item.skuId)
				PromiseAll.push(promise)
			}
		})
		return Promise.all(PromiseAll)
	}
}

const mutations = {
	RECEIVE_SHOP_CART_LIST(state, shopCartList) {
		state.shopCartList = shopCartList
	}
}

const getters = {
	cartInfoList: state => {
		let cartInfo = state.shopCartList[0] || {}
		return cartInfo.cartInfoList || []
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}
