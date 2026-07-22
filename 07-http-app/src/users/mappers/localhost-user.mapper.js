import { User } from '../models/users';

/**
 * Convierte el formato recibido desde json-server en un modelo de la aplicación.
 * En particular, adapta `first_name` y `last_name` a camelCase.
 *
 * @param {object} localhostUser Datos de usuario recibidos desde la API local.
 * @param {number} localhostUser.id Identificador del usuario.
 * @param {boolean} localhostUser.isActive Estado del usuario.
 * @param {number} localhostUser.balance Saldo del usuario.
 * @param {string} localhostUser.avatar URL del avatar.
 * @param {string} localhostUser.first_name Nombre en formato del backend.
 * @param {string} localhostUser.last_name Apellido en formato del backend.
 * @param {string} localhostUser.gender Género del usuario.
 * @returns {User} Usuario normalizado para el resto de la aplicación.
 */
export const localhostUserToModel = (localhostUser) => {
   const {
    avatar,
    balance,
    first_name,
    gender,
    id,
    isActive,
    last_name
   }=localhostUser;

   return new User({
    avatar,
    balance,
    firstName:first_name,
    gender,
    id,
    isActive,
    lastName:last_name
});
}
