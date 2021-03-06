import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'

import './mock/mockServer'

import './plugins/swiper'

//不显示非生产环境打包的提示
Vue.config.productionTip = false
//全局注册组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)

new Vue({
	beforeCreate() {
		Vue.prototype.$bus = this
	},
	render: h => h(App),
	el: '#app',
	router, //注册路由器 ==> 所有的组件都可以直接访问2个对象:$router 和 $route
	store
})
