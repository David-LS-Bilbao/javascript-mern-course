
import { Todo } from '../todos/models/todo.model';

// Filtros disponibles para consultar las tareas del store.

export const Filters = {
    All: 'all',
    Completed:'completed',
    Pending:'pending'
}

// Estado global de la aplicacion.
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

// Inicializa el store cargando el estado guardado antes de usar la app.
const initStore = () => {
    loadStore();
    console.log('initStore 🥑');

}

// Carga el estado persistido desde localStorage.
const loadStore = () =>{

    // Si no existe una clave "state" en localStorage, mantiene el estado inicial.
    if(!localStorage.getItem('state')) return;

    // Lee la clave "state" y copia sus datos al estado global.
        const{todos = [],filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
        state.todos = todos;
        state.filter = filter;

}

// Guarda el estado actual en localStorage para recuperarlo al recargar la pagina.
const saveStateToLocalStorage = () => {
    localStorage.setItem('state',JSON.stringify(state));
}

// Devuelve una copia de las tareas segun el filtro indicado.
const getTodos = (filter) => {
    // Selecciona las tareas segun el filtro activo.

    switch(filter){
        case Filters.All:
            return [...state.todos];// Copia el array para evitar exponer directamente el estado interno.
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);// Tareas completadas.
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done); // Tareas pendientes.
        default:
            throw new Error(`Unknown filter: ${filter}`); // Protege contra filtros no definidos.
    }
}

// Agrega una nueva tarea al estado y persiste el cambio.
const addTodo = (description) => {
    if(!description) throw new Error('Description is required');// La descripcion es obligatoria.

    state.todos.push(new Todo(description));// Crea una instancia Todo y la agrega al array.

    saveStateToLocalStorage();
}

// Cambia una tarea entre completada y pendiente y persiste el cambio.
const toggleTodo = (todoId) => {
    state.todos = state.todos.map( todo => {
        if(todo.id === todoId) todo.done = !todo.done;// Si coincide el id, invierte su estado done.
        return todo;
    });

    saveStateToLocalStorage();
}

// Elimina una tarea del estado usando su id y persiste el cambio.
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId);// Conserva solo las tareas con id diferente.

    saveStateToLocalStorage();
}

// Elimina todas las tareas completadas del estado y persiste el cambio.
const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done);// Conserva solo las tareas pendientes.

    saveStateToLocalStorage();
}

// Actualiza el filtro activo y persiste el cambio.
const setFilter = (newFilter = Filters.All) => {
    state.filter =newFilter;// Cambia el filtro guardado en el estado.

    saveStateToLocalStorage();
}

// Devuelve el filtro activo actual.
const getCurrentFilter = () => {
    return state.filter;// Retorna el filtro guardado en el estado.
}



// API publica del store.
export default{
    initStore,
    getTodos,
    deleteCompleted,
    loadStore,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
    getCurrentFilter
}
