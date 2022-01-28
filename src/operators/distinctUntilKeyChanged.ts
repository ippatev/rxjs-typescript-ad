import { distinctUntilKeyChanged } from 'rxjs/operators'
import {of} from "rxjs";

interface Person {
    id: number;
    username: string
}

const samplePerson: (id: number) => Person = (id: number) => ({
    id: id,
    username: 'Vasya Pupkin'
})

const personsWithDistinctUntilKeyChanged$ = of(samplePerson(1), samplePerson(2), samplePerson(3)).pipe(
    distinctUntilKeyChanged('id')
)

export {
    personsWithDistinctUntilKeyChanged$
}
