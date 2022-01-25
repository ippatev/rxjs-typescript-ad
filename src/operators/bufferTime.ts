import { bufferTime } from 'rxjs/operators'
import {interval, Observable, of} from "rxjs";

const source$ = new Observable((observer) => {
    observer.next(1)
    observer.next(2)
    observer.next(3)

    setTimeout(() => {
       observer.next(4)
        observer.next(5)
        observer.next(6)
    }, 2000)

    setTimeout(() => {
        observer.complete()
    }, 4000)
})

const bufferTime$ = source$.pipe(bufferTime(2000));

export {
    bufferTime$
}
