# easyFM

从日常工作中抽离出来的纯净的平台框架, 基于vue-cli3, 进行了进一步封装

# 目录结构

easyFm/

--| dist/

--| node/

--| node_modules/

--| public/

--| src/

--| local.config.js/ 

--| vue.config.js/ 


## node/

node文件

## src/

--| assets/ 静态资源文件

--| components/ 组件目录，用来存放views的子组件

--| router/ 路由文件，无需处理，使用vue-cli-plugin-generatererouter插件自动生成(https://www.jianshu.com/p/e8a79e8c18de)

--| store/ vuex文件

--| utils/ 配置目录

----| ajax/ axios封装目录

----| components/ 封装自定义组件存放目录

----| directives/ 封装自定义指令存放目录

----| filters/ 封装自定义过滤器存放目录

----| template/ 模板文件存放目录

----| user/ 用户信息存放目录

--| views文件

该文件目录存放所有根组件（会根据文件自动生成路由，生成规则同nuxtjs的动态路由生成规则）(https://zh.nuxtjs.org/guide/routing#%E5%B5%8C%E5%A5%97%E8%B7%AF%E7%94%B1)

创建内嵌子路由，你需要添加一个 Vue 文件，同时添加一个与该文件同名的目录用来存放子视图组件

例如:

views/

--| users/

-----| _id.vue

-----| index.vue

--| users.vue

## local.config.js/

配置代理信息，webpack将会读取文件中的信息配置devServer

例如:

let http = 'http://xxx.xxx.xxx.xxx:5656/';

module.exports = {

    proxy: http,

    // 开发环境下默认端口`
    port: 1024
}

## vue.config.js/

基于vue-cli3, webpack的配置都将通过该文件进行修改

