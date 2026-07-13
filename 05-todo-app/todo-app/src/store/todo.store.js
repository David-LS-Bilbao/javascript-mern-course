
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

export default{
    initStore
}