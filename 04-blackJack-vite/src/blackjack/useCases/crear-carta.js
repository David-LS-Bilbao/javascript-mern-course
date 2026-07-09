export const crearCarta = ( carta, contenedorCartas ) => {
    const imgCarta = document.createElement('img');
    imgCarta.src = `js-blackjack-master/assets/cartas/${ carta }.png`; //3H, JD
    imgCarta.classList.add('carta');

    // Optimizacion: recibe el contenedor ya resuelto y evita buscarlo en el DOM cada vez.
    contenedorCartas.append( imgCarta );
}
