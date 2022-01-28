import {pairwise, take} from 'rxjs/operators'
import {interval} from "rxjs";

const sampleInterval$ = interval(500).pipe(
    take(10)
)

const intervalWithPairwise$ = sampleInterval$.pipe(
    pairwise()
)

export {
    intervalWithPairwise$
}
