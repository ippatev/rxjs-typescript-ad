import {concat, of, throwError} from 'rxjs'

const error$ = concat(of(0), throwError(new Error('oops!')))

export {
    error$
}
