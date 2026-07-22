import './render-table.css';
import userStore from '../../store/users-store.js';
let table;

// creamos una tabla para mostrar los usuarios en HTML

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


export const renderTable =(elemnt) =>{

    const users = userStore.getUser();

    if(!table){
        table =createTable();
        elemnt.append(table);

        //TODO: listeners de la tabla
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

    table.querySelector('tbody').innerHTML = tableHTML;

}

