import {mapTo, share, tap} from 'rxjs/operators'
import {timer} from "rxjs";

const _sampleTimer$ = timer(1000)
const sampleTimer$ = _sampleTimer$.pipe(
    tap(() => console.log('***side_effect***')),
    mapTo('***result***')
)

const sharedTimer$ = sampleTimer$.pipe(
    share()
)

export {
    sampleTimer$,
    sharedTimer$
}
