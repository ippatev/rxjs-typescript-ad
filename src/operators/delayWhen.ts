import { delayWhen } from 'rxjs/operators'
import {fromEvent, interval} from "rxjs";

const clicks$ = fromEvent(document, 'click')
const delayedWhenClicks$ = clicks$.pipe(
    delayWhen((event) => interval(Math.random() * 5000))
)

export {
    delayedWhenClicks$
}
