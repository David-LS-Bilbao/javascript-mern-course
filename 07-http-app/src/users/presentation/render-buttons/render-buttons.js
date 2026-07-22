import userStore from '../../store/users-store';
import './render-buttons.css';
import { renderTable } from '../render-table/render-table.js';


/**
 * Renderiza los controles de paginación y sincroniza la tabla tras cada carga.
 * @param {HTMLElement} elemnnt Contenedor de los controles y de la tabla.
 */
export const renderButtons =(elemnnt) =>{


    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('pagination-controls');



    const nextButton = document.createElement('button');
    nextButton.classList.add('pagination-button');
    nextButton.innerText = 'Next >';

    const prevButton = document.createElement('button');
    prevButton.classList.add('pagination-button');
    prevButton.innerText = '< Prev';

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page';
    currentPageLabel.innerText = `${userStore.getCurrentPage()}`


    buttonsContainer.append(
    
        prevButton,
        currentPageLabel,
        nextButton
    );


    elemnnt.append(buttonsContainer);


    // Se espera la respuesta antes de actualizar el indicador y la tabla.
    nextButton.addEventListener('click',async () => {
        await userStore.loadNextPage();

        currentPageLabel.innerText = `${userStore.getCurrentPage()}`;
   
        renderTable(elemnnt);

        
    });
    
    prevButton.addEventListener('click', async() => {
        await userStore.loadPreviousPage();
        currentPageLabel.innerText = `${userStore.getCurrentPage()}`;
     
        renderTable(elemnnt);
    });

}
