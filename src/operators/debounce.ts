import { debounce } from 'rxjs/operators'
import {fromEvent, interval} from "rxjs";

const clicks$ = fromEvent(document, 'click');
const debounce$ = clicks$.pipe(debounce(() => interval(500)))

export {
    debounce$
}
