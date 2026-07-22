



/**
 * Clase que representa a un usuario.
 * @constructor 
 * @param {number} id - El ID del usuario.
 * @param {boolean} isActive - Indica si el usuario esta activo.
 * @param {number} balance - El saldo del usuario.
 * @param {string} avatar - La URL de la imagen del avatar del usuario.
 * @param {string} first_name - El nombre del usuario.
 * @param {string} last_name - El apellido del usuario.
 * @param {string} gender - El sexo del usuario.
 */
export class User {
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