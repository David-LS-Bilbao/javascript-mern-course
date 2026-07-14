
import html from './app.html?raw';// Importa la plantilla HTML como texto para poder insertarla desde JavaScript.
import todoStore from '../store/todo.store';
import { rendetTodos } from '../todos/use-cases/rendet-todos';
import { Filters } from '../store/todo.store';
 




const elementIDs = {
    ClearCompleted : '.clear-completed', // Selector del boton para borrar tareas completadas.
    TodoList : '.todo-list', // Selector de la lista donde se pintan las tareas.
    newTodoInput : '#new-todo-input', // Selector del input donde se escribe una nueva tarea.
    filterButtons : '.filtro', // Selector de los botones de filtros.
    countPending : '#pending-count' // Selector del contador de tareas pendientes.

}
 // Funcion principal de la app.---------------------------------------------------------------
export const App = (elementId) => {

// 1. Insertar HTML
  const app = document.createElement('div');
  app.innerHTML = html;
  document.querySelector(elementId).appendChild(app);


// Referencias a elementos del DOM que se usaran en los listeners.
const newDescriptionImput = document.querySelector(elementIDs.newTodoInput);// Input para crear tareas.
const todoListUL = document.querySelector(elementIDs.TodoList);// Lista <ul> donde se renderizan las tareas.
const clearCompletedButton = document.querySelector(elementIDs.ClearCompleted);// Boton para borrar tareas completadas.
const filterButtons = document.querySelectorAll(elementIDs.filterButtons);// Botones de filtros.
const pendingCount = document.querySelector(elementIDs.countPending);// Contador de tareas pendientes.


// Obtiene las tareas segun el filtro actual y vuelve a renderizar la lista.
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());// Obtiene las tareas filtradas desde el store.
        rendetTodos(elementIDs.TodoList,todos);// Renderiza las tareas en el elemento .todo-list.
        pendingCount.innerHTML = todoStore.getTodos(Filters.Pending).length;
        console.log(todos);// Muestra las tareas actuales durante el desarrollo.
        
    }   
        displayTodos();
    

// Listeners-------------------------------------------------------------------------------------------------------------

// Listener para crear nuevas tareas.
newDescriptionImput.addEventListener('keyup', (event) => {// Escucha las teclas pulsadas dentro del input.

    if(event.keyCode !== 13) return;// Si no es Enter, no crea ninguna tarea.
     if(event.target.value.length === 0) return;// Evita crear tareas con el input vacio.
     if(event.target.value.trim().length === 0) return;// Evita crear tareas que solo tengan espacios.
     
    todoStore.addTodo(event.target.value);// Agrega la nueva tarea al store.

    displayTodos();// Vuelve a pintar la lista con la nueva tarea.
    event.target.value = '';// Limpia el input despues de agregar la tarea.
});

 // Listener para escuchar clicks en la lista de tareas.
    todoListUL.addEventListener('click', (event) => {// Escucha clicks en la lista completa.

        const element = event.target.closest('[data-id]');// Busca el <li> de la tarea asociada al click.

       const todoId = element.getAttribute('data-id');// Obtiene el id de la tarea desde el atributo data-id.

       if(event.target.className === 'toggle')todoStore.toggleTodo(todoId);// Cambia el estado completado/pendiente.

       if(event.target.className=== 'destroy') todoStore.deleteTodo(todoId);// Elimina la tarea seleccionada.

       
        displayTodos();// Actualiza la lista despues de cualquier cambio.
    });


// Listener para escuchar clicks en el boton para borrar tareas completadas.
    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();// Elimina las tareas completadas del store.
        displayTodos();// Actualiza la lista despues de borrar las tareas completadas.
    
    });


// Listener para escuchar clicks en los botones de filtros.

// cambiar el boton seleccionado a marcado como selectec.
    filterButtons.forEach(element => {// forEach para iterar sobre todos los botones de filtros.
        element.addEventListener('click', () => { // Escucha clicks en los botones de filtros.
            document.querySelector('.selected').classList.remove('selected'); // Quita la clase 'selected' del boton anteriormente seleccionado.
            element.classList.add('selected');// Agrega la clase 'selected' al boton actualmente seleccionado.
            console.log(element);// Muestra el nombre del boton actualmente seleccionado en la consola.

            // mostrar en pantalla solo los seleccionados

            const href = element.getAttribute('href');// Obtiene el href del boton actualmente seleccionado.

           switch(href){// según el href cambia el filtro
               case '#/all': todoStore.setFilter(Filters.All);break;
               case '#/active': todoStore.setFilter(Filters.Pending);break;
               case '#/completed': todoStore.setFilter(Filters.Completed);break;
           }

            displayTodos();
        })
})
}

