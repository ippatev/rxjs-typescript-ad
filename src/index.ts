import { personsWithDistinctUntilKeyChanged$ } from './operators'

personsWithDistinctUntilKeyChanged$.subscribe(x => {
    console.log(x)
})
