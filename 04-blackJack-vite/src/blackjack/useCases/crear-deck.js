import _ from 'underscore';




    // Genera todas las cartas del deck y usa underscore para mezclarlas.
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
