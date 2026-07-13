

import { valorCarta } from './valor-carta.js';


  // Actualiza los puntos de un jugador y sincroniza su marcador en pantalla.
  export const acumularPuntos = ( carta, turno,puntosJugadores,puntosHTML ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }
