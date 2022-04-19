export namespace IEvent {
    export type EventType = 'connect' | 'accountChanged' | 'disconnect' | 'connected'
    export interface OnConfig {
        key?: string | number | Symbol
        callback?: () => any
    }
}