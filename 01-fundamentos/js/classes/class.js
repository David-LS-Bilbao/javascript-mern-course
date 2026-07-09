
// clases en javascript

// las clases en javascript usan 'use strict', por defecto asi que siempre se debe 
// definir las propiedades y metodos de la clase

class Persona {

    // metodos y propiedades
    nombre;
    codigo; 
    frase;

    // constructor. es el metodo que se ejecuta al crear un objeto o una instancia de la clase
    // uso de this para acceder a las propiedades de la clase.
    // solo puede haber un constructor por clase

    constructor(nombre, codigo, frase){ 
        this._nombre = nombre;
        this._codigo = codigo;
        this._frase = frase;

    }


// metosdos de clase

    quienSoy(){
        console.log(`Hola me llamo  ${this._nombre} y  ${this._frase}`);
    }
    miCodigo(){
        console.log('mi codigo es: ' + this._codigo);
    }


    //setters y getters
    set nombre(nombre){
        this._nombre = nombre;
    }
    get nombre(){
        return this._nombre;
    }


}





//llamar a los metodos de una clase

// creo un objeto de la clase Persona y lo llamo luis
const luis = new Persona('Luis', '1234', 'soy tu desarrollador javascript favorito');
luis.quienSoy();
luis.miCodigo();



// acceder a las propiedades de la clase Persona y modificarlas
const nombre=Persona.nombre = 'David';
const saludo=Persona.frase = ' soy tu desarrollador Kotlin favorito';
const codigo=Persona.codigo = '1223';


console.log(nombre, codigo);
console.log(saludo); // muestra el contenido de las características de la clase??
console.log(codigo.length);// muestra la longitud del string

luis.quienSoy();
luis.miCodigo();


// uso de setters y getters
const paco = new Persona('Francisco', '007', 'soy tu desarrollador React favorito');
paco.nombre = 'Paco';// set
console.log('Me llamo ' + paco.nombre);// get
console.log(paco._frase);


console.log(paco);// muestra el objeto completo con los seters y getters en la consola de chrome





// propiedades y metodos estaticos
class ClaseEstatica {
    // Una propiedad estatica pertenece a la clase, no a los objetos creados con new.
    static propiedadEstatica = 'soy una propiedad estatica';

    // Un metodo estatico tambien pertenece a la clase.
    static saludar() {
        console.log('saludos desde un metodo estatico');
    }

    // Este metodo NO es estatico. Pertenece a las instancias.
    saludarInstancia() {
        console.log('saludos desde una instancia de la clase');
    }
}

// Los miembros estaticos se llaman directamente desde la clase.
console.log(ClaseEstatica.propiedadEstatica);
ClaseEstatica.saludar();

// Los metodos de instancia se llaman desde un objeto creado con new.
const ejemploInstancia = new ClaseEstatica();
ejemploInstancia.saludarInstancia();

// Esto no funcionaria porque saludarInstancia no es un metodo estatico:
// ClaseEstatica.saludarInstancia();

// Esto tampoco funcionaria porque saludar es estatico y no pertenece a la instancia:
// ejemploInstancia.saludar();

/*
* En JavaScript no existen "clases static" como tal.
*
* Lo que existe son propiedades estaticas y metodos estaticos dentro de una clase.
*
* Un miembro estatico pertenece a la clase directamente:
* ClaseEstatica.saludar();
*
* Un miembro de instancia pertenece a los objetos creados con new:
* const objeto = new ClaseEstatica();
* objeto.saludarInstancia();
*
* Usa static cuando una propiedad o metodo no depende de los datos de un objeto concreto.
*/


