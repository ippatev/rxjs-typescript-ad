import { todos$ } from './operators/ajax'

todos$.subscribe(todos => {
    console.log('todos ',todos)
})

console.log('hello')
