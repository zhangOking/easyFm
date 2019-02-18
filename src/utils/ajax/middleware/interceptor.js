import Ajv from 'ajv'
import {
    error,
    code
} from './enum'
import responseSchema from './schema'

const ajv = new Ajv() // 数据格式校验
const loginErrorCode = [code.LOCK, code.FORBIDDEN, code.LOGINTIMEOUT, code.EXPIRED] // 需要重新登录

/**
 * 数据格式校验
 * @param  {[type]}   response [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
function formatIntercepter(response, next) {

    const valid = ajv.validate(responseSchema, response)

    if (!valid) {

        // 格式校验失败
        return error.FORMAT
    }
    return next()
}

/**
 * 业务状态码校验
 * @param  {[type]}   response [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
function codeIntercepter(response, next) {

    const codeState = response.data.code

    if (codeState !== code.SUCCESS && (codeState < code.SUCMIN || codeState > code.SUCMAX)) {
        if (codeState === code.LOGOUT) {

            // 未登录
            return error.LOGOUT
        }

        if (_.includes(loginErrorCode, codeState)) {

            // 登录失败
            return error.LOGINERROR
        }
        if (codeState === code.AUTHSERVER) { // 权限
            return error.AUTH
        }
        if (codeState === code.LOGINFAIL) { // 用户名密码
            return error.LOGINFAIL
        }
        if (codeState === code.AUTHCODE) { // 验证码
            return error.AUTHCODE
        }

        // 发生业务错误
        return error.SERVER
    }
    return next()
}

/**
 * 操作状态校验
 * @param  {[type]}   response [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
function statusIntercepter(response, next) {

    const res = response.data,
        status = res.status

    if (!status) {

        // 接口错误
        return error.REQUEST
    }
    return next()
}

export {
    formatIntercepter,
    codeIntercepter,
    statusIntercepter
}
