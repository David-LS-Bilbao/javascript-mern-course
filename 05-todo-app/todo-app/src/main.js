import './style.css'

// llamada a la store
import todoStore from './store/todo.store';
todoStore.initStore();


// llamada a la app 
import { App } from './todos/app';
App('#app');

