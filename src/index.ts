import {distinctArr$, distinctObj$, distinctUntilChangedArr$, distinctUntilChangedObjs$} from './operators'

distinctArr$.subscribe((x) => {
    console.log(x)
})

distinctObj$.subscribe(x => {
    console.log(x)
})

distinctUntilChangedObjs$.subscribe(x => {
    console.log(x)
})
