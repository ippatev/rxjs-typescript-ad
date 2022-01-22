import {ajax} from 'rxjs/ajax';
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs";

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const todos$ = ajax.getJSON(`${BASE_URL}/todos`)
    .pipe(
        tap((data) => {
            console.log('side effects with tap operator. ', data[0].userId)
        }),
        catchError((err) => of(err))
    )

/**
 * @return ajax data model
 */
const users$ = ajax({
    responseType: 'GET',
    url: `${BASE_URL}/users`,
    headers: {
        'Content-Type': 'application/json',
        'custom-header': 'hello',
    },
    /**
     * @description Dude, you can't attach a body to a get request,
     * are you kidding me?
     */
    body: null
})

export {
    todos$,
    users$
}
