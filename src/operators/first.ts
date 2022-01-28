import { first } from 'rxjs/operators'
import {fromEvent} from "rxjs";

const clicks$ = fromEvent(document, 'click');

const firstClick$ = clicks$.pipe(first())

export {
    firstClick$
}
