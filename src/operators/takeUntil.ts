import {delay, takeUntil} from 'rxjs/operators'
import {interval, Subject} from "rxjs";

const sampleInterval$ = interval(1000)
const sampleSubject$ = new Subject()
const emitComplete = sampleSubject$.pipe(
    delay(3000)
)

const takeUntilInterval$ = sampleInterval$.pipe(
    takeUntil(emitComplete)
)

export {
    sampleSubject$,
    takeUntilInterval$
}
