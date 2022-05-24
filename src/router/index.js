/*
路由器对象
 */
import Vue from 'vue'
import VueRouter from './vueRouter'

import routes from '@/router/routes'
//安装Vue插件
Vue.use(VueRouter)
//向外暴露路由器对象
export default new VueRouter({
	//模式
	mode: 'history', //不带#
	routes,
	scrollBehavior(to, from, savedPosition) {
		// return 期望滚动到哪个的位置
		return { x: 0, y: 0 }
	}
})
