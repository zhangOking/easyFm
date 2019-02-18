import * as TYPE from './mutation-types'
export default {
    // actions
    updateUserInfo: ({ commit }, args) => {
        commit(TYPE.EASYFM_USERINFO, args)
    },
    updateLogin: ({ commit }, args) => {
        commit(TYPE.EASYFM_USERLOGIN, args)
    }
}