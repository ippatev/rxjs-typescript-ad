import { distinctUntilChanged } from 'rxjs/operators'
import {from} from "rxjs";

const sampleObj = {
    id: 1
}

const arr$ = from([1, 1, 2, 2, 1, 3, 3, 2, 1])
const objs$ = from([sampleObj, {...sampleObj}, sampleObj])

const distinctUntilChangedArr$ = arr$.pipe(
    distinctUntilChanged()
)
const distinctUntilChangedObjs$ = objs$.pipe(
    distinctUntilChanged((x, y) => x.id === y.id)
)

export {
    distinctUntilChangedArr$,
    distinctUntilChangedObjs$
}
