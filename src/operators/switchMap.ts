import { switchMap } from 'rxjs/operators'
import {fromEvent, interval} from "rxjs";

const click$ = fromEvent(document, 'click')
const switchIntervalWhenClick$ = click$.pipe(
    switchMap(_=> interval(500))
)

export {
    switchIntervalWhenClick$
}
