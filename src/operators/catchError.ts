import { catchError } from 'rxjs/operators'
import {of, throwError} from "rxjs";

const source$ = throwError('error!')
const catchError$ = source$.pipe(catchError(err => {
    return of(`error msg:  ${err}`)
}))

export {
    catchError$
}
