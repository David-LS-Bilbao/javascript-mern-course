

import { pedirCarta } from './useCases/pedir-carta.js';
import { valorCarta } from './useCases/valor-carta.js';
import { inicializarJuego } from './useCases/inicializar-juego.js';
import { crearCarta } from './useCases/crear-carta.js';
//import { acumularPuntos } from './useCases/acumular-puntos.js';
//import { turnoComputadora } from './useCases/turno-computadora.js';
//import { determinarGanador } from './useCases/determinar-ganador.js';



const miModulo = (() => {
    'use strict';

    let deck         = [];
    const tipos      = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];

    let puntosJugadores = [];

    // Optimizacion: se cachean las referencias del DOM una sola vez.
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');



    // Turno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const reiniciarJuego = () => {
        deck = inicializarJuego({
            tipos,
            especiales,
            puntosJugadores,
            puntosHTML,
            divCartasJugadores,
            btnPedir,
            btnDetener,
        });
    };

    reiniciarJuego();

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {
            if( puntosComputadora === puntosMinimos ) {
                alert('Nadie gana :(');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana')
            } else if( puntosComputadora > 21 ) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 100 );

    }

    // turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta(deck);
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1 );
            crearCarta(carta, divCartasJugadores[puntosJugadores.length - 1]);

        } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );

        determinarGanador();
    }



    // Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta(deck);
        const puntosJugador = acumularPuntos( carta, 0 );
        
        crearCarta( carta, divCartasJugadores[0] );


        if ( puntosJugador > 21 ) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );

        } else if ( puntosJugador === 21 ) {
            console.warn('21, genial!');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        }

    });


    btnDetener.addEventListener('click', () => {
        btnPedir.disabled   = true;
        btnDetener.disabled = true;

        turnoComputadora( puntosJugadores[0] );
    });

    btnNuevo.addEventListener('click', reiniciarJuego);

    return {
        nuevoJuego: reiniciarJuego
    };

})();
