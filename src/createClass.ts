/**
* @fileoverview event plus class
* @author Luoob
*/

import { isFunction, isPlainObject } from 'lodash'
import { IEvent } from './types/event'
import { createExpectType } from './helper'

export class EventBetter<T extends string> {
    private channel: Record<string, Map<IEvent.Key, null | IEvent.Listener>>
    private coverChannel: Record<string, null | IEvent.Listener>

    constructor () {
        this.channel = {}
        this.coverChannel = {}
    }

    /**
     * listen event
     * @param {IEvent.EventType} type
     * @param {IEvent.Listener | IEvent.OnConfig} config
     * @returns {void}
     */
    on (type: T, config: IEvent.Listener | IEvent.OnConfig) {
        if (config == null) {
            return
        }

        const curMap: null | Map<IEvent.Key, any> = this.channel[type]
        let fn: any = config
        // 自动生成一个 key 值
        let key: IEvent.Key = curMap != null ? curMap.size + 1 : 1

        if (isPlainObject(config)) {
            key = (config as IEvent.OnConfig).key ?? key
            fn = (config as IEvent.OnConfig).callback ?? config
        }

        if (curMap) {
            curMap.set(key, fn)
        } else {
            const map = new Map([[key, fn]])
            this.channel[type] = map
        }
    }

    /**
     * listen event
     * @param {T} type
     * @param {IEvent.Listener} fn
     * @returns {void}
     */
    cover (type: T, fn: IEvent.Listener) {
        this.coverChannel[type] = fn
    }

    /**
     * trigger event
     * @param {T} type
     * @param {any} payload
     * @returns {void}
     */
    emit (type: T, payload?: any) {
        const fnMap = this.channel[type]
        const fnList = fnMap ? Array.from(fnMap.values()) : []
        // @ts-ignore
        fnList.filter(Boolean).forEach(fn => isFunction(fn) && fn(payload))

        const coverFn = this.coverChannel[type]
        coverFn && isFunction(coverFn) && coverFn()
    }

    /**
     * tigger event listener by key
     * Only when the key is equal can it be executed
     * @param {T} type
     * @param {IEvent.EmitByKeyOption} option
     * @returns {void}
     */
    emitByKey (type: T, option: IEvent.EmitByKeyOption) {
        if (!isPlainObject(option)) {
            throw new TypeError(createExpectType('object', option))
        }

        const fnMap = this.channel[type]
        // 获取到目标函数
        const tagetFn = fnMap.get(option.key)

        tagetFn && isFunction(tagetFn) && tagetFn(option.payload)
    }

    /**
     * remove event listener
     * @param {T} type
     * @param {IEvent.Listener | IEvent.RemoveConfig} config
     * @returns {void}
     */
    remove (type: T, config: IEvent.Listener | IEvent.RemoveConfig) {
        if (config == null) {
            return
        }

        let key: any = null
        let fn: any = config

        // 判断当前函数列表是否为空
        const curMap = this.channel[type] || new Map()
        if (curMap.size <= 0) {
            return
        }

        // 是否是配置类型
        if (isPlainObject(config) && Object.keys(config).length > 0) {
            key = (config as IEvent.RemoveConfig).key
            fn = (config as IEvent.RemoveConfig).callback
        }

        if (key) {
            return curMap.delete(key)
        }

        // 根据对象引用来删除函数
        const listeners = Array.from(curMap.values())
        if (listeners.length <= 0) {
            return
        }
        const keys = Array.from(curMap.keys())
        const idx = listeners.findIndex(listener => listener === fn)

        if (idx !== -1) {
            // 删除 listener
            curMap.delete(keys[idx])
        }

        if (curMap.size <= 0) {
            delete this.channel[type]
        }
    }

    /**
     * remove listen event
     * @param {T} type
     * @returns {void}
     */
    removeCover (type: T) {
        this.coverChannel[type] = null
    }

    /**
     * 移除所有监听器
     * @param {T} type
     * @returns {void}
     */
    removeAll (type: T) {
        this.channel[type] = new Map()
    }
}
