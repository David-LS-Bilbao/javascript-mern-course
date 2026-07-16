import heroes from '../data/heroes.json';


/**
 * 
 * 
 * @param {HTMLDivElement} element
 */

export const promisesComponent = (element) => {// element es el div del html

    console.log('Promises Component');

    const id1= "5d86371f25a058e5b1c8a65e";

    const renderHero = (hero) => { // Funcion para renderizar el heroe
        element.innerHTML = hero.name;
    }

    const renderError = (error) => { // Funcion para renderizar el error
        element.innerHTML = `<h3> ${error}></h3>`;
    }

    
    findHero(id1)
        .then(renderHero) // si la promesa se resuelve, se ejecuta el resolve y se pasa el heroe como argumento
        .catch(renderError); // Si la promesa se rechaza, se ejecuta el error

    
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

        const hero = heroes.find(hero => hero.id === id);

        if(hero){
            resolve (hero);
            return;
        }
        reject(`Heroe con id ${id} no encontrado`);

  });
   
};