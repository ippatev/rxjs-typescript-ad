import {endWith, map, startWith, takeUntil} from 'rxjs/operators'
import {fromEvent, interval, of} from "rxjs";

const clicks$ = fromEvent(document, 'click').pipe(map(() => true))

const ticker$ = interval(1000).pipe(
    startWith('start'),
    map((x) => {
        return typeof x === 'number' ? 'tick' : x
    }),
    takeUntil(clicks$),
    endWith(of('ticker stopped when clicked'))
)

export {
    ticker$
}
