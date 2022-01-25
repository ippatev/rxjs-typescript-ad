import { auditTime } from 'rxjs/operators'
import {fromEvent} from "rxjs";

const clicksAudit$ = fromEvent(document, 'click').pipe(auditTime(1000))

export {
    clicksAudit$
}
