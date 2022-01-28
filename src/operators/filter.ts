import { filter } from 'rxjs/operators'
import {from} from "rxjs";

const arr$ = from([1, 2, 3])

const arrWithFilter$ = arr$.pipe(
    filter((x) => x % 2 === 0)
)

export {
    arrWithFilter$
}
