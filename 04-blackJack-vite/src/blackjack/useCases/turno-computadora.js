import { pedirCarta } from './pedir-carta.js';
import { acumularPuntos } from './acumular-puntos.js';
import { crearCarta } from './crear-carta.js';
import { determinarGanador } from './determinar-ganador.js';


    // Ejecuta el turno automatico de la computadora hasta cumplir la condicion de parada.
    export const turnoComputadora = ( 
                puntosMinimos,
                deck,
                puntosJugadores,
                puntosHTML,
                divCartasJugadores) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta(deck);
                puntosComputadora = acumularPuntos(
                carta, 
                puntosJugadores.length - 1 ,
                puntosJugadores,
                puntosHTML);

            crearCarta(carta, divCartasJugadores[puntosJugadores.length - 1]);

        } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );

        determinarGanador(puntosJugadores);
    }
