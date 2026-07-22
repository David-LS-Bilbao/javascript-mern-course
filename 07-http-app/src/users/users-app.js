import  userStore  from "../users/store/users-store";

export const UsersApp = async(element) =>{

    element.innerHTML = 'Loading...';
    await userStore.loadNextPage();
    
}