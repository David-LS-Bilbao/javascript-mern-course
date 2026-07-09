import _ from 'underscore';




    // Esta función crea un nuevo deck
    const crearDeck = (tiposDeCartas, tiposDeespeciales) => {

        let deck = [];
        for( let i = 2; i <= 10; i++ ) {
            for( let tipo of tiposDeCartas ) {
                deck.push( i + tipo);
            }
        }

        for( let tipo of tiposDeCartas ) {
            for( let esp of tiposDeespeciales ) {
                deck.push( esp + tipo);
            }
        }
        deck = _.shuffle( deck );
        return deck;
    }




export { crearDeck };