# JavaScript: operador spread `...`

## Que es el operador spread

El operador spread se escribe con tres puntos:

```js
...
```

Sirve para **expandir** los valores de un array, objeto o iterable en otro lugar.

La palabra *spread* significa "esparcir" o "expandir".

Ejemplo simple:

```js
const numeros = [1, 2, 3];

console.log(...numeros); // 1 2 3
```

Sin spread, `numeros` es un solo array.

Con spread, JavaScript expande sus valores uno por uno.

## Spread con arrays

Uno de los usos mas comunes es crear un nuevo array a partir de otro.

```js
const numeros = [1, 2, 3];
const copia = [...numeros];

console.log(copia); // [1, 2, 3]
```

Esto crea un array nuevo con los mismos valores.

## Agregar elementos a un array

Puedes usar spread para agregar elementos antes o despues.

```js
const numeros = [2, 3, 4];

const resultado = [1, ...numeros, 5];

console.log(resultado); // [1, 2, 3, 4, 5]
```

Esto es muy util cuando quieres crear un array nuevo sin modificar el original.

```js
const todos = ['Estudiar DOM', 'Practicar eventos'];

const nuevosTodos = [...todos, 'Guardar en localStorage'];

console.log(nuevosTodos);
```

## Unir arrays

Spread tambien permite unir varios arrays.

```js
const frontend = ['HTML', 'CSS'];
const javascript = ['Variables', 'Funciones'];

const curso = [...frontend, ...javascript];

console.log(curso); // ['HTML', 'CSS', 'Variables', 'Funciones']
```

Antes se usaba mucho `concat`.

```js
const curso = frontend.concat(javascript);
```

Ambas formas son validas, pero spread suele ser mas claro en codigo moderno.

## Spread con objetos

Tambien se puede usar con objetos.

```js
const user = {
  name: 'David',
  age: 30,
};

const copy = { ...user };

console.log(copy); // { name: 'David', age: 30 }
```

Esto crea un objeto nuevo copiando las propiedades del objeto original.

## Agregar propiedades a un objeto

Puedes crear un objeto nuevo con las propiedades anteriores y añadir nuevas.

```js
const user = {
  name: 'David',
};

const userWithRole = {
  ...user,
  role: 'admin',
};

console.log(userWithRole); // { name: 'David', role: 'admin' }
```

## Sobrescribir propiedades

Si una propiedad aparece varias veces, gana la ultima.

```js
const user = {
  name: 'David',
  role: 'user',
};

const updatedUser = {
  ...user,
  role: 'admin',
};

console.log(updatedUser); // { name: 'David', role: 'admin' }
```

El orden importa.

```js
const updatedUser = {
  role: 'admin',
  ...user,
};

console.log(updatedUser); // { role: 'user', name: 'David' }
```

En este segundo caso, `...user` se aplica al final y sobrescribe `role`.

## Copias superficiales

Spread crea una **copia superficial**.

Eso significa que copia el primer nivel, pero no clona profundamente objetos internos.

```js
const user = {
  name: 'David',
  address: {
    city: 'Bilbao',
  },
};

const copy = { ...user };

copy.name = 'Ana';
copy.address.city = 'Madrid';

console.log(user.name); // 'David'
console.log(user.address.city); // 'Madrid'
```

`name` no cambia en el original porque es una propiedad del primer nivel.

Pero `address.city` si cambia, porque `address` sigue apuntando al mismo objeto interno.

Esto es importante cuando trabajas con estado global.

## Spread en llamadas a funciones

Spread tambien sirve para pasar valores de un array como argumentos de una funcion.

```js
const numeros = [5, 10, 2];

const maximo = Math.max(...numeros);

console.log(maximo); // 10
```

Sin spread, esto no funcionaria igual:

```js
Math.max(numeros); // NaN
```

`Math.max` espera numeros separados, no un array completo.

## Diferencia entre spread y rest

Spread y rest usan la misma sintaxis:

```js
...
```

Pero no significan exactamente lo mismo.

### Spread expande valores

```js
const numeros = [1, 2, 3];

console.log(...numeros); // 1 2 3
```

Spread se usa para sacar valores de un array u objeto.

### Rest agrupa valores

```js
const sumar = (...numeros) => {
  return numeros.reduce((total, numero) => total + numero, 0);
};

console.log(sumar(1, 2, 3)); // 6
```

Rest agrupa varios argumentos dentro de un array.

Regla practica:

- Spread expande.
- Rest agrupa.

## Uso comun en una todo app

En una aplicacion de tareas, spread puede servir para agregar una nueva tarea sin modificar directamente el array original.

```js
const todos = [
  { id: 1, text: 'Estudiar DOM', done: false },
];

const newTodo = {
  id: 2,
  text: 'Practicar spread',
  done: false,
};

const updatedTodos = [...todos, newTodo];

console.log(updatedTodos);
```

Tambien puede servir para actualizar una tarea.

```js
const todo = {
  id: 1,
  text: 'Estudiar DOM',
  done: false,
};

const completedTodo = {
  ...todo,
  done: true,
};

console.log(completedTodo);
```

## Errores comunes

### Pensar que modifica el original

```js
const numbers = [1, 2, 3];
const copy = [...numbers];

copy.push(4);

console.log(numbers); // [1, 2, 3]
console.log(copy);    // [1, 2, 3, 4]
```

Spread crea un array nuevo. No modifica el array original.

### Usarlo con valores que no se pueden expandir

```js
const age = 30;

console.log(...age); // Error
```

Un numero no se puede expandir.

Spread funciona con arrays, strings, objetos y otros valores iterables, segun el contexto.

### Confundir copia superficial con copia profunda

```js
const state = {
  user: {
    name: 'David',
  },
};

const copy = { ...state };

copy.user.name = 'Ana';

console.log(state.user.name); // 'Ana'
```

El objeto interno `user` no se clona profundamente.

## Regla practica recomendada

Usa spread cuando quieras:

- Crear copias simples de arrays u objetos.
- Agregar elementos sin modificar el array original.
- Unir arrays.
- Crear objetos nuevos manteniendo propiedades anteriores.
- Pasar arrays como argumentos separados a una funcion.

Evita pensar que spread hace una copia profunda. Para estructuras anidadas hay que tener mas cuidado.

Ejemplo final:

```js
const previousState = {
  filter: 'all',
  todos: ['Estudiar DOM'],
};

const nextState = {
  ...previousState,
  todos: [...previousState.todos, 'Practicar spread'],
};

console.log(nextState);
```

Este ejemplo crea un nuevo estado sin modificar directamente el estado anterior.
