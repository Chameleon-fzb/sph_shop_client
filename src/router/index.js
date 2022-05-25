/*
路由器对象
 */
import Vue from 'vue'
import VueRouter from './vueRouter'

import routes from '@/router/routes'
import store from '@/store'
//安装Vue插件
Vue.use(VueRouter)

const router = new VueRouter({
	//模式
	mode: 'history', //不带#
	routes,
	scrollBehavior(to, from, savedPosition) {
		// return 期望滚动到哪个的位置
		return { x: 0, y: 0 }
	}
})
//全局前置守卫
router.beforeEach(async (to, from, next) => {
	//token校验
	let token = store.state.user.token
	if (token) {
		//登录了,或者之前登录过
		if (to.path === '/login') {
			next('/')
		} else {
			let hasUserInfo = !!store.state.user.hasUserInfo
			if (hasUserInfo) {
				next()
			}
			//校验token 获取用户信息
			try {
				await store.dispatch('getUserInfo')
				next()
			} catch (error) {
				alert('登录过期')
				store.dispatch('resetUserInfo')
				next('/login')
			}
		}
	} else {
		//用户没登录过
		//判断用户是否去订单相关的页面, 是就需要先登录
		next()
	}
})
//向外暴露路由器对象
export default router
