import heroes from '../data/heroes.json';


/**
 * Busca dos héroes de forma secuencial y muestra sus nombres.
 * @param {HTMLDivElement} element Elemento donde se renderiza el resultado.
 */
export const asyncAwaitComponent =async (element) => {

    console.log('async await Component');

    const id1= "5d86371fd55e2e2a30fe1ccb1";
    const id2= "5d86371f25a058e5b1c8a65e";

    // `await` pausa esta función hasta que la promesa se resuelve y devuelve su valor.
    const hero1 = await findHero(id1);
    const hero2 = await findHero(id2);

    element.innerHTML = `
    <h3>${hero1.name}</h3>
    <h3>${hero2.name}</h3>
    `;
    
}   


/**
 * Busca un héroe por su identificador.
 * @param {String} id Identificador del héroe.
 * @returns {Promise<Object>} Promesa con el héroe encontrado.
 */
const findHero = async (id) => {

    return new Promise((resolve, reject) => {

        const hero = heroes.find(hero => hero.id === id);

        if (hero) {
            resolve(hero);
        } else {
            reject(`Heroe con id ${id} no encontrado`);
        }

    });

}
