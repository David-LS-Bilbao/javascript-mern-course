import heroes from '../data/heroes.json';


/**
 * Muestra el resultado de una función asíncrona.
 * @param {HTMLDivElement} element Elemento donde se muestra un posible error.
 */
export const asyncComponent = (element) => {

    console.log('Async Component');

    const id1= "5d86371fd55e2e2a30fe1ccb1";
    console.log('inicio de componente');

    findHero(id1)
        .then(console.log)
        .catch((error) => element.innerHTML = error)


    
}   

/**
 * Busca un héroe por su identificador.
 * Al usar `async`, la función siempre devuelve una promesa.
 * El valor retornado se convierte en una promesa resuelta automáticamente.
 *
 * @param {String} id Identificador del héroe.
 * @returns {Promise<Object|undefined>} Promesa con el héroe encontrado.
 */
const findHero= async(id)=>{ 

    const hero = heroes.find(hero => hero.id === id);
    return hero;

}
