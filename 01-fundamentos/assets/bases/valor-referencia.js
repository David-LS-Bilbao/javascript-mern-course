
let a=10
let b=10

a=30;
console.log(a,b)

// variable con valor

const c = 20;

// variable por referencia

let juan = {nombre: 'Juan', edad: 28}
let ana = juan; // se pasa la referencia de juan a ana
ana.nombre= 'Ana';// se cambia el nombre de ana, lo que también afecta a juan
ana.edad = 30; // se modifica la edad de ana, lo que también afecta a juan
console.log(juan, ana);


// TIP. tolos los primitivos son por valor y los objetos son por referencia

//operador ternario
let resultado = (a > b) ? a : b; // si a es mayor que b, se asigna
resultado = (a < b) ? 'a es menor' : 'b es menor';
console.log(resultado);

// operador spread
const numeros = [10, 20, 30];
const copia = [...numeros]; // se crea una copia independiente del array numeros
copia.push(40); // se agrega 40 a la copia de numeros

console.log(numeros);
console.log(copia);


//operador rest
const [primero, ...resto] = numeros;
console.log(primero);
console.log(resto);