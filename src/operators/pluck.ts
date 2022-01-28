import { pluck } from 'rxjs/operators'
import {of} from "rxjs";

interface FullName {
    firstName: string;
    lastName: string;
}

interface User {
    id: number;
    username: string;
    fullName: FullName
}

const sampleUser: User = {
    id: 0,
    username: 'pupkin',
    fullName: {
        firstName: 'Vasya',
        lastName: 'Pupkin'
    }
}

const sampleUser$ = of(sampleUser)
const  userWithPluck$ = sampleUser$.pipe(
    pluck('fullName', 'lastName')
)

export {
    userWithPluck$
}
