import {of, zip} from 'rxjs'
import {map} from "rxjs/operators";

const age$ = of<number>(12, 23, 34);
const name$ = of<string>('foo', 'bar', 'baz');
const isDev$ = of<boolean>(true, false, true);

const zipUser$ = zip(age$, name$, isDev$)
    .pipe(
        map(([age, name, isDev]) => {
            return {
                age,
                name,
                isDev
            }
        })
    )

export {
    zipUser$
}
