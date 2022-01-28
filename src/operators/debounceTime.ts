import {debounceTime, filter} from 'rxjs/operators'
import {fromEvent} from "rxjs";

const enter$ = fromEvent(document, 'keyup')
const enterWithDebounceTime$ = enter$.pipe(
    debounceTime(500),
    filter((event: KeyboardEvent) => {
        return (event.key as string).toLowerCase() === 'enter'
    }),
)

export {
    enterWithDebounceTime$
}
