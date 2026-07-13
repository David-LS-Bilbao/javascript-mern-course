
import html from './app.html?raw';//importa el html de forma que no da errores

export const App = (elementId) => {
    
    //funcion anonima que se llama inmediatamente
    (() => {
        const app = document.createElement('div');//crea un div
        app.innerHTML = html;//pone el html que tenemos en la carpeta app.html en el div
        document.querySelector(elementId).appendChild(app);//agrega el div al body
    })();
    
}
