import { clicksAudit$, clicksAuditWithInterval$ } from './operators'

clicksAudit$.subscribe(event => {
    console.log(event)
})

clicksAuditWithInterval$.subscribe(event => {
    console.log(event)
})
