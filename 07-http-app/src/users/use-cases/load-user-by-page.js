

// funcion asincrona para obtener los usuarios de la api
export const loadUsersByPage =async(page = 1) =>{

    const url=`${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;// llamada a la api
    const res=await fetch(url);
    const data=await res.json();

    console.log(data);
    return data;
    
}