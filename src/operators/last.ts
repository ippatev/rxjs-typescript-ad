import { last } from 'rxjs/operators'
import {from} from "rxjs";

const arr$ = from([1, 2, 3])

const lastInArr$ = arr$.pipe(
    last()
)

const lastInArrIsMoreThanThree$ = arr$.pipe(
    last((x) => x > 2, 'none')
)

export {
    lastInArr$,
    lastInArrIsMoreThanThree$
}
