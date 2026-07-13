
import html from './app.html?raw';//importa el html de forma que no da errores
import todoStore from '../store/todo.store';
import { rendetTodos } from '../todos/use-cases/rendet-todos';





const elementIDs = {
    TodoList : '.todo-list', //selecciona el div con la clase todo-list
    newTodoInput : '#new-todo-input', // selecciona el input con el id new-todo-input

}


export const App = (elementId) => {

// fincion dispayTodos
    const displayTodos = () => {

        const todos = todoStore.getTodos(todoStore.getCurrentFilter());//llama a la funcion getTodos de la store y le pasa el estado del filtro
        rendetTodos(elementIDs.TodoList,todos);//llama a la funcion rendetTodos

        console.log(todos);//imprime los todos
    }   



    
    //funcion anonima que se llama inmediatamente
    (() => {
        const app = document.createElement('div');//crea un div
        app.innerHTML = html;//pone el html que tenemos en la carpeta app.html en el div
        document.querySelector(elementId).appendChild(app);//agrega el div al body

        displayTodos();//llama a la funcion displayTodos
    })();




// referencias html
const newDescriptionImput = document.querySelector(elementIDs.newTodoInput);//selecciona el input con el id new-todo-input
const todoListUL = document.querySelector(elementIDs.TodoList);//selecciona el div con la clase todo-list





//Listeners
newDescriptionImput.addEventListener('keyup', (event) => {//cuando se presiona una tecla en el input se llama a la funcion  
    
    if(event.keyCode !== 13) return;//si la tecla no es enter se sale de la funcion 
     if(event.target.value.length === 0) return;//si el input esta vacio se sale de la funcion
     if(event.target.value.trim().length === 0) return;//si el input esta vacio se sale de la funcion

    todoStore.addTodo(event.target.value);//llama a la funcion addTodo de la store y le pasa el valor del input
    
    displayTodos();//llama a la funcion displayTodos
    
    event.target.value = '';//limpia el input
});

    // funcion para seleccionar los eventos de teclado
    todoListUL.addEventListener('click', (event) => {//cuando se hace click en el div con la clase todo-list se llama a la funcion
        
        const element = event.target.closest('[data-id]');//selecciona el elemento que se hizo click
        
       const todoId = element.getAttribute('data-id');//obtiene el id del todo

       if(event.target.className === 'toggle')todoStore.toggleTodo(todoId);//llama a la funcion toggleTodo de la store y le pasa el id del todo
      
       if(event.target.className=== 'destroy') todoStore.deleteTodo(todoId);//llama a la funcion deleteTodo de la store y le pasa el id del todo
        

        displayTodos();//llama a la funcion displayTodos
    });


     






}

