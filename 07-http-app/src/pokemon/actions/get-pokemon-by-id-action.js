


/**
 * Fetch pokemon by id from API
 * @param {number} id 
 * @returns {Promise Object} 
 */
export const getPokemonById = async (id) => {

// creamos un fech para hacer una peticion a la api

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    
    /* console.log(data.name);
    console.log(data.weight);
 */
    const pokemonData = {// creamos un objeto con los datos del pokemon
        id: data.id,
        name: data.name,
        weight: data.weight,
        image: data.sprites.front_default,
        
    }
    console.log({pokemonData}); // devuelve todos los datos del json
    return pokemonData;






    /* 
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            //throw new Error('Pokemon not found');
            return response.json();//convertimos la respuesta a json
        })
        .then(pokemon => {
            console.log(pokemon.name),//imprimimos el nombre del pokemon
            console.log(pokemon.weight),//imprimimos el peso del pokemon
            console.log(pokemon);//imprimimos el pokemon completo
        })
        .catch(error => console.warn(error));

    /*  return {
            type: 'GET_POKEMON_BY_ID',
            payload: id
        } */ 
}