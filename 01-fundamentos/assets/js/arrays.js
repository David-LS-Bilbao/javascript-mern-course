
// Arrays en JavaScript

// Declaración de un array
let frutas = ['Manzana', 'Banana', 'Cereza', 'Durazno'];

// otras formas de declarar un array
let frutas2 = new Array('Manzana', 'Banana', 'Cereza', 'Durazno');

// array con diferentes tipos de datos
let arrayMixto = ['Manzana', 10, true, null, undefined, {nombre: 'Luis'}, [1, 2, 3]];

// arrays con funciones
let arrayFunciones = [
    function() { return 'Hola'; },
    function() { return 'Mundo'; }
];


// Acceso a los elementos del array
console.log(frutas[0]); // Acceso al primer elemento
console.log(frutas[2]); // Acceso al tercer elemento
console.log(frutas[3]); // Acceso al cuarto elemento

// Recorrer los elementos del array
for (let i = 0; i < frutas.length; i++) {
    console.log(frutas[i]);
}

// Agregar elementos al array
frutas.push('Naranja'); // Agrega un elemento al final del array
frutas.unshift('Melón'); // Agrega un elemento al principio del array
frutas.splice(1, 0, 'Pera'); // Agrega un elemento en una posición específica del array

// Eliminar elementos del array
frutas.pop(); // Elimina el último elemento del array
frutas.shift(); // Elimina el primer elemento del array
frutas.splice(2, 1); // Elimina un elemento en una posición específica del array    

// Iterar sobre un array
frutas.forEach(function(fruta) {
    console.log(fruta);
});

// Obtener el largo de un array
console.log(frutas.length); 

// Buscar un elemento en un array
let index = frutas.indexOf('Banana');
console.log(index);

// Filtrar elementos de un array
let frutasFiltradas = frutas.filter(function(fruta) {
    return fruta.startsWith('M');
});

console.log(frutasFiltradas);


//uso de funciones entro de un array
console.log(arrayFunciones[0]());
console.log(arrayFunciones[1]());

/*
Las funciones dentro de un array son útiles para almacenar comportamientos relacionados
 con los elementos del array. Estas funciones se pueden llamar desde fuera del array
 para ejecutar el comportamiento deseado.
*/

//ejemplo de array con objetos
let personas = [
    {nombre: 'Luis', edad: 30},
    {nombre: 'Ana', edad: 25},
    {nombre: 'Pedro', edad: 35}
];

console.log(personas[0].nombre);
console.log(personas[1].edad);


// array de arrays
let matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(matriz[0][0]);// Acceso al primer elemento de la primera fila (1)
console.log(matriz[1][1]);// Acceso al segundo elemento de la segunda fila (5)
console.log(matriz[2][2]);// Acceso al tercer elemento de la tercera fila (9)