# JavaScript: Promises

## Que es una Promise

Una `Promise` es un objeto que representa un valor que puede estar disponible ahora, en el futuro o nunca.

Se usa para trabajar con operaciones asincronas.

Por ejemplo:

- Pedir datos a una API.
- Leer un archivo.
- Esperar un temporizador.
- Consultar una base de datos.
- Cargar una imagen.

Una promesa no contiene directamente el resultado final.

Contiene la idea de:

```text
Estoy esperando algo que terminara mas adelante.
```

## Problema que resuelven

Antes de las promesas, muchas operaciones asincronas se manejaban con callbacks.

Ejemplo con callback:

```js
getUser(1, (error, user) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(user);
});
```

Esto funciona, pero cuando hay muchos pasos dependientes puede aparecer callback hell.

Las promesas ayudan a escribir flujos asincronos de forma mas ordenada.

## Estados de una Promise

Una promesa puede estar en uno de estos estados:

| Estado | Significado |
|---|---|
| `pending` | Pendiente, aun no ha terminado |
| `fulfilled` | Completada correctamente |
| `rejected` | Rechazada por un error |

Flujo mental:

```text
pending -> fulfilled
pending -> rejected
```

Una vez que una promesa se resuelve o se rechaza, ya no cambia de estado.

## Crear una Promise

Una promesa se crea con `new Promise`.

```js
const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve('Operacion completada');
  } else {
    reject('Ocurrio un error');
  }
});
```

La funcion que recibe `new Promise` tiene dos parametros:

- `resolve`: se llama cuando todo va bien.
- `reject`: se llama cuando ocurre un error.

## Consumir una Promise con `.then`

Para obtener el resultado correcto se usa `.then`.

```js
promise.then((result) => {
  console.log(result);
});
```

Si la promesa ejecuta:

```js
resolve('Operacion completada');
```

entonces el valor llega a:

```js
(result) => {
  console.log(result);
}
```

## Capturar errores con `.catch`

Para manejar errores se usa `.catch`.

```js
promise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
```

Si la promesa ejecuta:

```js
reject('Ocurrio un error');
```

entonces el valor llega a `.catch`.

## Ejecutar codigo final con `.finally`

`.finally` se ejecuta tanto si la promesa se resuelve como si se rechaza.

```js
promise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log('Proceso finalizado');
  });
```

Es util para tareas como:

- Ocultar un loader.
- Cerrar una conexion.
- Limpiar estados temporales.
- Mostrar que una operacion termino.

## Ejemplo con setTimeout

```js
const wait = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Han pasado ${seconds} segundos`);
    }, seconds * 1000);
  });
};

wait(2).then((message) => {
  console.log(message);
});
```

Aqui `wait(2)` devuelve una promesa.

La promesa se resuelve despues de 2 segundos.

## Retornar valores desde `.then`

Un `.then` puede retornar un valor.

Ese valor pasa al siguiente `.then`.

```js
Promise.resolve(10)
  .then((number) => {
    return number * 2;
  })
  .then((number) => {
    console.log(number); // 20
  });
```

Esto permite encadenar transformaciones.

## Encadenar Promises

Si dentro de un `.then` retornas otra promesa, el siguiente `.then` espera a que esa promesa termine.

```js
getUser(1)
  .then((user) => {
    return getPosts(user.id);
  })
  .then((posts) => {
    return getComments(posts[0].id);
  })
  .then((comments) => {
    console.log(comments);
  })
  .catch((error) => {
    console.error(error);
  });
```

Esto evita anidar callbacks de forma excesiva.

## Promise hell

Promise hell ocurre cuando se usan promesas pero se vuelven a anidar como si fueran callbacks.

Ejemplo poco recomendable:

```js
getUser(1).then((user) => {
  getPosts(user.id).then((posts) => {
    getComments(posts[0].id).then((comments) => {
      console.log(comments);
    });
  });
});
```

Aunque usa promesas, vuelve a crecer hacia la derecha.

Mejor:

```js
getUser(1)
  .then((user) => getPosts(user.id))
  .then((posts) => getComments(posts[0].id))
  .then((comments) => console.log(comments))
  .catch((error) => console.error(error));
```

La regla importante es:

```text
Si dentro de un then haces otra promesa, normalmente debes retornarla.
```

## Promise.resolve

`Promise.resolve` crea una promesa resuelta.

```js
Promise.resolve('Hola')
  .then((message) => {
    console.log(message);
  });
```

Esto puede ser util para normalizar valores.

## Promise.reject

`Promise.reject` crea una promesa rechazada.

```js
Promise.reject('Error manual')
  .catch((error) => {
    console.error(error);
  });
```

## Promise.all

`Promise.all` ejecuta varias promesas y espera a que todas terminen correctamente.

```js
Promise.all([
  getUser(1),
  getUser(2),
  getUser(3),
])
  .then((users) => {
    console.log(users);
  })
  .catch((error) => {
    console.error(error);
  });
```

Si una falla, todo el `Promise.all` se rechaza.

Se usa cuando necesitas todos los resultados.

## Promise.race

`Promise.race` recibe varias promesas y se queda con la primera que termine, ya sea resuelta o rechazada.

```js
Promise.race([
  wait(1),
  wait(3),
])
  .then((result) => {
    console.log(result);
  });
```

Se usa cuando importa quien termina primero.

## Promise.allSettled

`Promise.allSettled` espera a que todas las promesas terminen, sin importar si se resuelven o se rechazan.

```js
Promise.allSettled([
  getUser(1),
  Promise.reject('Error'),
  getUser(3),
]).then((results) => {
  console.log(results);
});
```

Cada resultado indica su estado:

```text
fulfilled
rejected
```

Es util cuando quieres saber que paso con todas, aunque algunas fallen.

## Promises y fetch

`fetch` devuelve una promesa.

```js
fetch('https://api.example.com/users')
  .then((response) => {
    return response.json();
  })
  .then((users) => {
    console.log(users);
  })
  .catch((error) => {
    console.error(error);
  });
```

Importante:

```js
response.json()
```

tambien devuelve una promesa.

Por eso se encadena otro `.then`.

## Errores comunes

### No retornar una promesa dentro de `.then`

Incorrecto:

```js
getUser(1)
  .then((user) => {
    getPosts(user.id);
  })
  .then((posts) => {
    console.log(posts); // undefined
  });
```

El problema es que no se retorna `getPosts`.

Correcto:

```js
getUser(1)
  .then((user) => {
    return getPosts(user.id);
  })
  .then((posts) => {
    console.log(posts);
  });
```

O mas corto:

```js
getUser(1)
  .then((user) => getPosts(user.id))
  .then((posts) => console.log(posts));
```

### No usar `.catch`

```js
getUser(1)
  .then((user) => {
    console.log(user);
  });
```

Si la promesa falla, no estas manejando el error.

Mejor:

```js
getUser(1)
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Confundir Promise con resultado final

```js
const user = getUser(1);

console.log(user.name); // Error conceptual
```

`getUser(1)` devuelve una promesa, no el usuario directamente.

Debes esperar el resultado:

```js
getUser(1).then((user) => {
  console.log(user.name);
});
```

## Promises vs callbacks

Callbacks:

```js
getUser(1, (error, user) => {
  if (error) return console.error(error);

  console.log(user);
});
```

Promises:

```js
getUser(1)
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.error(error);
  });
```

Las promesas ayudan a separar mejor el resultado correcto del error.

## Relacion con async / await

`async` y `await` trabajan sobre promesas.

Este codigo:

```js
getUser(1)
  .then((user) => {
    console.log(user);
  });
```

puede escribirse con `await` asi:

```js
const user = await getUser(1);
console.log(user);
```

Pero para usar `await`, normalmente necesitas estar dentro de una funcion `async`.

```js
const main = async () => {
  const user = await getUser(1);
  console.log(user);
};
```

## Regla practica recomendada

Usa promesas cuando tengas operaciones asincronas y quieras:

- Encadenar pasos.
- Manejar errores con `.catch`.
- Evitar callback hell.
- Ejecutar varias operaciones en paralelo con `Promise.all`.

Resumen mental:

```text
Promise = valor futuro
resolve = todo fue bien
reject  = algo fallo
then    = manejar exito
catch   = manejar error
finally = ejecutar al final
```

Ejemplo minimo:

```js
const promise = new Promise((resolve) => {
  resolve('Hola desde una promesa');
});

promise.then((message) => {
  console.log(message);
});
```
