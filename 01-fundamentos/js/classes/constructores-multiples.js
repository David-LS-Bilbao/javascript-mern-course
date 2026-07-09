// Constructores multiples en JavaScript

/*
* En JavaScript no existe la sobrecarga de constructores como en otros lenguajes.
*
* Una clase solo puede tener un metodo constructor.
*
* Si necesitas crear objetos de varias formas, lo normal es usar metodos estaticos
* que funcionen como "constructores alternativos".
*/

class Persona {

    // Este es el unico constructor real de la clase.
    constructor(nombre, apellido, pais) {
        this._nombre = nombre;
        this._apellido = apellido;
        this.pais = pais;
    }

    // Constructor alternativo 1:
    // Crea una Persona a partir de un objeto con las propiedades esperadas.
    static fromObject({ nombre, apellido, pais }) {
        return new Persona(nombre, apellido, pais);
    }

    // Constructor alternativo 2:
    // Crea una Persona a partir de un array.
    static fromArray([nombre, apellido, pais]) {
        return new Persona(nombre, apellido, pais);
    }

    // Constructor alternativo 3:
    // Crea una Persona usando un string separado por comas.
    static fromString(texto) {
        const [nombre, apellido, pais] = texto.split(',');

        return new Persona(
            nombre.trim(),
            apellido.trim(),
            pais.trim()
        );
    }

    getInfo() {
        console.log(`info: ${this._nombre} ${this._apellido} ${this.pais}`);
    }
}

const nombre1 = 'Fernando';
const apellido1 = 'Herrera';
const pais1 = 'Colombia';

const pepe = {
    nombre: 'Pepe',
    apellido: 'Argento',
    pais: 'Argentina'
};

const datosMaria = ['Maria', 'Lopez', 'Espana'];
const datosAna = 'Ana, Garcia, Mexico';

// Forma normal: usando el constructor real con new.
const persona1 = new Persona(nombre1, apellido1, pais1);
persona1.getInfo();

// Forma alternativa: usando un objeto.
const persona2 = Persona.fromObject(pepe);
persona2.getInfo();

// Forma alternativa: usando un array.
const persona3 = Persona.fromArray(datosMaria);
persona3.getInfo();

// Forma alternativa: usando un string.
const persona4 = Persona.fromString(datosAna);
persona4.getInfo();

/*
* Idea clave:
*
* new Persona(...) llama al constructor real.
*
* Persona.fromObject(...)
* Persona.fromArray(...)
* Persona.fromString(...)
*
* no son constructores reales del lenguaje.
* Son metodos estaticos que preparan datos y luego llaman internamente a new Persona(...).
*/
