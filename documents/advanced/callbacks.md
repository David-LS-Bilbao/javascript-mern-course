# JavaScript: callbacks

## Que es un callback

Un callback es una funcion que se pasa como argumento a otra funcion para que sea ejecutada mas adelante.

La palabra *callback* significa "llamada de vuelta".

Ejemplo simple:

```js
const saludar = (nombre) => {
  console.log(`Hola, ${nombre}`);
};

const procesarUsuario = (callback) => {
  const nombre = 'David';
  callback(nombre);
};

procesarUsuario(saludar);
```

En este ejemplo:

- `saludar` es una funcion.
- `procesarUsuario` recibe una funcion como argumento.
- Dentro de `procesarUsuario`, se ejecuta `callback(nombre)`.

## Las funciones son valores

En JavaScript, las funciones son valores.

Eso significa que puedes:

- Guardarlas en variables.
- Pasarlas como argumentos.
- Retornarlas desde otras funciones.

Ejemplo:

```js
const sumar = (a, b) => a + b;

console.log(sumar(2, 3)); // 5
```

Tambien puedes pasarla a otra funcion:

```js
const operar = (a, b, callback) => {
  return callback(a, b);
};

const resultado = operar(2, 3, sumar);

console.log(resultado); // 5
```

## Callback anonimo

No siempre necesitas declarar la funcion antes.

Puedes pasar una funcion directamente.

```js
const operar = (a, b, callback) => {
  return callback(a, b);
};

const resultado = operar(10, 5, (a, b) => {
  return a - b;
});

console.log(resultado); // 5
```

La funcion:

```js
(a, b) => {
  return a - b;
}
```

es el callback.

## Callbacks sincronicos

Un callback sincronico se ejecuta inmediatamente durante la ejecucion de la funcion principal.

Ejemplo con `forEach`:

```js
const nombres = ['Ana', 'Luis', 'David'];

nombres.forEach((nombre) => {
  console.log(nombre);
});
```

El callback se ejecuta una vez por cada elemento del array.

Otro ejemplo:

```js
const numeros = [1, 2, 3];

const dobles = numeros.map((numero) => {
  return numero * 2;
});

console.log(dobles); // [2, 4, 6]
```

`map` recibe un callback y lo aplica a cada elemento.

## Callbacks asincronicos

Un callback asincronico se ejecuta despues, cuando termina una tarea.

Ejemplo con `setTimeout`:

```js
console.log('Inicio');

setTimeout(() => {
  console.log('Callback ejecutado');
}, 1000);

console.log('Fin');
```

Salida:

```text
Inicio
Fin
Callback ejecutado
```

Aunque `setTimeout` aparece antes que `console.log('Fin')`, su callback se ejecuta despues.

## Por que se usan callbacks

Los callbacks permiten ejecutar codigo cuando algo ocurre.

Se usan en situaciones como:

- Recorrer arrays.
- Manejar eventos del DOM.
- Esperar temporizadores.
- Leer archivos en Node.
- Responder a peticiones.
- Personalizar el comportamiento de una funcion.

Ejemplo con evento del DOM:

```js
const button = document.querySelector('button');

button.addEventListener('click', () => {
  console.log('Click en el boton');
});
```

El callback se ejecuta cuando el usuario hace click.

## Callback con parametros

Una funcion puede pasar datos al callback.

```js
const obtenerUsuario = (callback) => {
  const usuario = {
    id: 1,
    nombre: 'David',
  };

  callback(usuario);
};

obtenerUsuario((usuario) => {
  console.log(usuario.nombre);
});
```

Aqui `obtenerUsuario` decide cuando ejecutar el callback y que datos entregarle.

## Callback con error

En Node.js se volvio comun una convencion llamada error-first callback.

La idea es que el primer argumento del callback sea el error.

```js
const obtenerDatos = (callback) => {
  const error = null;
  const datos = { id: 1, nombre: 'David' };

  callback(error, datos);
};

obtenerDatos((error, datos) => {
  if (error) {
    console.error('Ocurrio un error');
    return;
  }

  console.log(datos);
});
```

Si hay error:

```js
callback(error, null);
```

Si todo va bien:

```js
callback(null, datos);
```

## Callback hell

Callback hell ocurre cuando hay muchos callbacks anidados.

Ejemplo:

```js
login(usuario, (error, user) => {
  if (error) return console.error(error);

  getProfile(user.id, (error, profile) => {
    if (error) return console.error(error);

    getPermissions(profile.role, (error, permissions) => {
      if (error) return console.error(error);

      console.log(permissions);
    });
  });
});
```

El problema es que el codigo empieza a crecer hacia la derecha y se vuelve dificil de leer.

Tambien se conoce como:

```text
pyramid of doom
```

## Como evitar callback hell

Algunas formas de evitarlo:

- Separar callbacks en funciones con nombre.
- Usar `Promise`.
- Usar `async` / `await`.
- Retornar pronto cuando hay errores.
- Mantener funciones pequenas.

Ejemplo separando funciones:

```js
const handlePermissions = (error, permissions) => {
  if (error) return console.error(error);

  console.log(permissions);
};

const handleProfile = (error, profile) => {
  if (error) return console.error(error);

  getPermissions(profile.role, handlePermissions);
};

const handleLogin = (error, user) => {
  if (error) return console.error(error);

  getProfile(user.id, handleProfile);
};

login(usuario, handleLogin);
```

Sigue usando callbacks, pero la lectura mejora.

## Errores comunes

### Ejecutar el callback antes de tiempo

Incorrecto:

```js
button.addEventListener('click', saludar());
```

Aqui `saludar()` se ejecuta inmediatamente.

Correcto:

```js
button.addEventListener('click', saludar);
```

O:

```js
button.addEventListener('click', () => {
  saludar();
});
```

### Olvidar llamar al callback

```js
const procesar = (callback) => {
  const resultado = 10;
};
```

Aunque recibe `callback`, nunca lo ejecuta.

Correcto:

```js
const procesar = (callback) => {
  const resultado = 10;
  callback(resultado);
};
```

### No validar errores

```js
obtenerDatos((error, datos) => {
  console.log(datos.nombre);
});
```

Si hay error, `datos` podria ser `null`.

Mejor:

```js
obtenerDatos((error, datos) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(datos.nombre);
});
```

## Regla practica recomendada

Usa callbacks para entender bien como JavaScript permite pasar funciones como valores.

Pero si la logica asincrona empieza a crecer mucho, normalmente es mejor usar:

```text
Promise
async / await
```

Resumen mental:

```text
callback = funcion que entrego para que otra funcion la ejecute despues
```

Ejemplo minimo:

```js
const ejecutar = (callback) => {
  callback();
};

ejecutar(() => {
  console.log('Callback ejecutado');
});
```
## Callbacks Hell

Callback hell aparece cuando se encadenan muchas operaciones dependientes usando callbacks anidados.

El codigo empieza a crecer hacia la derecha y se vuelve dificil de leer, mantener y depurar.

Ejemplo:

```js
getUser(1, (error, user) => {
  if (error) {
    console.error(error);
    return;
  }

  getPosts(user.id, (error, posts) => {
    if (error) {
      console.error(error);
      return;
    }

    getComments(posts[0].id, (error, comments) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(comments);
    });
  });
});
```

En este ejemplo:

1. Primero se obtiene el usuario.
2. Luego se buscan sus posts.
3. Luego se buscan los comentarios del primer post.

Cada paso depende del resultado anterior.

## Por que callback hell es un problema

Callback hell puede provocar:

- Codigo dificil de leer.
- Mucha indentacion.
- Manejo de errores repetido.
- Dificultad para reutilizar partes de la logica.
- Dificultad para saber donde empieza y termina cada bloque.
- Mayor probabilidad de cometer errores al modificar el codigo.

El problema no es que los callbacks sean malos.

El problema aparece cuando se usan muchos callbacks anidados para controlar flujos complejos.

## Ejemplo visual

Este tipo de estructura:

```js
paso1(() => {
  paso2(() => {
    paso3(() => {
      paso4(() => {
        paso5(() => {
          console.log('Fin');
        });
      });
    });
  });
});
```

se conoce tambien como:

```text
pyramid of doom
```

porque el codigo empieza a formar una piramide hacia la derecha.

## Como reducir callback hell

Hay varias formas de mejorarlo.

### 1. Usar retornos tempranos

En vez de envolver todo en `else`, puedes salir pronto si hay error.

Menos claro:

```js
getUser(1, (error, user) => {
  if (!error) {
    getPosts(user.id, (error, posts) => {
      if (!error) {
        console.log(posts);
      }
    });
  }
});
```

Mas claro:

```js
getUser(1, (error, user) => {
  if (error) return console.error(error);

  getPosts(user.id, (error, posts) => {
    if (error) return console.error(error);

    console.log(posts);
  });
});
```

Esto no elimina el callback hell, pero reduce la complejidad.

### 2. Separar callbacks en funciones con nombre

En lugar de escribir todos los callbacks dentro de otros callbacks, puedes extraer funciones.

```js
const handleComments = (error, comments) => {
  if (error) return console.error(error);

  console.log(comments);
};

const handlePosts = (error, posts) => {
  if (error) return console.error(error);

  getComments(posts[0].id, handleComments);
};

const handleUser = (error, user) => {
  if (error) return console.error(error);

  getPosts(user.id, handlePosts);
};

getUser(1, handleUser);
```

La logica sigue siendo asincrona con callbacks, pero ahora cada funcion tiene un nombre y una responsabilidad mas clara.

### 3. Usar Promises

Las `Promise` ayudan a encadenar operaciones sin anidar tantos bloques.

Ejemplo conceptual:

```js
getUser(1)
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(error => console.error(error));
```

Aqui el manejo de errores queda centralizado en `.catch`.

### 4. Usar async / await

`async` y `await` permiten escribir codigo asincrono con una apariencia mas secuencial.

Ejemplo conceptual:

```js
try {
  const user = await getUser(1);
  const posts = await getPosts(user.id);
  const comments = await getComments(posts[0].id);

  console.log(comments);
} catch (error) {
  console.error(error);
}
```

Este estilo suele ser mas facil de leer cuando hay varios pasos dependientes.

## Regla practica

Si tienes uno o dos callbacks, no hay problema.

Si empiezas a ver muchos niveles de anidacion, conviene replantear la estructura.

Pregunta util:

```text
Puedo leer este codigo de arriba a abajo sin perderme?
```

Si la respuesta es no, probablemente estas entrando en callback hell.

## Resumen

Callback hell no significa que los callbacks sean incorrectos.

Significa que el flujo asincrono esta demasiado anidado.

Para evitarlo:

- Usa retornos tempranos.
- Separa funciones con nombre.
- Mantén funciones pequenas.
- Usa Promises cuando necesites encadenar operaciones.
- Usa async / await cuando quieras una lectura mas lineal.
