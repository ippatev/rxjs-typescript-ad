import { mapTo } from 'rxjs/operators'
import {fromEvent} from "rxjs";

const clicks$ = fromEvent(document, 'click')

const mapToTheClicks$ = clicks$.pipe(
    mapTo('click')
)

export {
    mapToTheClicks$
}
