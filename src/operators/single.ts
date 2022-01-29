import { single } from 'rxjs/operators'
import {of} from "rxjs";

const sampleNames$ = of(
    {name: 'Ben'},
    {name: 'Tracy'},
    {name: 'Laney'},
    {name: 'Lily'}
)

const sampleNames1$ = of(
    {name: 'Ben'},
    {name: 'Tracy'},
    {name: 'Laney'},
    {name: 'Billy'}
)

const sampleNames2$ = of(
    {name: 'Jen'},
    {name: 'Tracy'},
    {name: 'Laney'},
    {name: 'Lily'}
)

const singleName$ = sampleNames$.pipe(
    single((x) => x.name.startsWith('B'))
)

const singleNameSeq$ = sampleNames1$.pipe(
    single((x) => x.name.startsWith('B'))
)

const singleNameNotFound$ = sampleNames2$.pipe(
    single((x) => x.name.startsWith('B'))
)

export {
    singleName$,
    singleNameSeq$,
    singleNameNotFound$
}
