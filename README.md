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



