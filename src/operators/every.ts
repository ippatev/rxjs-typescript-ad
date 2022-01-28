import { every } from 'rxjs/operators'
import {of} from "rxjs";

const nums$ = of(1, 2, 3)

const everyNumsLessThanFive$ = nums$.pipe(
    every(x => x < 5)
)

export {
    everyNumsLessThanFive$
}
