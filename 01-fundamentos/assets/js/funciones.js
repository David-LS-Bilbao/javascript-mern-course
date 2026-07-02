//tipos de funciones

//funcion declarada

function saludar(nombre){
    console.log(`Hola ${nombre}`);// metodo que no retorna nada, solo ejecuta una accion
}
const nombre = 'Luis';
saludar(nombre);

function sumar(a,b){
    return a+b;// metodo que retorna un valor
}

const resultado = sumar(10,20);// se puede guardar el resultado de la funcion en una variable
console.log(resultado);


//funcion expresada
let sumar2 = function(a,b){
    return a+b;
}   

//funcion flecha
let sumar3 = (a,b) => a+b;


const sumar4 = (a,b) => {
    return a+b;
}

saludar(); // se puede llamar a la funcion declarada antes de su definicion, ya que el motor de javascript las "eleva" al inicio del archivo

console.log(sumar(10,20));
console.log(sumar2(10,20));
console.log(sumar3(10,20));



//funcion anonima

/*
las funciones anonimas son aquellas que no tienen un nombre, y se suelen usar como 
callbacks o en expresiones de funciones.
se ejecutan en el momento que se definen, y no se pueden llamar despues de su definicion.
*/
setTimeout(function(){
    console.log('Hola mundo');
},1000);    


//return implicito en funciones flecha

/*
return en las funciones normales sirve para devolver un valor,
 y en las funciones flecha tambien, pero si la funcion flecha tiene una sola linea
  de codigo, se puede omitir la palabra return y las llaves, y el valor que se devuelve
   sera el resultado de esa linea de codigo.
*/


let sumar5 = (a,b) => a+b; // return implicito, no es necesario escribir la palabra return ni las llaves

