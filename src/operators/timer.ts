import { timer } from 'rxjs'
import {take} from "rxjs/operators";

const timer$ = timer(3000, 1000).pipe(take(3))

export {
    timer$
}
