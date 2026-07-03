

// Ternario
const elMayor = (a, b) => (a > b) ? a : b;
/*
este operador es una forma corta de hacer un if else, se puede usar para asignar 
valores a variables, o para retornar valores de funciones.
En este caso, la función elMayor recibe dos parámetros a y b, y retorna el mayor de los dos.
*/
console.log( elMayor(20, 15) );





const tieneMembresia = ( miembro ) => (miembro) ? '2 Dólares' : '10 Dólares';
/*
En este caso, la función tieneMembresia recibe un parámetro miembro, 
 retorna '2 Dólares' si miembro es true, y '10 Dólares' si miembro es false.
*/
console.log( tieneMembresia(false) );// 10 Dólares



const amigo = false;
const amigosArr = [
    'Peter',
    'Tony',
    'Dr. Strange',
    amigo ? 'Thor' : 'Loki',
    // (()=> 'Nick Fury')()   // funcion anonima autoejecutable
    elMayor(10, 15)
];
/*
En este caso, se crea un arreglo amigosArr que contiene varios elementos,
el cuarto elemento del arreglo es un operador ternario que evalúa la variable amigo,
si amigo es true, se agrega 'Thor' al arreglo, si es false, se agrega 'Loki'.
El quinto elemento del arreglo es el resultado de la función elMayor(10, 15), que retorna 15.
*/
console.log( amigosArr );




const nota = 82.5; // A+ A B+
const grado = nota >= 95 ? 'A+' :
              nota >= 90 ? 'A'  :
              nota >= 85 ? 'B+' :
              nota >= 80 ? 'B'  :
              nota >= 75 ? 'C+' :
              nota >= 70 ? 'C'  : 'F';
              
/*
En este caso, se evalúa la variable nota y se asigna un valor a la variable grado dependiendo del rango en el que se encuentre la nota. 
Si la nota es mayor o igual a 95, grado será 'A+', si es mayor o igual a 90, grado será 'A', 
y así sucesivamente hasta que si la nota es menor a 70, grado será 'F'.
*/
console.log({ nota, grado });



