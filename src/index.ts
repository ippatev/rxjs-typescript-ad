import { firstOrSecond, nums$, error$, timer$ } from './operators'

firstOrSecond(false).subscribe((x) => {
    console.log('x is', x)
})

nums$.subscribe((x) => {
    console.log('num ', x)
})

error$.subscribe(err => {
    console.info(err)
})

timer$.subscribe((x) => {
    console.log('timer ', x)
})
