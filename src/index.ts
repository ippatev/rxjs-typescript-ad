import {
    intervalWithAnimationFrame$,
    intervalWithAsync$,
    reduceClicks$,
    retryInterval$,
    scanClicks$,
    scanSubject$, subject$
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

reduceClicks$.subscribe(x => {
    console.log(x)
})

scanClicks$.subscribe(x => {
    console.log(x)
})

scanSubject$.subscribe(x => {
    console.log(x)
})

subject$.next({id: 0})
subject$.next({name: 'Pupkin'})
subject$.next({age: 42})
