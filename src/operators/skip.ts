import { skip } from 'rxjs/operators'
import {interval} from "rxjs";

const sampleInterval$ = interval(500)
const skipThreeValuesInInterval$ = sampleInterval$.pipe(
    skip(3)
)

export {
    skipThreeValuesInInterval$
}
