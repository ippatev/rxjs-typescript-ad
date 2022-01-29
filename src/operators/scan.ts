import {fromEvent, interval, Subject} from "rxjs";
import {defaultIfEmpty, mapTo, scan, takeUntil} from "rxjs/operators";

const clicks$ = fromEvent(document, 'click')

const clicksInThreeSec$ = clicks$.pipe(
    takeUntil(interval(3000))
)

const ones$ = clicksInThreeSec$.pipe(
    mapTo(1)
)

const scanClicks$ = ones$.pipe(
    scan((acc, x) => acc + x, 0),
    defaultIfEmpty(0)
)

const subject$ = new Subject()
const scanSubject$ = subject$.pipe(
    scan((acc, x) => ({...acc, ...x}), {})
)

export {
    scanClicks$,
    scanSubject$,
    subject$
}
