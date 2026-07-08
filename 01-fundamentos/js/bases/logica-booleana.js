

// Logica Booleana ---------------------------------------------------------------------

// funciones que regresan true o false
const regresaTrue = () => {
    console.log('Regresa true');
    return true;
}

const regresaFalse = () => {
    console.log('Regresa false');
    return false;
}




console.warn('Not o la negación');// true => false, false => true
console.log( true ); // true
console.log( !true ); // false
console.log( !false ); // true

console.log( !regresaFalse() ); // true


console.warn('And'); // true si todos los valores son verdaderos
console.log( true && true ); // true
console.log( true && !false ); // true

console.log('=========');
console.log(  regresaFalse() && regresaTrue() ); // false, ambos deben ser verdaderos para regresar true, si uno es falso, regresa false
console.log(  regresaTrue() && regresaFalse() ); // false

console.log('==== && =====');
regresaFalse() && regresaTrue();// false, no se ejecuta la segunda función porque la primera es falsa

console.log( '4 condiciones ', true && true && true && false ); // false


console.warn('OR'); // true si alguno de los valores es verdadero
console.log( true || false );// true
console.log( false || false );// false

console.log( regresaTrue() || regresaFalse() );
console.log( '4 condiciones ', true || true || true || false ); // true



console.warn('Asignaciones');// Asignaciones 

const soyUndefined = undefined;
const soyNull = null;
const soyFalso = false;

const a1 = false && 'Hola Mundo' && 150; // si es true asigna el ultimo valor, si es false asigna el primer valor falso
const a2 = 'Hola' && 'Mundo' && soyFalso && true;// se asigna el primer valor falso, en este caso soyFalso
const a3 = soyFalso || 'Ya no soy falso';// se muestra el primer valor verdadero, en este caso 'Ya no soy falso'
const a4 = soyFalso || soyUndefined || soyNull || 'Ya no soy falso de nuevo' || true;// se muestra el primer valor verdadero, en este caso 'Ya no soy falso de nuevo'
const a5 = soyFalso || soyUndefined || regresaTrue() || 'Ya no soy falso de nuevo' || true;// se muestra el primer valor verdadero, en este caso regresaTrue() y se ejecuta la función

console.log({a1, a2, a3, a4, a5 });

if ( regresaFalse() && regresaTrue() && (true || false || true) ) {
    console.log('Hacer algo');
} else {
    console.log('Hacer otra cosa');
}




