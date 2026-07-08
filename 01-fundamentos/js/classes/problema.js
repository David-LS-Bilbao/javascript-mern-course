
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