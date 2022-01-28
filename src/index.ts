import {intervalWithAnimationFrame$, intervalWithAsync$, intervalWithPairwise$, userWithPluck$} from './operators'
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

intervalWithPairwise$.subscribe(x => {
    console.log(x)
})

userWithPluck$.subscribe(x => {
    console.log(x)
})
