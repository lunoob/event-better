const toString = Object.prototype.toString

/**
 * Gets the toStringTag of n.
 * @param {any} n
 * @returns {string}
 */
export function getTag (n: any) {
    if (n == null) {
        return n === undefined ? '[object Undefined]' : '[object Null]'
    }

    return toString.call(n)
}
