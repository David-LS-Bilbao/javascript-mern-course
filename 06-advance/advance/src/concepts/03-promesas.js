import heroes from '../data/heroes.json';

/**
 * 
 * 
 * @param {HTMLDivElement} element
 */

export const promisesComponent = (element) => {// element es el div del html

    console.log('Promises Component');
    
}   

/**
 * 
 * @param {String} id 
 * @return {Promise}
 */

// funcion buscar hero q como una promesa.
const findHero = (id) => {

    // creamos la promesa con new Promise y la retornamos directamente con los parametros resolve y reject, que son funciones que se ejecutan cuando la promesa se resuelve o se rechaza
    // el resolve se ejecuta cuando la promesa se resuelve y el reject se ejecuta cuando la promesa se rechaza

    return new Promise((resolve, reject)=>{

        if(hero){
            resolve (hero);
            return;
        }
        reject('Heroe con id ${id} no encontrado');

  });
   
};