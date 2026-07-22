



/**
 * Representa un usuario con los nombres de propiedades usados por la aplicación.
 */
export class User {
    /**
     * @param {object} user Datos normalizados del usuario.
     * @param {number} user.id Identificador del usuario.
     * @param {boolean} user.isActive Indica si el usuario está activo.
     * @param {number} user.balance Saldo del usuario.
     * @param {string} user.avatar URL del avatar.
     * @param {string} user.firstName Nombre del usuario.
     * @param {string} user.lastName Apellido del usuario.
     * @param {string} user.gender Género del usuario.
     */
    constructor({id,isActive,balance,avatar,firstName,lastName,gender}){
        this.id=id;
        this.isActive=isActive;
        this.balance=balance;
        this.avatar=avatar;
        this.firstName=firstName;
        this.lastName=lastName;
        this.gender=gender; 
    }
      
    
}
