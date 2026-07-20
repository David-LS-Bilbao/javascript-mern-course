import heroes from '../data/heroes.json';


export const asyncAwait2Component = async(element) => {// element es el div del html

    console.log('async await 2 Component');



    const [value1, value2, value3] = await Promise.all([// se ejecutan las promesas de forma concurrente y se muestra el valor de la primera que se resuelve  
        slowPromise(),// se pausa la ejecucion de la funcion hasta que la promesa se resuelve y devuelve su valor.
        mediumPromise(),// se pausa la ejecucion de la funcion hasta que la promesa se resuelve y devuelve su valor.
        fastPromise(),// se pausa la ejecucion de la funcion hasta que la promesa se resuelve y devuelve su valor.
    ])

    element.innerHTML = `
    <h3>${value1}</h3>
    <h3>${value2}</h3>
    <h3>${value3}</h3>
    `;
    
}   


const slowPromise = ()=>new Promise(resolve =>{
    setTimeout(() => {
        resolve('Slow Promise');
    }, 2000);
})

const mediumPromise = ()=>new Promise(resolve =>{
    setTimeout(() => {
        resolve('Medium Promise');
    }, 1500);
})

const fastPromise = ()=>new Promise(resolve =>{
    setTimeout(() => {
        resolve('Fast Promise');
    }, 1000);
})