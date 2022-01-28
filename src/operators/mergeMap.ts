import {delay, mergeMap} from 'rxjs/operators'
import {fromEvent, of} from "rxjs";

interface Location {
    x: number;
    y: number;
    timestamp: number;
}

const click$ = fromEvent(document, 'click')

const saveLocation = (location: Location) => {
    return of(location).pipe(delay(500))
}

const saveLocationWhenClick$ = click$.pipe(
    mergeMap((event: MouseEvent) => {
        return saveLocation({
            x: event.clientX,
            y: event.clientY,
            timestamp: Date.now()
        })
    })
)

const samplePromise = x => {
    return new Promise(resolve => {
        resolve(`${x} World from promise`)
    })
}

const msg$ = of('Hello')

const msgWithPromise$ = msg$.pipe(
    mergeMap(
        (x) => samplePromise(x),
        (valFromMsg, valueFromPromise) => {
            return `Input: ${valFromMsg}, Result: ${valueFromPromise}`
        },
        1
    )
)



export {
    saveLocationWhenClick$,
    msgWithPromise$
}
