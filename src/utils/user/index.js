import store from '@/store'

export const user = {
    /**
     * 更新账户信息
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    updateUser(data) {
        if (data) {
            const {
                username,
                token,
                menus_paths
            } = data
            store.dispatch('updateUserInfo', {
                username: username,
                token: token,
                authorities: {
                    menus_paths
                }
            }) // 更新用户信息
            store.dispatch('updateLogin', true)
        } else {
            store.dispatch('updateUserInfo') // 清空用户信息
            store.dispatch('updateLogin', false)
        }
    },
}