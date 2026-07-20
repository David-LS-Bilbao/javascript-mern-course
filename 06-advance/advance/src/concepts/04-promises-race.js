

export const promiseRaceComponent = (element) => {// element es el div del html

    console.log('promise race Component');

    const renderValue =(value) => {// Funcion para renderizar el valor
        element.innerHTML = value;// imprime el valor en el html
    }

    Promise.race([// se ejecutan las promesas de forma concurrente y se muestra el valor de la primera que se resuelve  
        slowPromise(),
        mediumPromise(),
        fastPromise(),
    ]).then((value) => renderValue(value));
    
}   


// creamos varias promesas, una lenta, una media y una rapida.  

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