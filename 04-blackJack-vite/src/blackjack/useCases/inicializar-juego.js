import { crearDeck } from './crear-deck.js';

export const inicializarJuego = ({
    numJugadores = 2,
    tipos,
    especiales,
    puntosJugadores,
    puntosHTML,
    divCartasJugadores,
    btnPedir,
    btnDetener,
}) => {

    const deck = crearDeck( tipos, especiales );

    // Optimizacion: se reutiliza el mismo arreglo para conservar referencias existentes.
    puntosJugadores.length = 0;

    for( let i = 0; i< numJugadores; i++ ) {
        puntosJugadores.push(0);
    }
    
    puntosHTML.forEach( elem => elem.innerText = 0 );
    divCartasJugadores.forEach( elem => elem.innerHTML = '' );

    btnPedir.disabled   = false;
    btnDetener.disabled = false;

    return deck;

};
