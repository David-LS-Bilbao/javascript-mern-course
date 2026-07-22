# Estructura actual del módulo users

> Documento provisional actualizado con la implementación existente. Se completará conforme avancen las operaciones CRUD.

## Árbol actual

```text
src/users/
├── mappers/
│   └── localhost-user.mapper.js
├── models/
│   └── users.js
├── presentation/
│   ├── render-add-buttons/
│   │   ├── render-add-button.css
│   │   └── render-add-button.js
│   ├── render-buttons/
│   │   ├── render-buttons.css
│   │   └── render-buttons.js
│   └── render-table/
│       ├── render-table.css
│       └── render-table.js
├── store/
│   └── users-store.js
├── use-cases/
│   └── load-user-by-page.js
└── users-app.js
```

## Flujo implementado

```text
UsersApp
   ↓
userStore.loadNextPage()
   ↓
loadUsersByPage(page)
   ↓
Fetch API → localhostUserToModel() → User[]
   ↓
state.users
   ↓
renderTable() + renderButtons() + renderAddButton()
```

Los botones de paginación esperan la carga del store, actualizan el número de página y vuelven a renderizar el cuerpo de la tabla.

## `models/users.js`

Define la clase `User`, que usa nombres camelCase como `firstName` y `lastName`. No conoce el DOM, Fetch API ni el formato `snake_case` del backend.

## `mappers/localhost-user.mapper.js`

Convierte cada objeto recibido desde json-server en una instancia de `User`. El mapper evita que el formato externo se propague al store y a la presentación.

Actualmente adapta los nombres de las propiedades; no aplica validación ni conversión adicional de tipos.

## `use-cases/load-user-by-page.js`

Construye la URL paginada con `VITE_BASE_URL`, realiza la petición y transforma la respuesta mediante el mapper.

En esta fase concentra tanto el caso de uso como el acceso HTTP. Si aparecen más operaciones o backends, la petición podrá extraerse a una action o repositorio.

## `store/users-store.js`

Mantiene un estado privado con:

- `currentPage`: página cargada actualmente.
- `users`: modelos mostrados en la tabla.

`loadNextPage` evita avanzar cuando recibe una página vacía y `loadPreviousPage` impide bajar de la página 1. El getter de usuarios devuelve una copia superficial del array.

`onUserChanged` y `reloadPage` son puntos de extensión pendientes y todavía lanzan `Not implemented`.

## `presentation`

La presentación está dividida por componentes:

- `render-table` crea una tabla una sola vez y sustituye su `tbody` al cambiar los datos.
- `render-buttons` crea la navegación anterior/siguiente y registra sus listeners.
- `render-add-buttons` crea el botón flotante de alta; la apertura del modal está pendiente.

Las acciones `Select` y `Delete` se muestran en cada fila, pero todavía no están conectadas a casos de uso.

## `users-app.js`

Es el punto de composición del módulo: carga la primera página, limpia el contenedor y monta los tres componentes visuales.

## Pendientes identificados

- Validar `response.ok` antes de procesar el JSON.
- Mostrar estados de carga, error y lista vacía.
- Implementar Create, Update y Delete.
- Crear el modal y sus conversiones de formulario.
- Completar la recarga del store después de una modificación.
- Registrar los listeners de selección y eliminación.
- Decidir si el acceso HTTP necesita una action o repositorio independiente.

## Regla de dependencias usada

La presentación consulta y actualiza el store. El store ejecuta el caso de uso de carga, y este produce modelos mediante el mapper. El modelo permanece independiente de los detalles externos.

La estructura es intencionadamente sencilla: se añadirán nuevas capas solo cuando una responsabilidad real lo justifique.
