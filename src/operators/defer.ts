import {defer, merge, of, timer} from 'rxjs'
import {switchMap} from "rxjs/operators";

const s1 = of(new Date());
const s2 = defer(() => of(new Date()));

console.log(new Date())

const deferExample$ = timer(3000)
    .pipe(switchMap(_ => merge(s1, s2)))

export {
    s1,
    s2,
    deferExample$
}
