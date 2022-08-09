export declare namespace IEvent {
    type Key = string | number | Symbol;
    type Listener = {
        <T>(payload?: T): any;
    };
    type OnConfig = {
        key: Key;
        callback: Listener;
    };
    type RemoveConfig = {
        key?: Key;
        callback?: Listener;
    };
    type EmitByKeyOption = {
        key: string | number | Symbol;
        payload?: any;
    };
}
