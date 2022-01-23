import { fromEvent } from 'rxjs'

const clicks$ = fromEvent(document, 'click') ;

export {
    clicks$
}
