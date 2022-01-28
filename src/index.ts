import {mapInNums$, mapToTheClicks$} from './operators'

mapInNums$.subscribe(x => {
    console.log(x)
})

mapToTheClicks$.subscribe(x => {
    console.log(x)
})
