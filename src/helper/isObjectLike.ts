/**
 * 检测数据类型是否是一个 object
 * @param {any} n
 * @returns {boolean}
 */
export function isObjectLike (n: any) {
    // typeof null -> 'object'
    return typeof n === 'object' && n !== null
}
