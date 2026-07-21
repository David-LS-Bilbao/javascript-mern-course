# Peticiones con Fetch API

> Documento provisional. Los ejemplos se ajustarán a las actions reales del proyecto.

## Qué es Fetch API

Fetch API es una interfaz del navegador para realizar peticiones de red. `fetch()` devuelve una promesa que se resuelve con un objeto `Response`.

```js
fetch('https://pokeapi.co/api/v2/pokemon/25')
  .then((response) => response.json())
  .then((pokemon) => console.log(pokemon));
```

## Petición GET

`GET` es el método predeterminado de `fetch`:

```js
const response = await fetch(
  'https://pokeapi.co/api/v2/pokemon/25',
);
```

También puede indicarse explícitamente:

```js
const response = await fetch(url, {
  method: 'GET',
});
```

## Convertir la respuesta desde JSON

`fetch()` no entrega directamente los datos del Pokémon. Primero devuelve un objeto `Response`.

```js
const response = await fetch(url);
const pokemon = await response.json();
```

`response.json()` también es asíncrono y devuelve una promesa.

## Validar el estado HTTP

`fetch()` no rechaza automáticamente la promesa cuando el servidor responde con errores HTTP como `404` o `500`. Es necesario revisar `response.ok` o `response.status`.

```js
const response = await fetch(url);

if (!response.ok) {
  throw new Error(`Error HTTP: ${response.status}`);
}

const pokemon = await response.json();
```

`response.ok` es `true` cuando el código de estado está entre `200` y `299`.

## Action básica para obtener un Pokémon

```js
const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const getPokemonById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`No se pudo obtener el Pokémon ${id}`);
  }

  return response.json();
};
```

Esta action:

1. Recibe el identificador.
2. Construye la URL.
3. Espera la respuesta.
4. Valida el estado HTTP.
5. Devuelve los datos convertidos desde JSON.

El ejemplo es genérico y se adaptará al nombre y contrato finales del proyecto.

## Manejar errores

```js
const loadPokemon = async (id) => {
  try {
    const pokemon = await getPokemonById(id);
    console.log(pokemon);
  } catch (error) {
    console.error(error);
  }
};
```

Conviene distinguir entre:

- Errores HTTP: la API respondió con un estado no satisfactorio.
- Errores de red: no fue posible obtener una respuesta.
- Errores de datos: la respuesta no tiene la estructura esperada.
- Cancelaciones: la petición fue abortada intencionadamente.

## Estado de carga

Una petición tarda un tiempo indeterminado. La interfaz debería informar al usuario:

```js
element.innerHTML = '<p>Cargando Pokémon...</p>';

try {
  const pokemon = await getPokemonById(id);
  renderPokemon(element, pokemon);
} catch (error) {
  element.innerHTML = '<p>No se pudo cargar el Pokémon.</p>';
}
```

## Evitar errores habituales

### Olvidar el segundo `await`

Incorrecto:

```js
const pokemon = response.json();
console.log(pokemon.name); // pokemon todavía es una promesa
```

Correcto:

```js
const pokemon = await response.json();
```

### No validar `response.ok`

Una respuesta `404` sigue produciendo un objeto `Response`. Sin validación, el error puede pasar inadvertido.

### Construir URLs sin validar entradas

El identificador debe cumplir el contrato esperado antes de incorporarlo a la URL.

```js
if (!Number.isInteger(id) || id < 1) {
  throw new Error('El identificador debe ser un entero positivo');
}
```

### Mostrar directamente mensajes técnicos

Los detalles técnicos pueden registrarse para depuración, pero la interfaz debería mostrar un mensaje comprensible para el usuario.

## Referencias

- [Using the Fetch API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [`Response.ok` — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)
- [Endpoint Pokémon — PokéAPI](https://pokeapi.co/docs/v2#pokemon)

