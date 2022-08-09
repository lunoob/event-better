import { isObjectLike } from './isObjectLike'
import { getTag } from './getTag'

/**
 * 判断是否纯对象数据结构
 * 对象和对象的原型对象相同，或者原型对象为 null
 * @param {any} n
 * @returns {boolean}
 */
export function isPlainObject (n: any) {
    if (!isObjectLike(n) || getTag(n) !== '[object Object]') {
        return false
    }

    if (Object.getPrototypeOf(n) === null) {
        return true
    }

    let proto = n
    while (Object.getPrototypeOf(proto) != null) {
        proto = Object.getPrototypeOf(proto)
    }

    return Object.getPrototypeOf(n) === proto
}
