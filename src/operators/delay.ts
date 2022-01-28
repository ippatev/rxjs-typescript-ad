import { delay } from 'rxjs/operators'
import {fromEvent} from "rxjs";

const clicks$ = fromEvent(document, 'keyup')
const delayedClicks$ = clicks$.pipe(
    delay(500)
)

export {
    delayedClicks$
}
