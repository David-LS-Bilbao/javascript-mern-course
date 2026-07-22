# Renderizado, navegación y caché

> Documento provisional. La estructura del DOM y la caché se adaptarán a la aplicación final.

## Estados de la interfaz

Una interfaz que consume una API debería representar al menos cuatro estados:

```text
Inicial → Cargando → Éxito
                  ↘ Error
```

Ejemplos:

```js
const renderLoading = (element) => {
  element.textContent = 'Cargando Pokémon...';
};

const renderError = (element) => {
  element.textContent = 'No se pudo cargar el Pokémon.';
};
```

## Renderizar datos en el DOM

Ejemplo genérico:

```js
const renderPokemon = (element, pokemon) => {
  element.innerHTML = `
    <article class="pokemon-card">
      <h2>${pokemon.name}</h2>
      <img src="${pokemon.image}" alt="${pokemon.name}">
      <p>N.º ${pokemon.id}</p>
    </article>
  `;
};
```

Si los datos proceden de usuarios o fuentes no confiables, interpolarlos directamente en `innerHTML` puede introducir riesgos. Cuando no se necesita HTML dinámico, `textContent` es más seguro.

En este proyecto se revisará qué campos proceden directamente de PokéAPI y cómo se transforman antes de renderizarlos.

## Botones de navegación

La aplicación puede mantener el identificador actual en una variable:

```js
let currentPokemonId = 1;
```

Los listeners actualizan ese estado y solicitan el nuevo Pokémon:

```js
previousButton.addEventListener('click', async () => {
  if (currentPokemonId <= 1) return;

  currentPokemonId--;
  await loadPokemon(currentPokemonId);
});

nextButton.addEventListener('click', async () => {
  currentPokemonId++;
  await loadPokemon(currentPokemonId);
});
```

La navegación debería impedir identificadores inválidos y desactivar botones cuando no sea posible avanzar o retroceder.

## Navegación implementada actualmente

El componente comienza en el identificador `1` y permite navegar hasta el `151`. Este límite representa los Pokémon originales incluidos en la primera generación y es una decisión de interfaz, no un límite general del endpoint de PokéAPI.

Cada listener:

1. Comprueba el límite.
2. Actualiza `pokemonId`.
3. Solicita el Pokémon mediante la action.
4. Renderiza el resultado.

Actualmente, los botones siguen habilitados mientras se realiza la petición. Si se pulsa rápidamente varias veces, pueden existir peticiones simultáneas y respuestas fuera de orden. Este comportamiento se revisará cuando la lección incorpore estados de carga o cancelación.

## Evitar listeners duplicados

Si se reconstruye todo el HTML en cada renderizado y se vuelven a registrar listeners, pueden aparecer eventos duplicados o referencias a elementos antiguos.

Una estrategia sencilla es:

1. Crear una estructura estable una sola vez.
2. Registrar los listeners una sola vez.
3. Actualizar únicamente la zona que contiene los datos del Pokémon.

## Evitar resultados fuera de orden

Si el usuario pulsa rápidamente varios botones, una petición antigua puede terminar después que una nueva y sobrescribir la interfaz.

Posibles estrategias:

- Desactivar temporalmente los botones mientras carga.
- Registrar el último ID solicitado y descartar respuestas antiguas.
- Cancelar la petición anterior con `AbortController`.

La estrategia final dependerá del alcance de la lección.

## Caché en memoria

Una caché guarda resultados ya obtenidos para no repetir la misma petición.

En la implementación actual, la caché vive dentro del módulo de la action:

```js
const pokemonCache = new Map();
```

Al volver a un Pokémon ya visitado, la action devuelve el objeto almacenado y omite `fetch`.

```js
const pokemonCache = new Map();
```

Flujo básico:

```js
export const getPokemonByIdAction = async (id) => {
  if (pokemonCache.has(id)) {
    return pokemonCache.get(id);
  }

  const pokemon = await requestPokemon(id);
  pokemonCache.set(id, pokemon);

  return pokemon;
};
```

## Por qué usar `Map`

`Map` ofrece métodos claros para una caché:

```js
pokemonCache.has(id);
pokemonCache.get(id);
pokemonCache.set(id, pokemon);
pokemonCache.delete(id);
pokemonCache.clear();
```

## Normalizar la clave

`Map` diferencia entre el número `25` y el texto `'25'`. Conviene normalizar el identificador:

```js
const normalizedId = Number(id);
```

La validación debe realizarse antes de consultar la caché o construir la URL.

## No guardar errores como datos válidos

La caché debería actualizarse únicamente después de obtener y validar correctamente la respuesta:

```js
const pokemon = await requestPokemon(id);
pokemonCache.set(id, pokemon);
```

Si la petición falla, debe permitirse un nuevo intento posterior.

## Guardar promesas en caché

Dos llamadas simultáneas para el mismo ID pueden generar dos peticiones antes de que llegue la primera respuesta. Una opción más avanzada consiste en guardar temporalmente la promesa:

```js
const request = requestPokemon(id);
pokemonCache.set(id, request);

try {
  return await request;
} catch (error) {
  pokemonCache.delete(id);
  throw error;
}
```

Esta técnica evita solicitudes simultáneas duplicadas, pero añade complejidad. Se utilizará solo si encaja con el nivel y alcance final del módulo.

## Límites de una caché en memoria

- Se pierde al recargar la página.
- No se comparte entre pestañas.
- Puede crecer mientras la aplicación está abierta.
- Puede devolver información antigua si el servidor cambia.

Para esta aplicación didáctica puede ser suficiente. Si se necesitara persistencia, habría que evaluar mecanismos como `localStorage` o IndexedDB, pero no deben añadirse sin formar parte de la lección.

## Lista de comprobación

- [ ] Se muestra un estado de carga.
- [ ] Los errores no rompen la interfaz.
- [ ] Los botones no generan IDs inválidos.
- [ ] Los listeners se registran una sola vez.
- [ ] Una respuesta antigua no sobrescribe la navegación actual.
- [ ] La caché evita repetir peticiones completadas.
- [ ] Los errores no quedan almacenados como respuestas válidas.
- [ ] Los datos se renderizan de forma segura.
