import { localhostUserToModel } from "../mappers/localhost-user.mapper.js";

/**
 * Obtiene una página de usuarios y transforma cada respuesta en un modelo User.
 *
 * @param {number} [page=1] Página solicitada al backend.
 * @returns {Promise<Array<import('../models/users.js').User>>} Usuarios normalizados.
 */
export const loadUsersByPage =async(page = 1) =>{

    // VITE_BASE_URL mantiene la dirección del backend fuera del caso de uso.
    const url=`${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
    
    const res=await fetch(url);

    const data=await res.json();

    // La presentación y el store reciben modelos, no el JSON original de la API.
    const users=data.map(userLike =>localhostUserToModel(userLike));

    console.log(users);

    return users;
    
    
}
