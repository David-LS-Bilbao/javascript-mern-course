import userStore from '../../store/users-store';
import './render-buttons.css';


/// Renderiza los botones de navegación
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
    );// Agrega los botones al contenedor


    elemnnt.append(buttonsContainer);// Agrega los botones al contenedor  

}