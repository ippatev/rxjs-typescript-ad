import { of } from 'rxjs'

const ofNums$ = of(10, 20, 30)
const ofArr$ = of([10, 20, 30])

export {
    ofNums$,
    ofArr$
}
