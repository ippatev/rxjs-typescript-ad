import { from } from 'rxjs'
import {take} from "rxjs/operators";

const arr = [1, 2, 3]
const arr$ = from(arr)

function* generateDoubles(seed) {
    let i = seed;
    while(true) {
        yield i;
        i = 2 * i;
    }
}

const iterator = generateDoubles(3)
const iterator$ = from(iterator).pipe(take(3))

const map = new Map();
map.set(0, 'zero');
map.set(1, 'one');

const map$ = from(map);


export {
    arr$,
    iterator$,
    map$
}
