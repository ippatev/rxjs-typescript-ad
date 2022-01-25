import {fromEvent, interval, merge} from 'rxjs'
import {take} from "rxjs/operators";

const clicks$ = fromEvent(document, 'click');
const timer$ = interval(1000);
const clicksOrTimer$ = merge(clicks$, timer$);

const timer$1 = interval(1000).pipe(take(10));
const timer$2 = interval(2000).pipe(take(6));
const timer$3 = interval(500).pipe(take(10));

const concurrent = 1;

const merged$ = merge(timer$1, timer$2, timer$3, concurrent)


export {
    clicksOrTimer$,
    merged$
}
