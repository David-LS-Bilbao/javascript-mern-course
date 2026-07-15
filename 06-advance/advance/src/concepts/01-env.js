







/**
 * 
 * 
 * @param {HTMLDivElement} element
 */
export const enviromentsComponent = (element) => {// element es el div del html

    //sintaxis en vite
    console.log(import.meta.env); // imprime todas las variables de entorno del proyecto vite

    //  Mosrar las variables de entorno en el html
    const html = `
        <h1>Enviroments</h1>   
        Dev: ${import.meta.env.API_KEY}<br/>
        Mode: ${import.meta.env.MODE}<br/>
        Base URL: ${import.meta.env.BASE_URL}<br/>
        debug: ${import.meta.env.DEBUG}<br/>

    `;

    element.innerHTML = html;// imprime el html
}   
