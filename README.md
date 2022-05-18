# sph_shop_client

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```
# 项目

## 使用脚手架创建项目并运行
```
1) 使用vue-cli5
2) 开发环境运行
  命令: yarn serve
    1 在内存中打包生成内存中的打包文件
    2 启动服务器时运行内存中打包的文件
3) 生产环境打包运行
  命令: yarn build
    1 在内存中打包生成内存中的打包文件
    2 生成本地打包文件
  命令: serve dist
    1 将本地的打包文件加载到内存中
    2 启动服务器运行内存中的打包文件
```
## 项目源码目录
```
|- api ajax请求相关
   |- ajax.js ==>封装 axios
   |- index.js ==> 接口函数封装
   |- myMock.js ==>mock数据 请求接口的封装
|- components 非路由组件
|- mock 模拟数据
   |- xxx.json ==>模拟数据 
|- pages 路由组件
|- router 路由器
|- store vuex相关
|- utils 工具函数模块
|- App.vue 应用组件
|-main.js

```

//错误提示
```js
// lintOnSave: 'warning'
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: 'warning'
})
```

## git的使用

```
1) 创建本地仓库
   创建.gitignore文本, 并配置好
   git init 初始化
   git add . 将工作区代码添加到暂存区
   git commit "xxx" 将暂存区代码提交到本地仓库

2) 创建远程仓库
   github  sph_shop_client
   https://github.com/Chameleon-fzb/sph_shop_client.git
  
3) 将本地仓库推送到远程仓库
   git remote add origin url
   git push -u origin master

4) 本地代码有修改,要提交到本地仓库,推送到仓库
   git add .
   git commit -m "xxx"
   git push origin master

5) 远程代码有修改,拉取到本地
   git pull

6) 将远程仓库的代码clone到本地
   git clone url

多分支

1) 创建本地个人开发分支,并推送到远程
   git checkout -b myMaster
   git push -u origin myMaster
2) 在个人开发分支上开发,并推送到远程
   git add .
   git commit -m "xxx"
   git push
3) 根据远程个人开发分支创建本地个人开发分支
   git pull(如果分支是在clone后创建得才需要执行)
   //根据远程 分支创建
   git checkout -b myMaster origin/myMaster

    git branch 查看分支
4) 将个人开发分支合并到master
 git checkout master
 git merge myMaster
 git push
```


```vue
<template>
</template>
<script>
export default {
  name: 'Header',

}
</script>
<style lang="less" scoped>
</style>
```
##   vscode下的vue文件
   template蓝线提示 
   在 jscofig.js 添加 "jsx":"preserve",
   ```json
   {"compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "baseUrl": "./",
    "jsx":"preserve",
    "moduleResolution": "node",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  }
}
```
## 在vue中使用less
安装  yarn add less-loader@7.3.0 less@4.1.1

## 引入vue-router
```
1) 安装vue-router 引入vueRouter
2) 定义一级路由组件: Home/Search/Register/Login
3) 创建路由器 配置路由 配置路由器
4) 注意组件中路由两个对象
$router:路由器对象,包含一些用于路由跳转的方法:
    push()/replace()/back()
$route: 当前路由信息对象,包含当前路由相关数据的对象
    path/name/query/params/meta

5) 路由跳转的两种方式
   - 声明式路由导航/跳转: <router-link :to="{name,path,params:{},query:{}}" replace></router-link> `
      默认使用 push方法 如果要使用replace 直接在标签内部使用replace
   - 编程式路由导航/跳转: 
      字符串形式: 仅适用只有没有params参数时使用
         this.$router.push/replace(`/search/${keyword}?keyword2=${keyword.toUpperCase()}`)

      对象形式: 适用所有情况
         const location = {
            name'',
            path:'/',
            params:{},
            query:{}
         }

      this.$router.push/replace(location)
   
      this.$router.push(location)/replace(location)

6) 路由组件传参
   routes:[
      {
         name:'search',
         path:'/search',
         components:Search,
         props:布尔值/对象/函数
      }
   ]
   - 布尔值
   props:true 默认将params参数映射
   - 对象(可以映射一些自定义属性)
   props:{next:false,name:'xxx'}

   - 函数(可以映射query,params,自定义属性)
   props:(route)=>({
      keyword:route.params.keyword,
      keyword2:route.query.keyword2
   })

7) 路由重复导航错误(Uncaught (in promise) NavigationDuplicated)
   - 原因
       如果没有通过参数指定回调函数就返回一个promise来指定成功或者事变的回调
       它内部会判断跳转路径和参数没有变化的时候,就会抛出一个失败的promise
   路由跳转函数完整写法
   this.$router.push(location,onComplete?,onAbort?)
   this.$router.push(location).then(onComplete).catch(onAbort)
   如果不传成功的回调或失败的回调,重复导航会返回一个错误的promise
   - 解决方法一(传入成功回调)
   this.$router.push(location,()=>{})

   - 解决方法二(用catch处理错误的promise)
   this.$router.push(location).catch(()=>{})

   - 解决方法三(重写方法)
     const originPush = VueRouter.prototype.push
     const originReplace = VueRouter.prototype.replace

      VueRouter.prototype.push = function (location, onResolve, onReject) {
	      if (onResolve || onReject)
		      return originPush.call(this, location, onResolve, onReject)
	      return originPush.call(this, location).catch(err => {
		      if (VueRouter.isNavigationFailure(err)) {
			      return err
		      }
		      return Promise.reject(err)
	      })
      }

      VueRouter.prototype.replace = function (location, onResolve, onReject) {
	      if (onResolve || onReject) {
		      return originReplace.call(this, location, onResolve, onReject)
	      }
	      return originReplace.call(this, location).catch(err => {
		      if (VueRouter.isNavigationFailure(err)) {
			      return err
		      }
		      return Promise.reject(err)
	      })
      }


```
### 使用路由meta属性
- 在登录和注册界面有页面自己的footer 所以在这两个页面不需要显示footer组件
- 使用meta添加自定义属性isHideFooter:true
- ```js
  {
		path: '/login',
		component: Login,
		meta: { isHideFooter: true }
	},
	{
		path: '/register',
		component: Register,
		meta: { isHideFooter: true }
	},
   ```
   ```vue
<template>
  <div id="app">
    <Header />
    <!-- 所有的一级路由都在此显示 -->
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHideFooter" />
  </div>
</template>
 ```

 ## 前后台交互ajax
 ```
 请求进度条的实现
 1) 下载依赖包
 yarn add axios nprogress

 axios 二次封装
 
 ```