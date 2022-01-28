import {endWith, observeOn, startWith, take} from 'rxjs/operators'
import {animationFrameScheduler, interval, of} from "rxjs";

const sampleInterval$ = interval(50).pipe(
    take(300)
)

const intervalWithAnimationFrame$ = sampleInterval$.pipe(
    startWith('animationFrameScheduler: start'),
    observeOn(animationFrameScheduler),
    endWith(of('animationFrameScheduler: end')),
)

const intervalWithAsync$ = sampleInterval$.pipe(
    startWith('asyncScheduler: start'),
    endWith(of('asyncScheduler: end')),
)

export {
    intervalWithAnimationFrame$,
    intervalWithAsync$
}
