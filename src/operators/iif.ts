import {iif, of} from 'rxjs'
import {defaultIfEmpty, map, mapTo} from "rxjs/operators";

/**
 * @description iif - like ifElse ramdajs operator
 */
const firstOrSecond = (x) => iif(
    () => x,
    of('first'),
    of('second'),
).pipe(map((x) => `${x}!`))

export {
    firstOrSecond
}
