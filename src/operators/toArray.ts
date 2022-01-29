import {take, toArray} from 'rxjs/operators'
import {interval} from "rxjs";

const sampleInterval$ = interval(500);

const takeThreeNumsToArr$ = sampleInterval$.pipe(
    take(3),
    toArray()
)

export {
    takeThreeNumsToArr$
}
