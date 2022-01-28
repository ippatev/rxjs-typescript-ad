import { ignoreElements } from 'rxjs/operators'
import {iif, of} from "rxjs";

const words$ = of('hello', 'world')

const ignoreWords$ = words$.pipe(
    ignoreElements()
)

export {
    ignoreWords$
}
