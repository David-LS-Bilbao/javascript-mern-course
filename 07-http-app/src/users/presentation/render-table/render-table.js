import './render-table.css';
import userStore from '../../store/users-store.js';

// Conserva una única tabla y actualiza solamente su cuerpo en cada renderizado.
let table;

/**
 * Crea la estructura base de la tabla de usuarios.
 * @returns {HTMLTableElement}
 */
const createTable = () =>{

    const table = document.createElement('table');
    const tableHeaders =document.createElement('thead');
    const tableBody=document.createElement('tbody');


    tableHeaders.innerHTML =`
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;

    

    table.append(tableHeaders,tableBody);
    

    return table;
}


/**
 * Representa en la tabla los usuarios de la página guardada en el store.
 * @param {HTMLElement} elemnt Contenedor en el que se monta la tabla la primera vez.
 */
export const renderTable =(elemnt) =>{

    const users = userStore.getUser();

    if(!table){
        table =createTable();
        elemnt.append(table);

    }

    let tableHTML= '';

    users.forEach(user => {
        tableHTML +=`
            <tr>
                <td>${user.id}</td>
                <td>${user.balance}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.isActive}</td>
                <td>
                   <a href="#/"data-id="${user.id}">Select</a>
                   |
                   <a href="#/data-id="${user.id}">Delete</a>
                </td>
            </tr>
        `;
    });


    // Sustituye las filas anteriores sin volver a crear encabezados ni listeners externos.
    table.querySelector('tbody').innerHTML = tableHTML;


}

