import {combineLatest, concat, of, timer} from 'rxjs'
import {concatMap, defaultIfEmpty, filter, map, mergeMap, switchMap, tap} from "rxjs/operators";

const timerOne$ = timer(1000, 4000).pipe(filter(n => n <= 2));
const timerTwo$ = timer(2000, 4000).pipe(filter(n => n <= 2));
const timerThree$ = timer(3000, 4000).pipe(filter(n => n <= 2));

const timers$ =  concat(timerOne$, timerTwo$, timerThree$)

export {
    timers$
}
