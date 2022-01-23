import { interval } from 'rxjs'
import {take} from "rxjs/operators";

const nums$ = interval(1000)
    .pipe(take(3))

export {
    nums$
}
