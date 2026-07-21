import { PokemonApp } from './pokemon/pokemon-app';
import './style.css'


document.querySelector('#app').innerHTML = `
<main>
  <h1 id="app-title">Hola mundo </h1>
  <section class="information-card"></section>
</main>
`;

PokemonApp(document.querySelector('.information-card'));

