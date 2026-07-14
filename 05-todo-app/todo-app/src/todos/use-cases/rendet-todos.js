import { createTodoHtml } from "./";

let element;

// Renderiza las tareas recibidas dentro del elemento indicado.
export const rendetTodos = ( elementId, todos=[]) => {

    if(!element) element = document.querySelector(elementId);// Busca la lista solo una vez y reutiliza la referencia.

    if(!element) throw new Error(`Element ${elementId} not found`);// Lanza un error si el selector no existe en el DOM.

    element.innerHTML = '';// Limpia la lista antes de volver a pintar para evitar duplicados.


    todos.forEach(todo =>{
        element.append(createTodoHtml(todo));

    });

}
