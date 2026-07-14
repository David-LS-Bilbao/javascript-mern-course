import { v4 as uuid } from 'uuid';// Importa uuid para generar identificadores unicos.



export class Todo {

    constructor( description ) {
        this.id= uuid();// Id unico usado para actualizar o eliminar la tarea.
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    }
}
