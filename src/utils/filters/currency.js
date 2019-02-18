/**
 * 12345 => $12,345.00
 *
 * @param  {[type]} value    [description]
 * @param  {[type]} currency [description]
 * @return {[type]}          [description]
 */
export const currency = (value, currency) => {

    value = parseFloat(value)

    if (!isFinite(value) || (!value && value !== 0)) {

        return ''
    }

    currency = currency !== null ? currency : '$'
    let stringified = Math.abs(value).toFixed(2)
    let _int = stringified.slice(0, -3)
    let i = _int.length % 3
    let head = i > 0 ?
        (_int.slice(0, i) + (_int.length > 3 ? ',' : '')) :
        ''
    let _float = stringified.slice(-3)
    let sign = value < 0 ? '-' : ''

    return currency + sign + head +
        _int.slice(i).replace(digitsRE, '$1,') +
        _float
}