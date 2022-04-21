/*!
* @Author: luoob
* @Last Modified by: luoob
* @Instruduction: event plus
*/
import { IEvent } from './event';
declare class IEventManager {
    private channel;
    private coverChannel;
    constructor();
    on(type: IEvent.EventType, config: () => void): void;
    on(type: IEvent.EventType, config: IEvent.OnConfig): void;
    cover(type: IEvent.EventType, fn: () => void): void;
    removeCover(type: IEvent.EventType): void;
    emit(type: IEvent.EventType, payload?: any): void;
    remove(type: IEvent.EventType, config: () => void): boolean | undefined;
    remove(type: IEvent.EventType, config: IEvent.OnConfig): boolean | undefined;
}
declare const _default: IEventManager;
export default _default;
