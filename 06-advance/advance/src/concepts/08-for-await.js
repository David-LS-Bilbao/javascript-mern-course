import  heroes  from '../data/heroes.json';


/**
 * Busca varios héroes y muestra sus nombres conforme se recorren sus promesas.
 * @param {HTMLDivElement} element Elemento donde se renderizan los héroes.
 */
export const forAwaitComponent = async( element ) => {

    const id = '5d86371fd55e2e2a30fe1cc3';
    const heroIds = heroes.map( hero => hero.id );

    // Las búsquedas se inician al crear el arreglo de promesas.
    const heroPromises = getHeroesAsync( heroIds );

    // `for await...of` espera cada promesa antes de ejecutar el cuerpo del bucle.
    for await ( const hero of heroPromises ) {
        element.innerHTML +=  `${hero.name}<br/>`;
    }


}


/**
 * Convierte una lista de identificadores en una lista de promesas.
 * @param {String[]} heroIds Identificadores de los héroes.
 * @returns {Promise<Object|undefined>[]} Promesas de las búsquedas.
 */
const getHeroesAsync = ( heroIds ) => {
    
    const heroPromises = [];

    heroIds.forEach( id => {
        heroPromises.push( getHeroAsync(id)  );
    });

    return heroPromises;
}

/**
 * Simula una búsqueda asíncrona y devuelve el héroe encontrado.
 * @param {String} id Identificador del héroe.
 * @returns {Promise<Object|undefined>} Promesa con el héroe encontrado.
 */
const getHeroAsync = async(id) => {

    // Simula una operación asíncrona que tarda un segundo.
    await new Promise(( resolve ) => {
        setTimeout(() => resolve(), 1000)
    });

    return heroes.find( hero => hero.id === id );
}
