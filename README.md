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


import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
/*
axios二次封装 
 */
const service = axios.create({
	baseURL: '/api',
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
 
 ```

## 设置代理
```js
//在vue.config.js中添加
//只在开发环境中起作用
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
```
## vuex的多模块编程

### 单模块
- 需要管理状态比较多时,mutations/actions模块会变得比较大,难以管理
- 如果添加新的数据管理,需要修改现在的文件(不断向其中添加内容)

### 多模块
- 对各个功能模块的数据分别管理,这样更加具有扩展性

### 什么情况下使用多模块
- 需要vuex管理的数据比较多的时候,考虑使用
```
1) 安装vuex
   // yarn add vuex@next

2) 安装vuex 配置vuex 配置模块
   import Vue from 'vue'
   import Vuex from 'vuex'
   import modules from './modules'

   Vue.use(Vuex)

   const state = {}
   const mutations = {}
   const actions = {}
   const getters = {}

   export default new Vuex.Store({
	   state,
	   mutations,
	   actions,
   	getters,
	   modules
   })
3) 注册vuex
   import store from './store'  
   new Vue({
	render: h => h(App),
	el: '#app',
	router, //注册路由器 ==> 所有的组件都可以直接访问2个对象:$router 和 $route
	store
})

4) store对象的功能
   读取数据
   - store.state.xxx
   - store.getters.yyy
   更新数据
   - store.dispatch(action名称,data)
   - store.commit(mutation名称,data)

5) 组件获取vuex中的数据

```

## 三级列表的交互

1) 点击分类项跳转到搜索界面,携带分类的id与分类名称
   实现: 使用声明式路由导航
   问题: 显示太慢
   原因:太多了,产生组件对象太多了
   ```vue <router-link>
    <router-link :to="`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`">
      {{ c1.categoryName }}
    </router-link>
   ```
2) 使用编程式导航代替声明式导航
   好处: 显示更快
   原因: 不用产生router-link的组件对象
   问题: 每个分类项都绑定了点击监听,数量太多
   ```vue
   <a href="javascript:;" @click="$router.push(`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`)">{{ c1.categoryName }}</a>
   ```
3) 使用事件委托/委派/代理
   给所有的分类项的父元素绑定监听,根据event.target得到分类项
   只需要绑定一个监听
   问题:不知道你点击的是哪个分类项
   解决:利用标签的自定义属性data data-xxx="" 然后使用target.dataset 
   注意:**dataset中属性名都会变成小写**
## 三级列表显示子列表


1) 设计一个标识当前需要显示子列表的分类项的下标:currentIndex=-1
   - 在一级分类项上 为数字
   - 离开 为-1
2) 定义当前分类项的样式类:active
3) 给每一个分类项div绑定mouseenter 监听 ==> this.currentIndex = index
4) 给包含所有分类项和标题的父元素绑定mouseleave监听

### 优化三级列表显示
问题:在快速滑动时 mouseenter 的事件高频触发,导致数据currentIndex高频更新
解决:利用lodash 的 throttle进行函数节流

安装 lodash 
yarn add lodash

_.throttle(func, [wait=0], [options=])
func (Function): 要节流的函数。
[wait=0] (number): 需要节流的毫秒。
[options=] (Object): 选项对象。
[options.leading=true] (boolean): 指定调用在节流开始前。
[options.trailing=true] (boolean): 指定调用在节流结束后。
```js
import _  from 'lodash'
// 直接引入打包较大
```
<!-- 使用按需引入 -->
```js
import { throttle } from 'lodash'
```

### 解决三级列表显示bug
快速移出分类项,最后一次事件延迟处理,导致二级列表显示
原因: 在进入第一个分类项后0.2s才回去执行改变currentIndex的值
      但在0.2s,已经移出了整个div,这时currentIndex改变了,就会还显示二级分类

1) 解决方法 使用{trailing=false}
   由于最后一次事件没有延迟处理
   但是在分类项里快速移动到另一个分类不动的时候的,分类项会显示在上一次位置
   
2) 使用标识
  currentIndex=-2 离开div
  currentIndex=-1 没离开div但是不再一级列表中
  currentIndex= 下标 在一级列表上

### 控制一级列表显示与隐藏
- 在home界面不隐藏,在其它页面默认隐藏,只有移入的时候才显示,移出不显示
1) 添加标识 isHome 是否为首页 isShowFirstList 是否显示一级列表 默认值为 isHome的值
   获取路由路径是否 为'/' 如果是则是首页 isHome的值为true isShowFirstList也为true
   否则为false 不显示
2) 移入div时,显示一级列表
   this.isShowFirstList = true
3) 移出div,隐藏一级列表
   前提是当前界面不是Home界面
   if (!this.isHome) {
        //如果不在home页面就不显示一级列表
        this.isShowFirstList = false
      }
### 添加一级列表显示隐藏的过渡效果
1) 给显示隐藏的元素包裹 <transition name="listSlide"></transition>
2) 在显示/隐藏过程的类名下指定:transition样式
3) 在隐藏时的类名下指定:隐藏的样式

```css
  .listSlide-enter-active,
    .listSlide-leave-active {
      transition: all 1s;
    }

    //指定隐藏时的样式
    .listSlide-enter,
    .listSlide-leave-to {
      opacity: 0;
      height: 0;
    }
```

## 首页轮播
- 使用swiper和vue-awesome-swiper
  安装 yarn add swiper@5 

在ListContainer中使用 引入创建swiper对象
 实现静态的轮播

 ```html
  <div class="swiper-container" ref="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="./images/banner1.jpg" />
            </div>
            <div class="swiper-slide">
              <img src="./images/banner2.jpg" />
            </div>
            <div class="swiper-slide">
              <img src="./images/banner3.jpg" />
            </div>
            <div class="swiper-slide">
              <img src="./images/banner4.jpg" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
 ```

```js
import Swiper from 'swiper'
import 'swiper/css/swiper.css'

mounted() {
    new Swiper(this.$refs.swiper, {
      direction: 'horizontal',//水平切换选项
      loop: true,//循环模式
      autoplay: {
        delay: 4000,
        disableOnInteraction: false//不可打断自动轮播
      },
      //分页器
      pagination: {
        el: '.swiper-pagination'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        pervEl: '.swiper-button-prev'
      }
    })
  }

```

### 使用动态获取数据实现轮播图
- 由于swiper对象必须在列表显示之后创建才有效果
- 在mounted生命周期函数中创建swiper对象时 可能还没取得数据
- 在watch中监视是否获得数据,同样是没有效果 因为 数据列表还没显示
   **vue中数据变化了 ==> 同步调用监视的回调==>最后异步更新界面**
解决办法
1) 使用watch + vm.$nextTick([callback])
   - 将回调延迟到下次Dom更新循环后执行,在修改数据之后立即使用它,它会等到下次dom更新
```js
    watch: {
    bannerList() {//此时只是数据有了,但是界面没有更新
      this.$nextTick(() => {
        new Swiper(this.$refs.swiper, {
          direction: 'horizontal',//水平切换选项
          loop: true,//循环模式
          autoplay: {
            delay: 4000,
            disableOnInteraction: false//不可打断自动轮播
          },
          //分页器
          pagination: {
            el: '.swiper-pagination'
          },
          navigation: {
            nextEl: '.swiper-button-next',
            pervEl: '.swiper-button-prev'
          }
        })
      })

    }
  }
```

2) 使用 vue-awesome-swiper
    - 安装vue-awesome-swiper
      yarn add vue-awesome-swiper@4.1.1
    - 引入
   ```js

      import Vue from 'vue'
      import VueAwesomeSwiper from 'vue-awesome-swiper'

      //import style (>=Swiper 6.x)
      import 'swiper/swiper-bundle.css'
      //import style (<=Swiper 5.x)
      import 'swiper/css/swiper.css'
      Vue.use(VueAwesomeSwiper)
   ```
   ```html
     <swiper :options="swiperOptions">
          <swiper-slide class="swiper-slide" v-for="banner in bannerList" :key="banner.id">
            <img :src="banner.imageUrl" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    ```

    ``` js
    data() {
    return {
      swiperOptions: {
        loop: true, // 循环模式选项
        autoplay: {
          //自动轮播
          delay: 4000,
          disableOnInteraction: false //用户操作后不打断自动轮播
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }

        // 如果需要滚动条
        // scrollbar: {
        // 	el: '.swiper-scrollbar'
        // }
      }
    }
  }
  ```

  ## mock 首页的数据
  1) 安装mockjs
     yarn add mockjs
  2) 引入mock
  ```js
     import recommends from './recommends.json'//引入定义返回的数据
     import Mock from 'mockjs'
     Mock.mock('/mock/recommends', {
	   code: 200,
	   data: recommends
     })
  ```
  main.js
  ```js
  import './mock/mockServer'
  ```