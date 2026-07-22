import  userStore  from "../users/store/users-store";
import  {renderTable}  from "./presentation/render-table/render-table.js";
import  {renderButtons}  from "./presentation/render-buttons/render-buttons.js";
import  {renderAddButton}  from "./presentation/render-add-buttons/render-add-button.js";

/**
 * Inicializa el módulo de usuarios y renderiza sus componentes principales.
 * @param {HTMLElement} element Contenedor raíz de la aplicación de usuarios.
 * @returns {Promise<void>}
 */
export const UsersApp = async(element) =>{

    // El store comienza en la página 0; esta llamada carga la primera página.
    await userStore.loadNextPage();

    // Limpia el contenedor antes de montar la vista completa.
    element.innerHTML = '';

    renderTable(element);

    renderButtons(element);

    renderAddButton(element);
    
}
