import { take } from 'rxjs/operators'
import {of} from "rxjs";

const sampleNums$ = of(1, 2, 3)
const takeOneNum$ = sampleNums$.pipe(
    take(1)
)

export {
    takeOneNum$
}
