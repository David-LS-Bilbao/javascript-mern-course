

import { pedirCarta } from './useCases/pedir-carta.js';
import { inicializarJuego } from './useCases/inicializar-juego.js';
import { crearCarta } from './useCases/crear-carta.js';
import { acumularPuntos } from './useCases/acumular-puntos.js';
import { turnoComputadora } from './useCases/turno-computadora.js';


// Archivo orquestador: mantiene el estado del juego y conecta eventos del DOM con use cases.
const miModulo = (() => {
    'use strict';

    // Estado compartido de la partida. Los use cases reciben este estado por parametro.
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


    // Reinicia el estado visual y logico; devuelve un deck nuevo ya mezclado.
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


    // Eventos
    // Flujo del jugador: toma una carta, acumula puntos, pinta la carta y valida si debe terminar.
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta(deck);
        const puntosJugador = acumularPuntos( 
            carta, 
            0,  
            puntosJugadores,
            puntosHTML 
        );
        
        crearCarta( carta, divCartasJugadores[0] );


        if ( puntosJugador > 21 ) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( 
                puntosJugador, 
                deck,
                puntosJugadores,
                puntosHTML,
                divCartasJugadores );

        } else if ( puntosJugador === 21 ) {
            console.warn('21, genial!');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( 
                puntosJugador,
                deck,
                puntosJugadores,
                puntosHTML,
                divCartasJugadores );
        }

    });


    // Al detenerse el jugador, la computadora juega hasta superar o alcanzar el minimo necesario.
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled   = true;
        btnDetener.disabled = true;

        turnoComputadora(
             puntosJugadores[0],
             deck,
             puntosJugadores,
             puntosHTML,
             divCartasJugadores );
    });

    btnNuevo.addEventListener('click', reiniciarJuego);

    // API publica del modulo, util si se quiere controlar el juego desde consola u otros modulos.
    return {
        nuevoJuego: reiniciarJuego
    };

})();
