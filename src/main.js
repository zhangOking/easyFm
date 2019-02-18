import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import element from 'element-ui'
import utils from './utils'

Vue.config.productionTip = false

Vue.use(element)
Vue.use(utils)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
