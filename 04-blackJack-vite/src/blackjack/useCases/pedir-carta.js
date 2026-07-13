
 // Extrae la ultima carta del deck. Si no quedan cartas, corta el flujo con un error.
 export const pedirCarta = (deck) => {
        if ( deck.length === 0 ) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

