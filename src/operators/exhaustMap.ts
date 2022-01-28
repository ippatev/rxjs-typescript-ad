import {exhaustMap, take} from 'rxjs/operators'
import {fromEvent, interval} from "rxjs";

const clicks$ = fromEvent(document, 'click')

const waitFiveSec$ = interval(1000).pipe(take(5));

const clicksWithExhaustMap$ = clicks$.pipe(
    exhaustMap(() => waitFiveSec$)
)

export {
    clicksWithExhaustMap$
}
