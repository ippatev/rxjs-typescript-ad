import {ajax} from 'rxjs/ajax';
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs";

const todos$ = ajax.getJSON('https://jsonplaceholder.typicode.com/todos')
    .pipe(
        tap((data) => {console.log('side effects with tap operator. ',data[0].userId)}),
        catchError((err) => of(err))
    )

export {todos$}
