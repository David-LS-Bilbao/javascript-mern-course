import { v4 as uuid } from 'uuid';// importar el paquete uuid



export class Todo {

    constructor( description ) {
        this.id= uuid();// generar un id aleatorio con la libreria uuid
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    }
}