import {
    intervalWithAnimationFrame$,
    intervalWithAsync$,
    reduceClicks$,
    retryInterval$,
    scanClicks$,
    scanSubject$, singleName$, singleNameNotFound$, singleNameSeq$, subject$
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

singleName$.subscribe(x => {
    console.log(x)
})

singleNameSeq$.subscribe(null,  x => {
    console.error(x)
})

singleNameNotFound$.subscribe(x => {
    console.log(x)
})

/* ---- END ---- */
