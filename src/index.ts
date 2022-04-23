/*!
* @Author: luoob
* @Last Modified by: luoob
* @Instruduction: event plus
*/

import { isPlainObject } from 'lodash-es'
import { IEvent } from './types/event'

class IEventManager<T extends string> {
    private channel: Record<any, Map<any, null | (() => void)>>
    private coverChannel: Record<any, null | (() => void)>
    
    constructor() {
        this.channel = {}
        this.coverChannel = {}
    }

    /**
     * listen event
     * @param {IEvent.EventType} type
     * @param {(() => void) | IEvent.OnConfig} config
     * @returns {any}
     */
    on(type: T, config: (() => void) | IEvent.OnConfig) {
        if (config == null) {
            return
        }

        const curMap: null | Map<any, any> = this.channel[type]
        let fn: any = null
        let key: any = curMap != null ? curMap.size + 1 : 1

        if (isPlainObject(config)) {
            key = (config as IEvent.OnConfig).key
            fn = (config as IEvent.OnConfig).callback
        }

        if (curMap) {
            curMap.set(key, fn)
        } else {
            const map = new Map([ [key, fn] ])
            this.channel[type] = map
        }
    }

    /**
     * listen event
     * @param {T} type
     * @param {Function} fn
     * @returns {any}
     */
    cover(type: T, fn: () => void) {
        this.coverChannel[type] = fn
    }

    /**
     * trigger event
     * @param {T} type
     * @param {any} payload
     * @returns {any}
     */
    emit(type: T, payload?: any) {
        const fnMap = this.channel[type] 
        let fnList = fnMap ? Array.from(fnMap.values()) : []
        // @ts-ignore
        fnList.filter(Boolean).forEach(fn => fn(payload))

        this.coverChannel[type] && this.coverChannel[type]!()
    }

    /**
     * remove event listener
     * @param {T} type
     * @param {(() => void) | IEvent.OnConfig} config
     * @returns {any}
     */
    remove(type: T, config: (() => void) | IEvent.OnConfig) {
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
        if (isPlainObject(config)) {
            key = (config as IEvent.OnConfig).key
            fn = (config as IEvent.OnConfig).callback
        }

        if (key) {
            return curMap.delete(key)
        }

        // 根据对象引用来删除函数
        const listeners = Array.from(curMap.values())
        if (!listeners) {
            return
        }
        const keys = Array.from(curMap.keys())
        const idx = listeners.findIndex(listener => listener === fn)
        listeners.splice(idx, 1)
        keys.splice(idx, 1)
        if (listeners.length <= 0) {
            curMap.delete(key)
        }
    }

    /**
     * remove listen event
     * @param {T} type
     * @returns {any}
     */
    removeCover(type: T) {
        this.coverChannel[type] = null
    }

    /**
     * 移除所有监听器
     * @param {T} type
     * @returns {any}
     */
    removeAll(type: T) {
        this.channel[type] = new Map()
    }
}

export default IEventManager