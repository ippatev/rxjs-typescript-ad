import {pluck, share, shareReplay, tap} from 'rxjs/operators'
import {Subject} from "rxjs";

interface Url {
    data: unknown;
    url: string;
}

const routeEnd$ = new Subject<Url>()

const lastUrl$ = routeEnd$.pipe(
    tap(_ => console.log('executed')),
    pluck('url'),
    shareReplay()
)


export {
    routeEnd$,
    lastUrl$
}
