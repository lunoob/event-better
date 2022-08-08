declare namespace IEvent {
    export type Key = string | number | Symbol

    export type Listener = {
        <T>(payload?: T): any
    }

    export type OnConfig = {
        key: Key
        callback: Listener
    }

    export type RemoveConfig = {
        key?: Key
        callback?: Listener
    }

    export type EmitByKeyOption = {
        key: string | number | Symbol
        payload?: any
    }
}
