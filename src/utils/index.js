/**
 * 基础服务扩展
 */

import easyFmInput from './components/input/index.vue'

import ajax from './ajax'

import focus from './directives/focus'

import { currency } from './filters/currency'



let plugin = {

    install: (Vue, option) => {

        // 注册系统服务
        Vue.prototype.$ajax = ajax

        // 注册全局组件
        Vue.component('e-input', easyFmInput)

        // 注册全局指令
        Vue.directive('focus', focus)

        // 注册全局过滤器
        Vue.filter('currency', currency)

        // 注册全局Mixin
        Vue.mixin({
            
        })
    }
}

export default plugin
