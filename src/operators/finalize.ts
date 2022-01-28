import {finalize, first, take, takeUntil} from 'rxjs/operators'
import {interval} from "rxjs";

const waitFiveSec$ = interval(5000).pipe(
    first()
)

const timerWithFinalize$ = interval(1000).pipe(
    finalize(() => {
        console.log('hi, i am finalize sheet!')
    }),
    takeUntil(waitFiveSec$)
)

export {
    timerWithFinalize$
}
