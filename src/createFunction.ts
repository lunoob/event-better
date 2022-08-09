/**
* @fileoverview event plus function.
* @author Luoob
*/

import { EventBetter } from './createClass'

export function createEventBetter<T extends string> () {
    return new EventBetter<T>()
}
