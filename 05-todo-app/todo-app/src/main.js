import './style.css'

// Inicializa el store global de tareas antes de montar la app.
import todoStore from './store/todo.store';
todoStore.initStore();


// Monta la aplicacion dentro del elemento #app del index.html.
import { App } from './todos/app';
App('#app');
