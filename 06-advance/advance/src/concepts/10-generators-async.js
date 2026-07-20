
import heroes from '../data/heroes.json';


/**
 * Consume manualmente un generador asíncrono y muestra cada héroe.
 * @param {HTMLDivElement} element Elemento donde se renderiza el nombre actual.
 */
export const generatorAsyncComponent = async(element) => {

    console.log('generator async Component');

    // La llamada crea el generador, pero su cuerpo comienza con el primer `.next()`.
    const heroGenerator = getHeroGenerator();
    let isFinished = false;

    do{
        // En un generador asíncrono, `.next()` devuelve una promesa.
        const {value, done} = await heroGenerator.next();

        isFinished = done;

        // Cuando `done` es true ya no existe un valor pendiente para renderizar.
        if (isFinished) break;

        element.innerHTML = value;

    }while(!isFinished); 
}   


/**
 * Genera de forma asíncrona los nombres de los héroes.
 * @yields {String} Nombre del siguiente héroe.
 */
async function* getHeroGenerator(){
    for (const hero of heroes){
        // Simula que cada héroe procede de una operación asíncrona.
        await sleep();
        yield hero.name;
    }
}

/**
 * Crea una pausa no bloqueante de medio segundo.
 * @returns {Promise<void>} Promesa que se resuelve al terminar el temporizador.
 */
const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 500);
    })
}
