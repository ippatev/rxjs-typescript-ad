import {
    intervalWithAnimationFrame$,
    intervalWithAsync$,
    lastUrl$,
    reduceClicks$,
    retryInterval$,
    routeEnd$, sampleSubject$,
    sampleTimer$,
    scanClicks$,
    scanSubject$,
    sharedTimer$,
    singleName$,
    singleNameNotFound$,
    singleNameSeq$,
    skipThreeValuesInInterval$,
    startWithInterval$,
    subject$, subscribeOnAB$, switchIntervalWhenClick$, takeOneNum$, takeThreeNumsToArr$, takeUntilInterval$, tapNums$
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

takeThreeNumsToArr$.subscribe(x => {
    console.log(x)
}, null, () => {
    console.log('hi, my name is Complete John!')
})

/* ---- END ---- */
