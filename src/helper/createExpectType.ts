/**
* @fileoverview 创建预期的数据类型错误提示信息.
* @author Luoob
*/

export type DataType = 
    | 'bigint'
    | 'boolean'
    | 'function'
    | 'number'
    | 'object'
    | 'string'
    | 'symbol'
    | 'undefined'

export function createExpectType(expect: DataType, current: any) {
    return `expect a ${expect}, but got ${typeof current}`
}