import { subscribeOn } from 'rxjs/operators'
import {asyncScheduler, merge, of} from "rxjs";

const a = of(1, 2, 3).pipe(
    subscribeOn(asyncScheduler)
)
const b = of(-3, -2, -1)

const subscribeOnAB$ = merge(
    a,
    b
)

export {
    subscribeOnAB$
}
