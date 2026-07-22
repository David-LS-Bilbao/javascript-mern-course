import  userStore  from "../users/store/users-store";
import  {renderTable}  from "./presentation/render-table/render-table.js";
import  {renderButtons}  from "./presentation/render-buttons/render-buttons.js";

export const UsersApp = async(element) =>{

   // element.innerHTML = 'Loading...';
    await userStore.loadNextPage();

  //  console.log(userStore.getUsers);

  element.innerHTML = '';

    renderTable(element);

    renderButtons(element);
    
}