
import html from './app.html?raw';//importa el html de forma que no da errores
import todoStore from '../store/todo.store';
import { rendetTodos } from '../todos/use-cases/rendet-todos';





const elementIDs = {
    TodoList : '.todo-list',
    newTodoInput : '#new-todo-input',

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

//Listeners
newDescriptionImput.addEventListener('keyup', (event) => {//cuando se presiona una tecla en el input se llama a la funcion  
    
    if(event.keyCode !== 13) return;//si la tecla no es enter se sale de la funcion 
     if(event.target.value.length === 0) return;//si el input esta vacio se sale de la funcion
     if(event.target.value.trim().length === 0) return;//si el input esta vacio se sale de la funcion
     
    todoStore.addTodo(event.target.value);//llama a la funcion addTodo de la store y le pasa el valor del input
    
    displayTodos();//llama a la funcion displayTodos
    
    event.target.value = '';//limpia el input
});






}

