import Vue from 'vue'
import {
	ValidationObserver,
	ValidationProvider,
	extend,
	localize
} from 'vee-validate'
// 引入验证规则，可以自定义，如下的isPhone
import { required } from 'vee-validate/dist/rules'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
// 汉化
import zhCN from 'vee-validate/dist/locale/zh_CN.json'
// 汉化
localize('zh_CN', zhCN)
// 引入验证规则
extend('required', required)

// 自定义验证规则
extend('isPhone', {
	validate: value => {
		const isPhone = /^[1][0-9]{10}$/.test(value)
		return isPhone
	},
	message: '手机号格式不正确'
})

extend('password', {
	validate: value => {
		const bool = /^\w{6,16}$/.test(value)
		return bool
	},
	message: '密码格式不正确'
})
