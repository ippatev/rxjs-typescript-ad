import {switchMap, take} from 'rxjs/operators';
import {combineLatest, concat, forkJoin, interval, range} from "rxjs";

const timer$ = interval(1000).pipe(take(3));
const sequence$ = range(0, 3)
const counter$ = combineLatest(timer$, sequence$)

export {
    counter$
}

