import {distinct, tap} from 'rxjs/operators'
import {from, Observable, of} from "rxjs";

const arr$ = from([1, 1, 2, 2, 1, 3, 3, 2, 1])
const obj$ = of({id: 1, name: 'Foo'}, {id: 2, name: 'Bar'}, {id: 3, name: 'Baz'}, {id: 2, name: 'Boa'})

const distinctArr$ = arr$.pipe(
    distinct(),
)

const distinctObj$ = obj$.pipe(distinct((x) => {
    return x.id
}))

export {
    distinctArr$,
    distinctObj$
}
