import { find } from 'rxjs/operators'
import {from} from "rxjs";

interface User {
    id: number;
    name: string;
}

const user1: User = {
    id: 1,
    name: 'Foo'
}

const user2: User = {
    id: 2,
    name: 'Bar'
}

const user3: User = {
    id: 3,
    name: 'Baz'
}


const arr$ = from([user1, user2, user3])

const findBazInArr$ = arr$.pipe(
    find((x) => x.name === 'Baz')
)

export {
    findBazInArr$
}
