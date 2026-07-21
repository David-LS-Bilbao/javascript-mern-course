import { getPokemonById } from '../pokemon/actions/get-pokemon-by-id-action';

/**
 * Inicializa el componente principal de la aplicación de Pokémon.
 * @param {HTMLElement} element Contenedor donde se mostrará la información.
 */
export const PokemonApp = async (element) => {

    document.title = 'Pokemon App';


    // Actualiza el encabezado principal de la aplicación.
    const titleElement=document.querySelector('#app-title');
    titleElement && (titleElement.innerHTML = 'Pokemon App');


    // creamos los elemetos del DOM HTML
    const loadingParagraph = document.createElement('p');
    const pokemonImage = document.createElement('img');
    const nextButton = document.createElement('button');
    const prevButton = document.createElement('button');


    // Configuraciones
    loadingParagraph.textContent = 'Cargando...';
    nextButton.textContent = 'Siguiente';
    prevButton.textContent = 'Anterior';


    // Eventos
    element.appendChild(loadingParagraph);
    element.appendChild(pokemonImage);
    element.appendChild(nextButton);
    element.appendChild(prevButton);

    //Listeners

    nextButton.addEventListener('click', () => getPokemonById(6));
    prevButton.addEventListener('click', () => getPokemonById(4));


    //Renderizar el pokemon

    const renderPokemon = (pokemon) => {

        loadingParagraph.textContent = `Pokemon ${pokemon.id} ${pokemon.name}`;
        pokemonImage.src = pokemon.image;
    }

    //Peticion inicial


    const pokemon = await getPokemonById(1);
    renderPokemon(pokemon);
    
}
