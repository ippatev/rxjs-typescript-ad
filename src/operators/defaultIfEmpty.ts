import {defaultIfEmpty, filter, map, takeUntil, tap} from 'rxjs/operators'
import {fromEvent, interval, timer} from "rxjs";

const space$ = fromEvent(document, 'keydown');
const spaceBeforeTwoSecs$ = space$.pipe(
    takeUntil(interval(2000)),
    filter((event: KeyboardEvent) => event.code.toLowerCase() === 'space'),
    map((x) => x.code),
    defaultIfEmpty('not Space')
)

export {
    spaceBeforeTwoSecs$
}
