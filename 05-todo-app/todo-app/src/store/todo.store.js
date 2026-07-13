
import { Todo } from '../todos/models/todo.model';

// definimos el estado globlal

const Filters = {
    All: 'all',
    Completed:'completed',
    Pending:'pending'
}

// definimos el estado
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

// funcion para inicializar el store
const initStore = () => {
    console.log(state);
    console.log('initStore 🥑');
    
}

// funcion para cargar el store
const loadStore = () =>{
    throw new Error('Not implemented');
}

// funcion para obtener los ToDos
const getTodos = (filter) => {
    // seleccionamos los ToDos segun el filtro

    switch(filter){
        case Filters.All:
            return [...state.todos];// copiamos el array todos mediante el operador spread(...) 
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);// todos que esten completados
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done); // todos que no esten completados
        default:
            throw new Error(`Unknown filter: ${filter}`); // si el filtro no es ninguno de los anteriores
    }
}

// funcion para agregar un todo
const addTodo = (description) => {
    if(!description) throw new Error('Description is required');// si no se le pasa el parametro descripcion lanza un error

    state.todos.push(new Todo(description));// si recibe el parametro description agrega el parametro description al array todo
}

// funcion para cambiar el estado de un todo
const toggleTodo = (todoId) => {
    state.todos = state.todos.map( todo => {
        if(todo.id === todoId) todo.done = !todo.done;// si el id del todo es igual al id del todoId que se quiere cambiar cambia el estado del todo 
        return todo;
    });
}

// funcion para eliminar un todo
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId);// devuelve todos los productos que no sean igual al todoId que se quiere eliminar.
}

// funcion para cambiar el filtro
const setFilter = (newFilter = Filters.All) => {
    state.filter =newFilter;// cambia el estado del filtro
}

// funcion para obtener el estado del filtro
const getCurrentFilter = () => {
    return state.filter;// retorna el estado del filtro
}

// exportamos las funciones
export default{
    initStore,
    getTodos,
    loadStore,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
    getCurrentFilter
}