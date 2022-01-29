import {
    intervalWithAnimationFrame$,
    intervalWithAsync$, lastUrl$,
    reduceClicks$,
    retryInterval$, routeEnd$, sampleTimer$,
    scanClicks$,
    scanSubject$, sharedTimer$, singleName$, singleNameNotFound$, singleNameSeq$, subject$
} from './operators'
import {concat} from "rxjs";

/*
intervalWithAnimationFrame$.subscribe(x => {
    console.log('animation frame ', x)
})

intervalWithAsync$.subscribe(x => {
    console.log('async ', x)
})
 */

const msgElement: HTMLHeadElement = document.getElementById('msg') as HTMLHeadElement

concat(
    intervalWithAnimationFrame$,
    intervalWithAsync$
).subscribe(x => {
    /* console.log(x) */
    msgElement.textContent = x.toString();
})

/* ---- START ---- */

/*
sampleTimer$.subscribe(x => {
    console.log(x)
})

sampleTimer$.subscribe(x => {
    console.log(x)
})
 */

const sampleUrl = {
    data: {},
    url: 'https://localhost'
}


lastUrl$.subscribe(x => {
    console.log(x)
})

routeEnd$.next(sampleUrl)

lastUrl$.subscribe(x => {
    console.log(x)
})

/* ---- END ---- */
