import Vue from 'vue'
import Vuex from 'vuex'
import MUTATIONS from './mutations'
import ACTIONS from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    updateUserInfo: '',
    updateLogin: false
  },
  mutations: MUTATIONS,
  actions: ACTIONS
})
