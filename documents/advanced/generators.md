# JavaScript: funciones generadoras

## Qué es un generador

Una función generadora puede pausar su ejecución, entregar un valor y continuar más adelante desde el mismo punto.

Se declara escribiendo un asterisco después de `function`:

```js
function* createGenerator() {
  yield 'Primer valor';
  yield 'Segundo valor';
  return 'Fin';
}
```

Llamar a la función no ejecuta inmediatamente su cuerpo. Devuelve un objeto generador:

```js
const generator = createGenerator();
```

## Avanzar con `.next()`

Cada llamada a `.next()` reanuda la ejecución hasta encontrar un `yield` o hasta que termina la función.

```js
console.log(generator.next());
// { value: 'Primer valor', done: false }

console.log(generator.next());
// { value: 'Segundo valor', done: false }

console.log(generator.next());
// { value: 'Fin', done: true }
```

`.next()` devuelve un objeto con dos propiedades:

| Propiedad | Significado |
|---|---|
| `value` | Valor entregado por `yield` o `return` |
| `done` | `false` si quedan valores; `true` si terminó el generador |

## Cómo funciona `yield`

`yield` entrega un valor y pausa el generador conservando su estado interno.

```js
function* count() {
  let number = 1;

  yield number;
  number++;
  yield number;
}
```

`yield` no espera una promesa. Esa tarea corresponde a `await`. Aunque ambos pausan una ejecución, pertenecen a conceptos diferentes:

- `yield` pausa un generador hasta la próxima llamada a `.next()`.
- `await` pausa una función `async` hasta que una promesa se resuelve.

## `yield` frente a `return`

`yield` pausa temporalmente el generador y permite continuarlo. `return` lo finaliza.

```js
function* example() {
  yield 1;
  return 2;
  yield 3; // Nunca se ejecuta
}
```

Cuando se alcanza `return`, `.next()` devuelve `done: true`. Las llamadas posteriores devuelven `{ value: undefined, done: true }`.

## Generadores infinitos

Un generador puede representar una secuencia ilimitada sin almacenar todos sus valores en memoria.

```js
function* idGenerator() {
  let currentId = 0;

  while (true) {
    yield ++currentId;
  }
}

const ids = idGenerator();

console.log(ids.next().value); // 1
console.log(ids.next().value); // 2
console.log(ids.next().value); // 3
```

El bucle infinito no bloquea la aplicación porque se detiene en cada `yield`.

## Recorrer un generador con `for...of`

Los generadores son iterables y pueden recorrerse con `for...of`.

```js
function* colors() {
  yield 'rojo';
  yield 'verde';
  yield 'azul';
}

for (const color of colors()) {
  console.log(color);
}
```

`for...of` procesa los valores de `yield`. El valor entregado mediante `return` no forma parte del recorrido.

No recorras un generador infinito con `for...of` sin una condición de salida:

```js
for (const id of idGenerator()) {
  console.log(id);

  if (id === 5) break;
}
```

## Cada instancia conserva su propio estado

Cada llamada a una función generadora crea una instancia independiente.

```js
const first = idGenerator();
const second = idGenerator();

console.log(first.next().value);  // 1
console.log(first.next().value);  // 2
console.log(second.next().value); // 1
```

## Pasar valores a `.next()`

Es posible enviar un valor al generador mediante `.next(value)`. El valor se convierte en el resultado del `yield` que estaba pausado.

```js
function* conversation() {
  const name = yield '¿Cómo te llamas?';
  yield `Hola, ${name}`;
}

const chat = conversation();

console.log(chat.next().value);        // ¿Cómo te llamas?
console.log(chat.next('Ana').value);  // Hola, Ana
```

El argumento de la primera llamada a `.next()` se ignora porque todavía no existe ningún `yield` pausado que pueda recibirlo.

## Finalizar un generador

Además de completar su ejecución, un generador puede cerrarse manualmente con `.return()`:

```js
const generator = idGenerator();

generator.next();
console.log(generator.return('Finalizado'));
// { value: 'Finalizado', done: true }
```

También dispone de `.throw(error)` para lanzar un error dentro del generador.

## Generadores asíncronos

Un generador asíncrono combina el comportamiento de una función `async` con el de un generador. Se declara usando `async function*`.

```js
async function* getMessages() {
  await wait(500);
  yield 'Primer mensaje';

  await wait(500);
  yield 'Segundo mensaje';
}
```

Puede usar `await` para esperar operaciones asíncronas y `yield` para entregar sus resultados uno a uno.

```text
await = espera que termine una operación asíncrona
yield = entrega el resultado y pausa el generador
```

## Consumirlo manualmente con `.next()`

En un generador normal, `.next()` devuelve directamente `{ value, done }`. En un generador asíncrono, `.next()` devuelve una promesa que se resuelve con ese objeto.

```js
const messages = getMessages();

const first = await messages.next();
console.log(first);
// { value: 'Primer mensaje', done: false }

const second = await messages.next();
console.log(second);
// { value: 'Segundo mensaje', done: false }

const end = await messages.next();
console.log(end);
// { value: undefined, done: true }
```

Es importante comprobar `done` antes de utilizar `value`. Cuando el generador termina, normalmente el valor es `undefined`.

```js
const result = await messages.next();

if (!result.done) {
  console.log(result.value);
}
```

## Recorrerlo con `for await...of`

La forma más sencilla de consumir un generador asíncrono es `for await...of`:

```js
for await (const message of getMessages()) {
  console.log(message);
}
```

El bucle espera automáticamente cada valor, se detiene cuando `done` pasa a ser `true` y no procesa el valor final de `return`.

Debe ejecutarse dentro de una función `async` o en un módulo que permita `await` en el nivel superior.

## Ejemplo con datos progresivos

```js
async function* getHeroNames(heroes) {
  for (const hero of heroes) {
    await wait(500);
    yield hero.name;
  }
}

const showHeroes = async (element, heroes) => {
  for await (const heroName of getHeroNames(heroes)) {
    element.innerHTML += `${heroName}<br>`;
  }
};
```

Este patrón es útil cuando los resultados llegan progresivamente y pueden procesarse sin esperar a tenerlos todos.

## Manejar errores

Si una operación esperada dentro del generador falla, la promesa devuelta por `.next()` se rechaza. Al usar `for await...of`, puede capturarse con `try...catch`.

```js
const showMessages = async () => {
  try {
    for await (const message of getMessages()) {
      console.log(message);
    }
  } catch (error) {
    console.error(error);
  }
};
```

## Generador normal frente a generador asíncrono

| Característica | Generador normal | Generador asíncrono |
|---|---|---|
| Declaración | `function*` | `async function*` |
| Puede usar `await` | No | Sí |
| Resultado de `.next()` | `{ value, done }` | `Promise<{ value, done }>` |
| Recorrido habitual | `for...of` | `for await...of` |
| Uso típico | Secuencias síncronas | Datos que llegan de forma asíncrona |

## Casos de uso

Los generadores son útiles para:

- Crear secuencias bajo demanda.
- Mantener estado entre llamadas sin variables globales.
- Implementar iteradores personalizados.
- Trabajar con secuencias muy grandes o infinitas.
- Controlar manualmente el avance de un proceso.

## Errores comunes

### Pensar que el generador se ejecuta al crearlo

```js
const generator = createGenerator();
```

Esta línea solo crea el objeto generador. Su cuerpo comienza con la primera llamada a `.next()`.

### Ignorar la propiedad `done`

Si la secuencia es finita, revisa `done` para saber cuándo terminó.

### Confundir `yield` con `await`

`yield` controla un iterador; no espera automáticamente operaciones asíncronas.

## Resumen mental

```text
function* = declara una función generadora
yield     = entrega un valor y pausa la ejecución
next()    = continúa hasta el siguiente yield
value     = valor entregado
done      = indica si el generador terminó
return    = finaliza el generador
async function* = declara un generador asíncrono
for await...of  = recorre sus valores asíncronos
```
