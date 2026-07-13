
import { Todo } from '../todos/models/todo.model';

// definimos el estado globlal



const Filters = {
    All: 'all',
    Completed:'completed',
    Pending:'pending'
}

const state = {
    todos: [
        new Todo('Aprender React'),
        new Todo('Aprender Node'),
        new Todo('Aprender Express'),
        new Todo('Aprender MongoDB'),
        new Todo('Aprender Docker'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    console.log(state);
    console.log('initStore 🥑');
    
}

const loadStore = () =>{
    throw new Error('Not implemented');
}


const addTodo = (description) => {
    throw new Error('Not implemented');
}

const toggleTodo = (todoId) => {
    throw new Error('Not implemented');
}

const deleteTodo = (todoId) => {
    throw new Error('Not implemented');
}

const setFilter = (newFilter = Filters.All) => {
    throw new Error('Not implemented');
}

const getCurrentFilter = () => {
    throw new Error('Not implemented');
}


export default{
    initStore,
    loadStore,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
    getCurrentFilter
}