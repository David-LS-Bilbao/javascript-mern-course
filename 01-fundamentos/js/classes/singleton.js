// Singleton en javascript

// Singleton es un patron de diseno que asegura que una clase tenga una sola instancia.
// Aunque se intente crear varias veces con new, siempre se devuelve el mismo objeto.

class Singleton {

    // #instancia es una propiedad estatica privada.
    // static: pertenece a la clase Singleton, no a cada objeto.
    // #: solo se puede usar dentro de esta clase.
    static #instancia;

    nombre = '';

    constructor(nombre = '') {

        // Si ya existe una instancia guardada, se devuelve esa misma.
        // El !! convierte el valor a booleano:
        // - undefined se convierte en false
        // - un objeto existente se convierte en true
        if (!!Singleton.#instancia) {
            return Singleton.#instancia;
        }

        // Si no existe instancia, esta es la primera vez que se llama al constructor.
        // Guardamos este objeto en la propiedad estatica privada.
        Singleton.#instancia = this;
        this.nombre = nombre;

    }

    // Metodo estatico publico para consultar la instancia actual sin acceder a #instancia.
    static getInstancia() {
        return Singleton.#instancia;
    }

}

const instancia1 = new Singleton('Fernando');
const instancia2 = new Singleton('Pepe');
const instancia3 = new Singleton('Juan');

console.log('Nombre de la instancia 1: ', instancia1.nombre); // imprime Fernando
console.log('Nombre de la instancia 2: ', instancia2.nombre); // imprime Fernando
console.log('Nombre de la instancia 3: ', instancia3.nombre); // imprime Fernando

// Todas las variables apuntan al mismo objeto en memoria.
console.log(instancia1 === instancia2); // true
console.log(instancia2 === instancia3); // true

// Tambien podemos consultar la instancia guardada desde un metodo estatico.
console.log(Singleton.getInstancia() === instancia1); // true

// Si modificas una "instancia", en realidad modificas el unico objeto compartido.
instancia2.nombre = 'Carlos';

console.log(instancia1.nombre); // Carlos
console.log(instancia3.nombre); // Carlos

/*
* Idea clave:
*
* new Singleton('Fernando') crea el objeto por primera vez.
* new Singleton('Pepe') no crea un objeto nuevo; devuelve el de Fernando.
* new Singleton('Juan') tampoco crea un objeto nuevo; devuelve el mismo objeto.
*
* Por eso las tres variables tienen el mismo nombre al inicio.
*
* El patron Singleton puede ser util para compartir una unica configuracion,
* una unica conexion o un unico servicio global.
*
* Pero tambien hay que usarlo con cuidado, porque crea estado global compartido.
*/
