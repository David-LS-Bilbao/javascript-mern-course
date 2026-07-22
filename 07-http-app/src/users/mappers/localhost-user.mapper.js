import { User } from '../models/users';

/**
 * 
 * @param {Like<User>} localhostUser 
 * @returns {User}
 */

// funcion para convertir los datos de la api a un modelo de usuario local 
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