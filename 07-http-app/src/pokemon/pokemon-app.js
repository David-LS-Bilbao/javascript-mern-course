import { getPokemonById } from '../pokemon/actions/get-pokemon-by-id-action';

/**
 * Inicializa el componente principal de la aplicación de Pokémon.
 * @param {HTMLElement} element Contenedor donde se mostrará la información.
 */
export const PokemonApp = async (element) => {

    // Identificador del Pokémon mostrado actualmente.
    let pokemonId = 1;

    document.title = 'Pokemon App';


    // Actualiza el encabezado principal de la aplicación.
    const titleElement=document.querySelector('#app-title');
    titleElement && (titleElement.innerHTML = 'Pokemon App');


    // Crea los elementos que forman la interfaz de navegación.
    const loadingParagraph = document.createElement('p');
    const pokemonImage = document.createElement('img');
    const nextButton = document.createElement('button');
    const prevButton = document.createElement('button');


    // Configura el contenido inicial de los controles.
    loadingParagraph.textContent = 'Cargando...';
    nextButton.textContent = 'Siguiente';
    prevButton.textContent = 'Anterior';


    // Inserta los elementos en el contenedor principal.
    element.appendChild(loadingParagraph);
    element.appendChild(pokemonImage);
    element.appendChild(nextButton);
    element.appendChild(prevButton);

    // Registra los listeners de navegación una sola vez.

    nextButton.addEventListener('click',async () => {
        if (pokemonId ==151) return;// Limita la navegación a los 151 Pokémon originales.
        pokemonId++;// Avanza al siguiente identificador.
        renderPokemon(await getPokemonById(pokemonId));// Obtiene y renderiza el Pokémon.
    });

    prevButton.addEventListener('click',async () => {
        if (pokemonId ==1) return; // Evita identificadores inferiores a 1.
        pokemonId-- ;// Retrocede al identificador anterior.
        renderPokemon(await getPokemonById(pokemonId));});// Obtiene y renderiza el Pokémon.


    // Actualiza la información visible sin reconstruir los controles.
    const renderPokemon = (pokemon) => {


        loadingParagraph.textContent = `Pokemon ${pokemon.id} ${pokemon.name}`;
        pokemonImage.src = pokemon.image;

    }


    // Realiza la petición inicial y muestra el primer Pokémon.
    const pokemon = await getPokemonById(pokemonId);
    renderPokemon(pokemon);

}
