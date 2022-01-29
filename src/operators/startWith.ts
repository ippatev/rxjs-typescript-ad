import {startWith, take} from 'rxjs/operators'
import {interval} from "rxjs";

const sampleInterval$ = interval(500)

const startWithInterval$ = sampleInterval$.pipe(
    take(4),
    startWith(-3, -2, -1),
)

export {
    startWithInterval$
}
