import {concatAll, concatMap, delay, map} from 'rxjs/operators';
import {of} from "rxjs";

const source$ = of(1, 2, 3)

const concatMap$ = source$.pipe(
    concatMap((x) => {
        return of(`num ${x}`).pipe(delay(x))
    })
)

const examplePromise = (x) => new Promise(resolve => {
    setTimeout(() => {
        resolve(x)
    }, 5000)
})

const promiseWithConcatMap$ =source$.pipe(concatMap(x => examplePromise(x)))


export {
    concatMap$,
    promiseWithConcatMap$
}
