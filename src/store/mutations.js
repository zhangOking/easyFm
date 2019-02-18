import * as TYPE from './mutation-types'

export default {
    // mutations
    [TYPE.EASYFM_USERINFO](state, value = false) {
        if (value) {
            state.updateUserInfo = value
            return
        }
        state.updateUserInfo = {
            username: '',
            authorities: {}
        }
        return
    },
    [TYPE.EASYFM_USERLOGIN](state, value = false) {
        state.updateLogin = value
        return
    }
}