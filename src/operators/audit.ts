import {audit, map} from 'rxjs/operators'
import {fromEvent, interval} from "rxjs";

const clicksAuditWithInterval$ = fromEvent(document, 'click').pipe(audit((event) => {
    return interval(1000)
}));

export {
    clicksAuditWithInterval$
}

