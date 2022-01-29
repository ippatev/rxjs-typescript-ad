import {map, tap} from 'rxjs/operators'
import {of} from "rxjs";

const sampleNums$ = of(1, 2, 3)

const tapNums$ = sampleNums$.pipe(
    tap(_ => {
        console.log('***before***')
    }),
    map((x) => Math.pow(x, x)),
    tap(_ => {
        console.log('***after***')
    })
)

export {
    tapNums$
}
