import {forkJoinExample$} from './operators'

forkJoinExample$.subscribe((x) => {
    console.log(x)
}, null, () => {
    console.log('complete!')
})
