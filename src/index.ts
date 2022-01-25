import { clicksOrTimer$, merged$ } from './operators/merge'
import {ofArr$, ofNums$} from "./operators/of";

/*
clicksOrTimer$.subscribe(event => {
    console.log(event)
})
 */

merged$.subscribe(event => {
    console.log(event)
})

ofNums$.subscribe(num => {
    console.log(num)
})

ofArr$.subscribe(arr => {
    console.log(arr)
})
