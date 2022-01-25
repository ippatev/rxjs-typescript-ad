import { concatAll$, concatAllWithThreeSubs$ } from './operators'

/*
concatAll$.subscribe((event) => {
    console.log(event)
})
 */

concatAllWithThreeSubs$.subscribe(event => {
    console.log(event)
})
