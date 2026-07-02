
// Arrays en JavaScript

// Declaración de un array
let frutas = ['Manzana', 'Banana', 'Cereza', 'Durazno'];

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