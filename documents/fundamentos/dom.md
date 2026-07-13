# JavaScript: que es el DOM y como se usa

## Que es el DOM

El DOM significa **Document Object Model**.

Es la representacion en forma de objetos que el navegador crea a partir del HTML de una pagina.

Cuando escribes HTML como este:

```html
<body>
  <h1>Todo App</h1>
  <ul id="todo-list"></ul>
</body>
```

el navegador lo convierte internamente en una estructura que JavaScript puede leer y modificar.

Gracias al DOM, JavaScript puede:

- Buscar elementos del HTML.
- Crear nuevos elementos.
- Cambiar textos.
- Cambiar clases CSS.
- Escuchar eventos del usuario.
- Insertar o eliminar elementos de la pagina.

## La variable global `document`

En el navegador existe una variable global llamada `document`.

Esta variable representa el documento HTML actual.

```js
console.log(document);
```

Desde `document` podemos consultar y modificar el DOM.

Por ejemplo:

```js
const app = document.querySelector('#app');
```

Ese codigo busca en el HTML un elemento con el id `app`.

## Buscar elementos en el DOM

Los metodos mas comunes para buscar elementos son:

```js
document.querySelector('h1');
document.querySelector('#app');
document.querySelector('.todo-item');
document.querySelectorAll('li');
```

### `querySelector`

Devuelve el primer elemento que coincida con el selector.

```js
const title = document.querySelector('h1');
```

Si no encuentra nada, devuelve `null`.

### `querySelectorAll`

Devuelve una lista de todos los elementos que coincidan.

```js
const items = document.querySelectorAll('li');
```

## Crear elementos

Para crear un elemento HTML desde JavaScript se usa:

```js
const paragraph = document.createElement('p');

```

## Cambiar el contenido de un elemento

Una vez que tienes un elemento, puedes cambiar su contenido.

```js
const title = document.querySelector('h1');

title.textContent = 'Nueva todo app';
```

Tambien se puede usar `innerHTML`, pero hay que usarlo con cuidado.

```js
const app = document.querySelector('#app');

app.innerHTML = '<h1>Hola mundo</h1>';
```

### `textContent` vs `innerHTML`

`textContent` cambia solo texto.

```js
element.textContent = '<strong>Hola</strong>';
```

El navegador mostrara literalmente:

```text
<strong>Hola</strong>
```

`innerHTML` interpreta etiquetas HTML.

```js
element.innerHTML = '<strong>Hola</strong>';
```

El navegador mostrara el texto en negrita.

Regla practica:

- Usa `textContent` cuando solo quieras mostrar texto.
- Usa `innerHTML` solo cuando necesites insertar HTML.
- No uses `innerHTML` con datos escritos por usuarios sin validarlos.

## Insertar elementos en la pagina

Crear un elemento no lo muestra automaticamente en pantalla.

Primero se crea:

```js
const paragraph = document.createElement('p');
paragraph.textContent = 'Aprendiendo DOM';
```

Luego se inserta dentro de otro elemento:

```js
const app = document.querySelector('#app');
app.append(paragraph);
```

## Cambiar clases CSS

El DOM tambien permite modificar clases.

```js
const button = document.querySelector('button');

button.classList.add('active');
button.classList.remove('disabled');
button.classList.toggle('selected');
```

Esto es muy util para cambiar estilos segun el estado de la aplicacion.

## Escuchar eventos

Un evento es algo que ocurre en la pagina.

Por ejemplo:

- Un click.
- Escribir en un input.
- Enviar un formulario.
- Cargar la pagina.

Ejemplo con click:

```js
const button = document.querySelector('button');

button.addEventListener('click', () => {
  console.log('Click en el boton');
});
```

Cuando el usuario hace click, se ejecuta la funcion.

## DOM y estado de la aplicacion

En aplicaciones como una todo app, normalmente tendremos dos partes:

- El **estado**: los datos de la aplicacion.
- El **DOM**: lo que se muestra en pantalla.

Ejemplo de estado:

```js
const todos = [
  { id: 1, text: 'Estudiar DOM', done: false },
  { id: 2, text: 'Practicar eventos', done: true },
];
```

El DOM deberia renderizarse a partir de ese estado.

La idea importante es:

```text
estado -> render -> DOM
```

Cuando cambia el estado, se vuelve a pintar la parte necesaria del DOM.


### Intentar modificar un elemento que no existe

```js
const app = document.querySelector('#app');

app.textContent = 'Hola';
```

Esto funciona solo si existe un elemento con `id="app"` en el HTML.

Si no existe, `app` sera `null` y al intentar usarlo aparecera un error.

Para comprobarlo:

```js
const app = document.querySelector('#app');

if (!app) {
  throw new Error('No existe el elemento #app');
}
```

## Regla practica recomendada

Cuando trabajes con DOM, piensa en este orden:

1. Buscar el elemento.
2. Comprobar que existe si es necesario.
3. Crear o modificar elementos.
4. Insertarlos en el DOM.
5. Escuchar eventos para reaccionar al usuario.

Ejemplo completo:

```js
const app = document.querySelector('#app');

const title = document.createElement('h1');
title.textContent = 'Todo App';

app.append(title);
```

Este ejemplo:

- Busca el contenedor `#app`.
- Crea un `h1`.
- Cambia su texto.
- Lo inserta dentro de `#app`.
