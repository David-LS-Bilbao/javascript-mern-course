import './render-add-button.css';

/**
 * Renderiza el botón flotante que iniciará la creación de un usuario.
 * @param {HTMLElement} element Contenedor en el que se añade el botón.
 */
export const renderAddButton = (element) => {

    const fabButton = document.createElement('button');
    fabButton.innerText = '+';
    fabButton.classList.add('fab-button');
    element.append(fabButton);

    // Pendiente: abrir el modal con el formulario de creación.
    fabButton.addEventListener('click', () => {
        throw new Error('Not implemented');
    });

}
