import { todos$, users$ } from './operators/ajax'

todos$.subscribe(todos => {
    console.log('todos ',todos)
})

users$.subscribe(req => {
    console.log('users ', JSON.parse(req.response))
})

console.log('hello')
