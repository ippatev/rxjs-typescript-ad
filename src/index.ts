import {  ignoreWords$ } from './operators'

ignoreWords$.subscribe(x => {
    console.log(x)
}, err => console.error(err), () => {
    console.log('hi, my name is Complete John!')
})
