/**
* @fileoverview 创建预期的数据类型错误提示信息.
* @author Luoob
*/
export declare type DataType = 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined';
export declare function createExpectType(expect: DataType, current: any): string;
