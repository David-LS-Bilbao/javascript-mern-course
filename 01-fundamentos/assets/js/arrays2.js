// propiedades y metodos de los arrays

let frutas = ['Manzana', 'Banana', 'Cereza', 'Durazno'];

console.log(frutas.length);

console.log(frutas[0]);// Acceso al primer elemento
console.log(frutas[1]);// Acceso al segundo elemento
console.log(frutas[2]);// Acceso al tercer elemento
console.log(frutas[3]);// Acceso al cuarto elemento

console.log(frutas[frutas.length - 1]);// Acceso al último elemento

console.log(frutas[4]);// Acceso a un elemento que no existe, devuelve undefined

console.log(frutas[frutas.length]);// Acceso a un elemento que no existe, devuelve undefined

console.log(frutas[frutas.length + 1]);// Acceso a un elemento que no existe, devuelve undefined


// Agregar elementos al array
frutas.push('Melón');
console.log(frutas);

// Eliminar elementos del array
frutas.pop();
console.log(frutas);    

// Eliminar elementos del array
frutas.shift();
console.log(frutas);

// Eliminar elementos del array
frutas.unshift('Naranja');
console.log(frutas);

// Eliminar elementos del array
frutas.splice(1, 2);
console.log(frutas);

// Eliminar elementos del array
frutas.splice(1, 0, 'Melocoton');
console.log(frutas);

// Eliminar elementos del array
frutas.splice(1, 0, 'Melocoton', 'Papaya');
console.log(frutas);

// Recorrer los elementos del array
for (let i = 0; i < frutas.length; i++) {
    console.log(frutas[i]);
}

// Recorrer los elementos del array
for (let fruta of frutas) {
    console.log(fruta);
}

// Recorrer los elementos del array
frutas.forEach(function(fruta) {
    console.log(fruta);
});