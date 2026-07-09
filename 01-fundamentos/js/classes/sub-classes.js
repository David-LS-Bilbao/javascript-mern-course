// Herencia de clases


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
luis.quienSoy();
luis.miCodigo();






// creamos una clase llamada programador que hereda de la clase persona

class Programador extends Persona {
    constructor(nombre, codigo, frase){
        super(nombre, codigo, frase); //super llama al constructor de la clase padre Persona y le pasa los argumentos
    }

    // añadimos mas propiedades a  la clase Programador
    lenguaje;
    experiencia;

    quienSoy() {
        console.log(`Soy ${this._nombre}, mi lenguaje favorito es ${this.lenguaje} y tengo ${this.experiencia} años de experiencia`);
    }
}


const DavidProgramador = new Programador('David', '1223', 'soy tu desarrollador favorito');
DavidProgramador.lenguaje = 'JavaScript';
DavidProgramador.experiencia = 5;
DavidProgramador.quienSoy();
