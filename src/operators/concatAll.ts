import {concatAll, map, take} from 'rxjs/operators'
import {interval, merge, of} from "rxjs";

const source$ = interval(2000)
const concatAll$ = source$.pipe(
    map(value => {
        return of(value + 1)
    }),
    concatAll()
)

const obs$1 = interval(1000).pipe(take(5))
const obs$2 = interval(500).pipe(take(2))
const obs$3 = interval(2000).pipe(take(1))

const concatAllWithThreeSubs$ = of(obs$1, obs$2, obs$3).pipe(concatAll());

export {
    concatAll$,
    concatAllWithThreeSubs$
}
