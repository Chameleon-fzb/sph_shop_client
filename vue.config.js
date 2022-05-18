const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: 'warning',
	// 设置代理
	devServer: {
		// port: 8080, // 端口

		//只用于开发环境
		proxy: {
			'/api': {
				//只对请求路由以/api开头的请求进行代理转发
				target: 'http://gmall-h5-api.atguigu.cn',
				changeOrigin: true //支持跨域
			}
		}
	}
})
