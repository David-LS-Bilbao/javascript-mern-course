# JavaScript: async y await

## Qué es `async`

La palabra clave `async` permite declarar una función asíncrona. Una función `async` siempre devuelve una promesa, incluso cuando retorna un valor normal.

```js
const getNumber = async () => {
  return 10;
};

getNumber().then((number) => {
  console.log(number); // 10
});
```

JavaScript convierte automáticamente el valor retornado en una promesa resuelta. El ejemplo anterior equivale conceptualmente a `Promise.resolve(10)`.

## Qué es `await`

`await` espera el resultado de una promesa y permite trabajar con ese resultado como un valor normal.

```js
const showUser = async () => {
  const user = await getUser(1);
  console.log(user);
};
```

`await` pausa únicamente la función `async` que lo contiene. No bloquea todo JavaScript ni detiene el resto de la aplicación.

## Relación con `.then`

Este código con promesas:

```js
getUser(1)
  .then((user) => console.log(user))
  .catch((error) => console.error(error));
```

puede escribirse con `async` y `await` así:

```js
const showUser = async () => {
  try {
    const user = await getUser(1);
    console.log(user);
  } catch (error) {
    console.error(error);
  }
};
```

Ambas formas trabajan con promesas. `async` y `await` cambian la sintaxis, pero no sustituyen el funcionamiento de las promesas.

## Manejar errores con `try...catch`

Si una promesa esperada con `await` se rechaza, se produce un error que puede capturarse con `try...catch`.

```js
const findAndShowHero = async (id) => {
  try {
    const hero = await findHero(id);
    console.log(hero.name);
  } catch (error) {
    console.error(error);
  }
};
```

También puede manejarse desde fuera la promesa que devuelve la función `async`:

```js
findAndShowHero('invalid-id').catch(console.error);
```

## Ejecución secuencial

Cuando cada operación necesita el resultado de la anterior, los `await` se ejecutan en orden.

```js
const loadComments = async () => {
  const user = await getUser(1);
  const posts = await getPosts(user.id);
  const comments = await getComments(posts[0].id);

  return comments;
};
```

En este caso no se pueden buscar las publicaciones antes de conocer el usuario.

## Ejecución en paralelo con `Promise.all`

Si las operaciones no dependen entre sí, iniciarlas en paralelo suele ser más eficiente.

```js
const loadHeroes = async () => {
  const [hero1, hero2] = await Promise.all([
    findHero('id-1'),
    findHero('id-2'),
  ]);

  return [hero1, hero2];
};
```

`Promise.all` espera todas las promesas. Si una se rechaza, también se rechaza `Promise.all` y el error puede capturarse con `try...catch`.

## Retornar valores

El resultado retornado por una función `async` queda dentro de una promesa.

```js
const getHeroName = async (id) => {
  const hero = await findHero(id);
  return hero.name;
};

const main = async () => {
  const name = await getHeroName('id-1');
  console.log(name);
};
```

## Recorrer promesas con `for await...of`

`for await...of` permite recorrer valores asíncronos. Si recibe un arreglo de promesas, espera cada promesa antes de ejecutar el cuerpo del bucle.

```js
const heroPromises = [
  findHero('id-1'),
  findHero('id-2'),
  findHero('id-3'),
];

for await (const hero of heroPromises) {
  console.log(hero.name);
}
```

Las promesas del arreglo se crean antes de comenzar el bucle, por lo que sus operaciones pueden estar ejecutándose al mismo tiempo. Sin embargo, los resultados se procesan respetando el orden del arreglo.

El bucle debe estar dentro de una función `async` o en un módulo que permita `await` en el nivel superior.

Si una promesa se rechaza, el bucle se interrumpe. Usa `try...catch` cuando necesites manejar el error:

```js
const showHeroes = async () => {
  try {
    for await (const hero of heroPromises) {
      console.log(hero.name);
    }
  } catch (error) {
    console.error(error);
  }
};
```

`for await...of` también puede recorrer iterables asíncronos, como flujos de datos cuyos valores llegan progresivamente.

### Diferencia frente a `Promise.all`

- `for await...of` permite procesar cada resultado dentro del bucle.
- `Promise.all` entrega un arreglo cuando todas las promesas se han resuelto.
- Ambos rechazan la operación si alguna de las promesas falla.

```js
const heroes = await Promise.all(heroPromises);
console.log(heroes);
```

## Errores comunes

### Olvidar `await`

```js
const hero = findHero('id-1');
console.log(hero.name); // hero es una promesa
```

Correcto:

```js
const hero = await findHero('id-1');
console.log(hero.name);
```

### No manejar una promesa rechazada

Si una operación puede fallar, usa `try...catch` o maneja con `.catch()` la promesa devuelta por la función `async`.

### Usar `await` innecesariamente en operaciones independientes

Varios `await` consecutivos ejecutan las tareas en orden. Si no dependen entre sí, considera usar `Promise.all`.

### Pensar que `async` vuelve asíncrono cualquier trabajo

`async` hace que una función devuelva una promesa, pero no convierte automáticamente un cálculo pesado y síncrono en trabajo paralelo.

## Regla práctica

Usa `async` y `await` para:

- Escribir flujos asíncronos de forma legible.
- Esperar valores producidos por promesas.
- Manejar errores con `try...catch`.
- Encadenar operaciones dependientes.
- Combinar operaciones independientes con `Promise.all`.

Resumen mental:

```text
async       = la función siempre devuelve una promesa
await       = espera una promesa dentro de una función async
try...catch = maneja promesas rechazadas al usar await
Promise.all = espera varias operaciones en paralelo
for await  = recorre valores y promesas de forma asíncrona
```
