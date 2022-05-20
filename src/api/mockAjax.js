import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
/*
axios二次封装 
 */
const service = axios.create({
	baseURL: '/mock',
	timeout: 20000
})

service.interceptors.request.use(config => {
	nprogress.start()
	return config
})

service.interceptors.response.use(
	response => {
		nprogress.done()
		return response.data
	},
	error => {
		//统一处理请求错误
		alert(error.message || '未知请求错误')
		return Promise.reject(error)
	}
)

export default service
