import Vue from 'vue'
import App from './App.vue'

import router from './router'

//不显示非生产环境打包的提示
Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	el: '#app',
	router //注册路由器 ==> 所有的组件都可以直接访问2个对象:$router 和 $route
})
