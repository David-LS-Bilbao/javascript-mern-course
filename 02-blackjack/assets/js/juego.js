

/*
* creamos el deck de cartas (la baraja completa)
*/

let deck= [];
const tipos =['C','D','H','S'] // tipos de carta(palos de baraja)
const especiales=['J','Q','K','A']// para cartas con letra J.Q,K y As de cada baraja

let puntosJugador=0,
    puntosComputadora=0;


let turnoJugador=true; // variable para saber si es el turno del jugador o de la computadora

// referecias de HTML
const btnPedir = document.querySelector('#pedir-carta');
const btnDetener = document.querySelector('#detener');
const btnNuevo = document.querySelector('#nuevo-juego');

let puntosJugadorHTML=document.querySelector('#puntos-jugador');
let puntosComputadoraHTML=document.querySelector('#puntos-computadora');

const divCartasJugador=document.querySelector('#Jugador-cartas');
const divCartasComputadora=document.querySelector('#Computador-cartas');




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
    
    
    if(!carta){
        throw 'No hay cartas en el deck';// throw lanza un error, en este caso si no hay cartas en el deck.
        console.warn('No hay cartas en el deck');// console.warn() muestra un mensaje de advertencia en la consola, en este caso si no hay cartas en el deck.
    }
    return carta;
}



// Funcion para obtener el valor de la carta
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length-1); // substring() devuelve una parte de la cadena, en este caso el   valor de la carta sin el palo.
   
   if (isNaN(valor)){ // isNaN() devuelve true si el valor no es un numero, en este caso si es una letra.
        return (valor === 'A') ? 11 : 10; // si es una letra, devuelve 11 si es un As, o 10 si es una J,Q,K.
   }
   return valor * 1; // si es un numero, devuelve el valor de la carta multiplicado por 1 para convertirlo a numero.
 }
//console.log(valorCarta(tomarCarta())); // llama a la funcion tomarCarta() y le pasa el valor de la carta a la funcion valorCarta() para obtener el valor de la carta.


// turno computadora-------------forma del profesor-------------------------------------------------
/* const turnoComputadora = (puntosJugador) => {

    do {
        puntosComputadora = puntosComputadora + valorCarta(carta);  // suma el valor de la carta al puntaje de la computadora
        puntosComputadoraHTML.innerText = puntosComputadora; // actualiza el puntaje de la computadora en el HTML
        console.log('puntos computadora = ' + puntosComputadora);
        const imgCarta = document.createElement('img'); // crea un elemento img para mostrar la carta en el HTML
        imgCarta.src = `02-blackjack/assets/cartas/${carta}.png`;// asigna la ruta de la imagen de la carta al elemento img
        imgCarta.classList.add('carta'); // agrega la clase carta al elemento img para darle estilo
        divCartasComputadora.appendChild(imgCarta); // agrega el elemento img al div de cartas de la computadora para mostrar la carta en el HTML
       

    }while(puntosComputadora<puntosJugador && puntosComputadora<=21){

    };
} */
//------------------------------------------------------------------------------------------------


const turno =(carta, puntosActuales, puntosHTML, divCartas, nombre)=>{

     puntosActuales = puntosActuales + valorCarta(carta);
    puntosHTML.innerText = puntosActuales;

       console.log(`puntos ${nombre} = ${puntosActuales}`);

    const imgCarta = document.createElement('img');
    imgCarta.src = `02-blackjack/assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartas.appendChild(imgCarta);

    return puntosActuales;

}





// eventos
btnPedir.addEventListener('click', () => { // evento que se ejecuta cuando se hace click en el boton pedir carta
    const carta = tomarCarta(); // llama a la funcion tomarCarta() y le asigna el valor de la carta a la variable carta


    if(turnoJugador){
        puntosJugador=turno(
            carta,
            puntosJugador,
            puntosJugadorHTML,
            divCartasJugador,
            'jugador'
        );

 if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            turnoJugador = false;
        }

    } else {
        puntosComputadora =turno(
             carta,
            puntosComputadora,
            puntosComputadoraHTML,
            divCartasComputadora,
            'computadora'
        );


        if (puntosComputadora > 21) {
            
            console.warn('lo siento mucho, perdiste la computadora');
        } else if (puntosComputadora === 21) {
            
            console.warn('Felicidades, ganaste la computadora');
        } else if (puntosComputadora > puntosJugador) {
            
            console.warn('lo siento mucho, perdiste la computadora');
        } else if (puntosComputadora === puntosJugador) {
            
            console.warn('Empate');
        }
    }
});


btnDetener.addEventListener('click', () => {
    if (!turnoJugador){
 finPartida(); 
    }
    turnoJugador = false;  
    });

const finPartida=()=>{
    if(!turnoJugador && puntosComputadora>puntosJugador){
        console.log('gana computadora.')
            // deshabilitar boton pedir carta
btnPedir.disabled = true;
    }else if(puntosComputadora===puntosJugador){
        console.log('Habeis empatado');
            // deshabilitar boton pedir carta
btnPedir.disabled = true;
    }else {console.log('gana jugador');

    // deshabilitar boton pedir carta
btnPedir.disabled = true;
}
}

btnNuevo.addEventListener('click', () => {
    nuevoJuego();
});     

const nuevoJuego = () => {
    btnPedir.disabled=false;
    console.log('Nuevo juego');
    puntosJugador =0;
    puntosComputadora =0;
    turnoJugador = true;
    deck = []; // vacia el deck de cartas
    deck = crearDeck(); // crea un nuevo deck de cartas

    puntosJugadorHTML.innerText = puntosJugador;
    puntosComputadoraHTML.innerText = puntosComputadora;

    // borrar las cartas
    divCartasJugador.replaceChildren();
    divCartasComputadora.replaceChildren();

}
//TODO proximo , computadora auto y multijugador y fin juego cuando compu pierde, tambien añadir los mensajes en pantalla.