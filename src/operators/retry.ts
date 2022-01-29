import {mergeMap, retry, sample} from 'rxjs/operators'
import {iif, interval, of, throwError} from "rxjs";

const sampleInterval$ = interval(1000)
const retryInterval$ = sampleInterval$.pipe(
   mergeMap(x => {
       if (x > 3) {
           return throwError('error')
       }
       return of(x)
   }),
    retry(2)
)

export {
    retryInterval$
}
