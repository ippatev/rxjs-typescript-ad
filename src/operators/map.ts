import { map } from 'rxjs/operators'
import {of} from "rxjs";

const nums$ = of(1, 2, 3)

const mapInNums$ = nums$.pipe(
    map(x => x * 2)
)

export {
    mapInNums$
}
