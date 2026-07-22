





// Caché privada del módulo. Conserva los Pokémon obtenidos mientras la página siga abierta.
const pokemonCache = new Map();


/**
 * Obtiene un Pokémon por su identificador y adapta la respuesta para la interfaz.
 * @param {number} id Identificador del Pokémon.
 * @returns {Promise<{id: number, name: string, weight: number, image: string|null}>}
 * Promesa con los datos necesarios para renderizar el Pokémon.
 */
export const getPokemonById = async (id) => {

    // Si el Pokémon ya está en caché, se devuelve sin repetir la petición HTTP.
    if (pokemonCache.has(id)) {
        console.log('Pokemon from cache');
        return pokemonCache.get(id);
    }




    // Solicita a PokéAPI el Pokémon que todavía no está almacenado.
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();


    // Adapta la respuesta extensa de PokéAPI al contrato que consume la interfaz.
    const pokemonData = {

        id: data.id,
        name: data.name,
        weight: data.weight,
        image: data.sprites.front_default


    }

    // Guarda únicamente el objeto transformado para reutilizarlo en futuras consultas.
    pokemonCache.set(id, pokemonData);



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
