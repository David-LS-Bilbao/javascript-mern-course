# JavaScript: localStorage

## Que es localStorage

`localStorage` es una API del navegador que permite guardar informacion en el dispositivo del usuario.

Esa informacion queda guardada incluso si:

- Se recarga la pagina.
- Se cierra la pestaña.
- Se cierra el navegador.
- Se apaga y vuelve a encender el equipo.

Es util para guardar datos sencillos de una aplicacion frontend, por ejemplo:

- Preferencias de usuario.
- Tema claro u oscuro.
- Tareas de una todo app.
- Filtros seleccionados.
- Datos temporales que no necesitan backend.

## Donde vive localStorage

`localStorage` pertenece al navegador.

Por eso solo existe en un entorno web. No existe directamente en Node.js.

Puedes verlo en Chrome desde:

```text
DevTools -> Application -> Local storage
```

Alli veras los datos guardados para la URL actual.

Importante: `localStorage` esta separado por origen.

Un origen se compone de:

```text
protocolo + dominio + puerto
```

Por ejemplo:

```text
http://localhost:5173
```

Los datos guardados en `http://localhost:5173` no son los mismos que los de otra URL o puerto.

## Guardar datos

Para guardar un dato se usa `setItem`.

```js
localStorage.setItem('username', 'David');
```

El primer argumento es la clave.

El segundo argumento es el valor.

```text
clave -> username
valor -> David
```

## Leer datos

Para leer un dato se usa `getItem`.

```js
const username = localStorage.getItem('username');

console.log(username); // 'David'
```

Si la clave no existe, devuelve `null`.

```js
const theme = localStorage.getItem('theme');

console.log(theme); // null
```

## Eliminar datos

Para eliminar una clave concreta se usa `removeItem`.

```js
localStorage.removeItem('username');
```

Para borrar todo el `localStorage` del origen actual se usa `clear`.

```js
localStorage.clear();
```

Hay que usar `clear` con cuidado porque elimina todas las claves guardadas por esa aplicacion.

## localStorage solo guarda strings

Este punto es muy importante.

`localStorage` solo guarda texto.

Si guardas un numero:

```js
localStorage.setItem('age', 30);
```

el navegador lo guarda como string:

```js
const age = localStorage.getItem('age');

console.log(age); // '30'
```

Por eso, para guardar arrays u objetos, necesitamos convertirlos a JSON.

## Guardar objetos con JSON.stringify

Supongamos que tenemos un objeto:

```js
const user = {
  name: 'David',
  role: 'student',
};
```

No conviene guardarlo directamente:

```js
localStorage.setItem('user', user);
```

Eso guardaria algo como:

```text
[object Object]
```

La forma correcta es convertir el objeto a JSON:

```js
localStorage.setItem('user', JSON.stringify(user));
```

`JSON.stringify` convierte el objeto en un string valido.

## Leer objetos con JSON.parse

Cuando recuperamos el dato, vuelve como string.

```js
const userFromStorage = localStorage.getItem('user');
```

Para convertirlo de nuevo en objeto usamos `JSON.parse`.

```js
const user = JSON.parse(userFromStorage);

console.log(user.name); // 'David'
```

Regla practica:

- Para guardar objetos o arrays: `JSON.stringify`.
- Para leer objetos o arrays: `JSON.parse`.

## Guardar arrays

En una todo app normalmente tendremos un array de tareas.

```js
const todos = [
  { id: '1', description: 'Estudiar DOM', done: false },
  { id: '2', description: 'Practicar localStorage', done: true },
];
```

Para guardarlo:

```js
localStorage.setItem('todos', JSON.stringify(todos));
```

Para leerlo:

```js
const todosFromStorage = localStorage.getItem('todos');
const todos = JSON.parse(todosFromStorage);
```

## Evitar errores al leer datos inexistentes

Si una clave no existe, `getItem` devuelve `null`.

Esto puede ser un problema:

```js
const todos = JSON.parse(localStorage.getItem('todos'));
```

Si `todos` no existe, se esta haciendo:

```js
JSON.parse(null);
```

En este caso devuelve `null`, no un array.

Para una todo app suele ser mejor usar un valor por defecto:

```js
const todos = JSON.parse(localStorage.getItem('todos')) || [];
```

Asi, si no habia tareas guardadas, la app empieza con un array vacio.

## Patron habitual en una aplicacion

Una forma sencilla de usar `localStorage` es:

1. Al iniciar la app, cargar datos desde `localStorage`.
2. Guardar esos datos en el estado global.
3. Cada vez que cambia el estado, volver a guardar en `localStorage`.
4. Renderizar la interfaz a partir del estado.

El flujo seria:

```text
localStorage -> store global -> render DOM
```

Cuando el usuario modifica algo:

```text
evento del usuario -> store global -> localStorage -> render DOM
```

## Aplicado a una todo app

En una todo app, `localStorage` puede guardar:

- El array de tareas.
- El filtro actual.
- La fecha de creacion de cada tarea.
- Si una tarea esta completada o pendiente.

Ejemplo conceptual de estado:

```js
const state = {
  todos: [
    { id: '1', description: 'Aprender localStorage', done: false },
  ],
  filter: 'all',
};
```

Ese estado podria guardarse completo:

```js
localStorage.setItem('state', JSON.stringify(state));
```

Y recuperarse al iniciar:

```js
const savedState = JSON.parse(localStorage.getItem('state'));
```

## localStorage vs sessionStorage

`localStorage` y `sessionStorage` se usan de forma parecida, pero no duran lo mismo.

| API | Duracion |
|---|---|
| `localStorage` | Persiste aunque cierres el navegador |
| `sessionStorage` | Se borra al cerrar la pestaña |

Para una todo app, normalmente se usa `localStorage`, porque queremos conservar las tareas.

## Que no deberias guardar en localStorage

No guardes informacion sensible.

Evita guardar:

- Passwords.
- Tokens privados si no sabes bien las implicaciones de seguridad.
- Datos bancarios.
- Informacion personal sensible.

`localStorage` es accesible desde JavaScript. Si una pagina tiene una vulnerabilidad XSS, esos datos podrian quedar expuestos.

## Errores comunes

### Olvidar JSON.stringify

```js
localStorage.setItem('todos', todos);
```

Esto no guarda correctamente el array como esperas.

Mejor:

```js
localStorage.setItem('todos', JSON.stringify(todos));
```

### Olvidar JSON.parse

```js
const todos = localStorage.getItem('todos');

todos.forEach(todo => {
  console.log(todo);
});
```

Esto fallara porque `todos` es un string, no un array.

Mejor:

```js
const todos = JSON.parse(localStorage.getItem('todos')) || [];
```

### Usar claves poco claras

```js
localStorage.setItem('data', JSON.stringify(todos));
```

Mejor usar una clave mas descriptiva:

```js
localStorage.setItem('todos', JSON.stringify(todos));
```

O una clave con nombre de proyecto:

```js
localStorage.setItem('todo-app:todos', JSON.stringify(todos));
```

## Regla practica recomendada

Para proyectos pequenos:

- Usa claves claras.
- Guarda arrays y objetos con `JSON.stringify`.
- Lee arrays y objetos con `JSON.parse`.
- Define valores por defecto si no hay datos guardados.
- Centraliza el acceso a `localStorage` en el store o en funciones concretas.

En esta todo app, lo ideal es que el DOM no hable directamente con `localStorage`.

El flujo mas ordenado seria:

```text
DOM -> store -> localStorage
```

Y al iniciar:

```text
localStorage -> store -> DOM
```

Asi la aplicacion mantiene una separacion clara entre interfaz, estado y persistencia.
