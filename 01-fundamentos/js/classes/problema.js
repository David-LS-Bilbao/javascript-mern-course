
// ejemplo de clase
class Persona {
    constructor(nombre, apellido, edad, genero) {
        this._nombre = nombre;
        this._apellido = apellido;
        this.edad = edad;
        this.genero = genero;
    }
}

const persona = new Persona('Luis', 'Garcia');
console.log(persona);

const persona2 = new Persona('Fernando', 'Herrera', 40, 'Masculino');
console.log(persona2);

const personas = [];
personas.push(persona);
personas.push(persona2);
console.log(personas);



// fucion para crear objetos de la clase persona
function crearPersona(nombre, apellido, edad, genero) {
    return {
        _nombre: nombre,
        _apellido: apellido,
        edad: edad,
        genero: genero
    }
}



//instancia de la clase persona
const persona3 = new Persona('Fernando', 'Herrera', 40, 'Masculino');
console.log(persona3);


//instancia de la funcion
const persona4 = crearPersona('Fernando', 'Herrera', 40, 'Masculino');
console.log(persona4);      



/*
*revsa el archivo clases-vs-funciones-creadoras en la carpeta documents para tener mas informaacion sobre esto.
*/