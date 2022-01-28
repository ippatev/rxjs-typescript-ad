import {take, map, combineAll, tap} from 'rxjs/operators';
import { interval } from 'rxjs';

// emit every 1s, take 2
const source$ = interval(1000).pipe(take(2));
// map each emitted value from source to interval observable that takes 5 values
const combineAll$ = source$.pipe(
    map(val =>
        interval(1000).pipe(
            map(i => `Result (${val}): ${i}`),
            take(1)
        )
    ),
    combineAll()
)

/*
  2 values from source will map to 2 (inner) interval observables that emit every 1s.
  combineAll uses combineLatest strategy, emitting the last value from each
  whenever either observable emits a value
*/

export {
    combineAll$
}
