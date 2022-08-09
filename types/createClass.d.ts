/**
* @fileoverview event plus class
* @author Luoob
*/
import { IEvent } from './types/iEvent';
export declare class EventBetter<T extends string> {
    private channel;
    private coverChannel;
    constructor();
    /**
     * listen event
     * @param {IEvent.EventType} type
     * @param {IEvent.Listener | IEvent.OnConfig} config
     * @returns {void}
     */
    on(type: T, config: IEvent.Listener | IEvent.OnConfig): void;
    /**
     * listen event
     * @param {T} type
     * @param {IEvent.Listener} fn
     * @returns {void}
     */
    cover(type: T, fn: IEvent.Listener): void;
    /**
     * trigger event
     * @param {T} type
     * @param {any} payload
     * @returns {void}
     */
    emit(type: T, payload?: any): void;
    /**
     * tigger event listener by key
     * Only when the key is equal can it be executed
     * @param {T} type
     * @param {IEvent.EmitByKeyOption} option
     * @returns {void}
     */
    emitByKey(type: T, option: IEvent.EmitByKeyOption): void;
    /**
     * remove event listener
     * @param {T} type
     * @param {IEvent.Listener | IEvent.RemoveConfig} config
     * @returns {void}
     */
    remove(type: T, config: IEvent.Listener | IEvent.RemoveConfig): boolean | undefined;
    /**
     * remove listen event
     * @param {T} type
     * @returns {void}
     */
    removeCover(type: T): void;
    /**
     * 移除所有监听器
     * @param {T} type
     * @returns {void}
     */
    removeAll(type: T): void;
}
