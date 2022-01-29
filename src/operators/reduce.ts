import {mapTo, reduce, takeUntil} from 'rxjs/operators'
import {fromEvent, interval} from "rxjs";

const clicks$ = fromEvent(document, 'click')

const clicksInThreeSec$ = clicks$.pipe(
    takeUntil(interval(3000))
)

const ones$ = clicksInThreeSec$.pipe(
    mapTo(1)
)

const reduceClicks$ = ones$.pipe(
    reduce((acc, x) => acc + x, 0)
)

export {
    reduceClicks$
}
