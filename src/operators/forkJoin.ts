import {forkJoin, of, timer} from 'rxjs'

const forkJoinExample$ = forkJoin({
    foo: of(1, 2, 3),
    bar: Promise.resolve(3),
    baz: timer(3000)
})

export {
    forkJoinExample$
}
