import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import {
    formatIntercepter,
    codeIntercepter,
    statusIntercepter
} from './middleware/interceptor'
import { error } from './middleware/enum'

const vue = new Vue()

// 自定义拦截器
const interceptors = [
    formatIntercepter,
    codeIntercepter,
    statusIntercepter
]

let loading // 加载遮罩

let _csrfToken // token

// 自定义axios实例
const http = axios.create({

    baseURL: '/easyFm',

    // ms
    timeout: 15000,

    // 只适用'POST'、'PUT'、'PATCH'，序列化参数
    transformRequest: [function (data) {
        return JSON.stringify(data)
    }],

    // GET请求，序列化参数，只有在有参数的情况先才会执行
    paramsSerializer: function (params) {
        return qs.stringify(params, {
            arrayFormat: 'brackets'
        })
    }
})

/**
 * 请求拦截器
 * @return {[type]}          [description]
 */
http.interceptors.request.use(function (request) {
    let {
        method,
        data,
        params
    } = request

    if (method.toLowerCase() === 'get') {
        request.params = extendToken(params)
    } else {
        if ((data instanceof FormData)) {
            request.data = data
        } else {
            request.data = extendToken(data)
        }

        // post请求不能重复提交
        // 使用element loading全屏遮罩
        loading = vue.$loading({
            fullscreen: true
        })
    }
    return request
});

/**
 * 扩展响应
 * @return {[type]}           [description]
 */
http.interceptors.response.use(function (response) {
    response._i = 0
    response.next = function () {
        if (response._i < interceptors.length) {
            return interceptors[response._i++](response, response.next)
        }
    }
    return response
})

/**
 * 响应拦截器
 * @return {[type]}                 [description]
 */
http.interceptors.response.use(function (response) {
    console.log(response.next())
    let code = response.data.code
    if (code == 218 || code == 219 || code == 217) {
        store.dispatch('updateIsCertificateCode', code)
        return Promise.reject(response)
    }
    const {
        config,
        data
    } = response

    if (config.method.toLowerCase() !== 'get') {
        loading && loading.close()
    }

    setToken(data.token)
    const result = response.next()
    if (result) {

        // 请求失败
        switch (result) {
            case error.LOGOUT:

                // 未登录
                user.showLogin()
                break
            case error.LOGINERROR:
            case error.LOGINFAIL:
            case error.AUTHCODE:

                // 登录失败
                vue.$message.error(data.message)
                user.showLogin()
                break
            case error.AUTH:

                // 没权限
                vue.$message.error('权限已变更，请重新登录')
                setTimeout(() => {
                    user.showLogin()
                }, 1000)

                break
            case error.FORMAT:

                // 数据格式错误
                vue.$message.error('接口数据格式错误')
                break
            default:

                vue.$message.error(data.message)
        }
        return Promise.reject(data)
    }
    return data
}, function (error) {
    loading && loading.close()
    console.log(error)
    return Promise.reject(error)
});


function getToken() {
    return _csrfToken || (process.env.NODE_ENV === 'production' ? window.localStorage['token'] : '')
}

function setToken(val) {
    window.localStorage.setItem('token', val && (_csrfToken = val))
}

function extendToken(data) {

    return {
        ...data,
        'csrf_token': getToken() // 添加token信息
    }
}

/**
 * http工具函数
 * @param  {...[type]} config [description]
 * @return {[type]}         [description]
 */
const ajax = function (config) {

    return http(config)
}

Object.defineProperty(ajax, 'csrfToken', {

    enumerable: false,
    configurable: false,
    get() {
        console.log('get')
        return getToken()
    },
    set(val) {
        console.log('set')
        setToken(val)
    }
})

/**
 * ajax消息提示
 * @param  {[type]}  message            [description]
 * @param  {String}  options.type      [description]
 * @param  {Boolean} options.showClose [description]
 * @param  {[type]}  options.duration  [description]
 * @return {[type]}                    [description]
 */
ajax.message = function (message, {
    type = 'error',
    showClose = false,
    duration = 3000
} = {}) {
    vue.$message({
        message,
        type,
        showClose,
        duration
    })
}

/**
 * GET操作
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
ajax.get = function (...args) {

    let [url, data, options] = args

    return http({
        url,
        params: data,
        method: 'get',
        ...options
    })
}

/**
 * POST操作
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
ajax.post = function (...args) {

    let [url, data, options] = args

    return http({
        url,
        data,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'post',
        ...options
    })
}

/**
 * PUT操作
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
ajax.put = function (...args) {

    let [url, data, options] = args

    return http({
        url,
        data,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'put',
        ...options
    })
}

/**
 * 删除操作
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
ajax.delete = function (...args) {

    let [url, data, options] = args

    return http({
        url,
        data: data,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'delete',
        ...options
    })
}

/**
 * POSTJSON操作
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
ajax.postJSON = function (...args) {

    let [url, data, options] = args

    return http({
        url,
        data,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'post',
        ...options
    })
}

/**
 * 上传文件
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
ajax.upload = function (...args) {

    let [url, data, options] = args

    if (!(data instanceof FormData)) {
        throw TypeError('数据格式错误')
    }

    data.append('csrf_token', getToken())

    return http({
        url,
        data,
        transformRequest: [data => data],
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        method: 'post',
        ...options
    })
}

export default ajax
