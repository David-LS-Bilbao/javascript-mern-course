



/**
 * Crea un botón cuyo texto recibe un identificador nuevo en cada clic.
 * @param {HTMLDivElement} element Elemento donde se renderiza el botón.
 */
export const generatorFunctionComponent = (element) => {

    console.log('generator function Component');

    // Crear el generador no ejecuta su cuerpo; comienza al llamar a `.next()`.
    const myGenerator = generatorFunction();


    // Esta instancia conserva su estado entre las llamadas a `.next()`.
    const genId = idGenerator();
   
    const button = document.createElement('button');
    button.innerText = 'Click me';

    element.append(button);

    const renderButton = () => {
        // `.next()` reanuda el generador hasta el siguiente `yield`.
        const {value} = genId.next();

        button.innerText = `Click ${value}`;
    }
         
    button.addEventListener('click',  renderButton);

 
}   

/**
 * Genera una secuencia ilimitada de identificadores numéricos.
 * @yields {Number} Siguiente identificador de la secuencia.
 */
function* idGenerator() {
    let currentId = 0;

    // Al no existir una condición de salida, el generador nunca finaliza.
    while (true) {
        yield ++currentId;
    }
}



/**
 * Ejemplo básico de un generador finito.
 * Cada `yield` entrega un valor y pausa la ejecución hasta el siguiente `.next()`.
 * @yields {String} Cada valor de la secuencia.
 * @returns {String} Valor final cuando el generador termina.
 */
function* generatorFunction() {

    yield 'Primer valor';
    yield 'Segundo valor';
    yield 'Tercer valor';
    return 'ya no hay valores';

}

