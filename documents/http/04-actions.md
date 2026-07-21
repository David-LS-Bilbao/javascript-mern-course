# Organización mediante actions

> Documento provisional. Los nombres y contratos se adaptarán a la implementación final.

## Qué significa action en este proyecto

`action` no es una palabra reservada de JavaScript. En este proyecto se utiliza como convención para encapsular una operación que la aplicación necesita realizar.

Ejemplos:

- Obtener un Pokémon por ID.
- Obtener un Pokémon por nombre.
- Consultar una lista.
- Transformar o validar la respuesta antes de entregarla al componente.

## Responsabilidades

Una action de acceso a API puede encargarse de:

1. Validar los parámetros recibidos.
2. Construir la URL.
3. Consultar la caché.
4. Realizar la petición con `fetch` cuando sea necesario.
5. Validar `response.ok`.
6. Convertir el cuerpo desde JSON.
7. Devolver datos útiles o lanzar un error.

El componente se ocupa de:

- Escuchar eventos del usuario.
- Mostrar el estado de carga.
- Invocar la action.
- Renderizar los datos.
- Mostrar un error comprensible.

## Separación recomendada

```text
src/
└── pokemon/
    ├── actions/
    │   └── get-pokemon-by-id-action.js
    └── pokemon-app.js
```

Flujo:

```text
pokemon-app.js
    ↓ llama
get-pokemon-by-id-action.js
    ↓ usa
Fetch API / PokéAPI
```

## Ejemplo genérico

```js
const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const getPokemonByIdAction = async (id) => {
  if (!Number.isInteger(id) || id < 1) {
    throw new Error('ID de Pokémon no válido');
  }

  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`No se pudo obtener el Pokémon ${id}`);
  }

  return response.json();
};
```

Uso desde el componente:

```js
const pokemon = await getPokemonByIdAction(currentPokemonId);
renderPokemon(element, pokemon);
```

## Ventajas

- Evita mezclar red y DOM en la misma función.
- Facilita reutilizar una petición desde distintos componentes.
- Hace más sencillo probar la lógica HTTP.
- Centraliza la validación y el manejo de errores.
- Permite añadir caché sin modificar todos los consumidores.

## Qué debería devolver una action

La action debe tener un contrato claro. Puede devolver:

- La respuesta completa de PokéAPI.
- Un objeto transformado con solo los campos usados por la interfaz.
- `null` para ciertos casos esperados, si el contrato lo especifica.

No conviene mezclar contratos. La decisión final debe documentarse cuando exista la implementación real.

Ejemplo de objeto transformado:

```js
{
  id: 25,
  name: 'pikachu',
  image: 'https://...',
  types: ['electric']
}
```

## Manejo de errores

Una action no debería ocultar silenciosamente un error:

```js
try {
  return await requestPokemon(id);
} catch (error) {
  console.error('Error al obtener el Pokémon', error);
  throw error;
}
```

El mensaje técnico y el mensaje para el usuario no tienen por qué ser iguales. El componente puede traducir el fallo a una interfaz más clara.

## Evitar dependencias con el DOM

La action no debería hacer esto:

```js
element.innerHTML = pokemon.name;
```

Su responsabilidad es devolver datos. El componente decide cómo representarlos.

## Nombres y archivos

Conviene mantener una regla consistente:

```text
get-pokemon-by-id-action.js
get-pokemon-by-name-action.js
get-pokemon-list-action.js
```

Al finalizar el módulo revisaremos si todas estas actions son realmente necesarias o si algunas deben combinarse.

