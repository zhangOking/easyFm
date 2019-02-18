const proxyMsg = require('./local.config')
// vue.config.js
module.exports = {
    // 选项...
    devServer: {
        proxy: proxyMsg.proxy,
        port: proxyMsg.port
    },
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'views': '@/views',
                'vue$': 'vue/dist/vue.esm.js'
            }
        }
    },
}