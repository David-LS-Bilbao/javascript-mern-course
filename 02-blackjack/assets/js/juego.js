

/*
* creamos el deck de cartas (la baraja completa)
*/

let deck= [];
const tipos =['C','D','H','S'] // tipos de carta(palos de baraja)
const especiales=['J','Q','K','A']// para cartas con letra J.Q,K y As de cada baraja


const crearDeck =() => {

    // ciclo for para asignar numeros a palos de cartas

    for (let i=2; i<=10; i++){ // numeros de cartas del 2 al 10
        for (let tipo of tipos){   // un bucle for por cada parametro y vuelta, suma una carta a un palo.
            deck.push(i+ tipo);
        }
    }

    //ciclo for para asignar letras a palos de cartas

        for (let esp of especiales){
            for(let tipo of tipos){
                deck.push(esp + tipo);// un bucle for por cada parametro y vuelta, suma una carta a un palo.
            }
        }

        
       /* console.log(deck); */

        deck=_.shuffle(deck);// funcion que mezcla el deck de cartas, se importa la libreria underscore.js para poder usarla.
        return deck;

        /* console.log(deck); */
    }

 
crearDeck();

// Funcion para tomar una carta del deck
const tomarCarta = () => {
    
    const carta = deck.pop(); // pop() elimina el ultimo elemento de un array y lo retorna, en este caso la ultima carta del deck.
    
    
    console.log(deck);
    console.log(carta);
    
    if(!carta){
        throw 'No hay cartas en el deck';
        console.warn('No hay cartas en el deck');
    }
    return carta;
}
/* 
for (let i=0; i<60; i++){
tomarCarta();
} */

// Funcion para obtener el valor de la carta
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length-1); // substring() devuelve una parte de la cadena, en este caso el   valor de la carta sin el palo.
   
   if (isNaN(valor)){ // isNaN() devuelve true si el valor no es un numero, en este caso si es una letra.
        return (valor === 'A') ? 11 : 10; // si es una letra, devuelve 11 si es un As, o 10 si es una J,Q,K.
   }
   return valor * 1; // si es un numero, devuelve el valor de la carta multiplicado por 1 para convertirlo a numero.
 }
console.log(valorCarta(tomarCarta())); 
console.log(valor);
 