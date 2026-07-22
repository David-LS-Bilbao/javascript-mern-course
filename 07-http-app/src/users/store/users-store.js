import { loadUsersByPage } from '../use-cases/load-user-by-page';

// Estado privado compartido por los componentes del módulo de usuarios.
const state ={
    currentPage: 0,
    users: [],
}

/**
 * Carga la página siguiente. Si el backend devuelve una lista vacía,
 * conserva la página y los usuarios actuales.
 * @returns {Promise<void>}
 */
const loadNextPage = async () => {
     const users=  await loadUsersByPage(state.currentPage + 1);

     if(users.length === 0) return;

     state.currentPage += 1;
     state.users = users;

}

/**
 * Carga la página anterior sin permitir una página menor que 1.
 * @returns {Promise<void>}
 */
const loadPreviousPage = async () => {

     if(state.currentPage === 1) return;

     const users=  await loadUsersByPage(state.currentPage - 1);
        

     state.currentPage -= 1;
     state.users = users;
        

}

/**
 * Punto de extensión pendiente para sincronizar cambios de un usuario.
 */
const onUserChanged = () => {
        throw new Error('Not implemented');


}

/**
 * Punto de extensión pendiente para volver a solicitar la página actual.
 * @returns {Promise<void>}
 */
const reloadPage = async () => {
        throw new Error('Not implemented');


}



export default{
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    // La copia superficial evita exponer directamente el array interno del store.
    getUser:()=> [...state.users],
    getCurrentPage:()=> state.currentPage
}
