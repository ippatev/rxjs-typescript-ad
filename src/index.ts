import { ticker$ } from './operators'

ticker$.subscribe((x) => {
    console.log(x)
})
