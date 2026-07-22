# Módulo HTTP y PokéAPI

Esta carpeta contiene la documentación provisional de la aplicación de Pokémon. Los documentos presentan una base genérica que se revisará y adaptará al código real al finalizar cada lección.

## Objetivos del módulo

- Comprender la comunicación entre un cliente y una API.
- Realizar peticiones HTTP `GET` con Fetch API.
- Examinar endpoints y respuestas con Postman.
- Separar las llamadas HTTP mediante actions.
- Mostrar datos obtenidos de una API en el DOM.
- Navegar entre Pokémon mediante botones.
- Evitar peticiones repetidas mediante una caché en memoria.
- Manejar estados de carga, éxito y error.

## Documentos

1. [Fundamentos de HTTP y APIs](./01-http-y-apis.md)
2. [Peticiones con Fetch API](./02-fetch-api.md)
3. [Pruebas de endpoints con Postman](./03-postman.md)
4. [Organización mediante actions](./04-actions.md)
5. [DOM, navegación y caché](./05-dom-navegacion-cache.md)

## Flujo general de la aplicación

```text
Usuario pulsa un botón
        ↓
Componente calcula el Pokémon solicitado
        ↓
Action consulta la caché
        ↓
Si no existe, Fetch solicita el recurso a PokéAPI
        ↓
La respuesta se valida y transforma desde JSON
        ↓
El componente renderiza los datos en el DOM
```

## Estado actual de la implementación

La aplicación ya incluye:

- Una action para consultar Pokémon por identificador.
- Transformación de la respuesta a `{ id, name, weight, image }`.
- Caché privada del módulo mediante `Map`.
- Navegación con botones entre los identificadores `1` y `151`.
- Actualización del nombre y la imagen sin reconstruir los controles.

Queda pendiente revisar durante las próximas lecciones:

- Validación de `response.ok` antes de convertir el cuerpo.
- Estados visuales de carga y error en cada navegación.
- Desactivación de los botones en los límites y durante la carga.
- Comportamiento ante varios clics rápidos.
- Texto alternativo y estado cuando una imagen no está disponible.

## Referencias oficiales

- [Using the Fetch API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Documentación de PokéAPI](https://pokeapi.co/docs/v2)
- [Enviar peticiones con Postman](https://learning.postman.com/docs/use/send-requests/requests)
