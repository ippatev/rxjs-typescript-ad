import { zipUser$ } from './operators/zip'

zipUser$.subscribe(user => {
    console.log(user)
})
