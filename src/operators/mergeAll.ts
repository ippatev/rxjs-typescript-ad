import {concatAll, map, mergeAll, take} from 'rxjs/operators'
import {fromEvent, interval} from "rxjs";

const click$ = fromEvent(document, 'click');
const clickWithHigherOrderObservable$ = click$.pipe(
    map((event: MouseEvent) => {
        return interval(500).pipe(
            take(5)
        )
    }),
    mergeAll()
)

export {
    clickWithHigherOrderObservable$
}
