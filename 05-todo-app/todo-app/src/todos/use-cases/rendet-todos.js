import { createTodoHtml } from "./";

let element;

// funcion para renderizar los ToDos 
export const rendetTodos = ( elementId, todos=[]) => {

    if(!element) element = document.querySelector(elementId);//selecciona el div con la clase todo-list 

    if(!element) throw new Error(`Element ${elementId} not found`);//si no encuentra el div con la clase todo-list lanza un error

    element.innerHTML = '';//limpia el div


    todos.forEach(todo =>{
        element.append(createTodoHtml(todo));

    });

}