import { bufferTime$ } from './operators'

bufferTime$.subscribe(event => {
    console.log(event)
})
