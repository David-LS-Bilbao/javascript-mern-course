# JavaScript: diferencias entre `let`, `const` y `var`

En JavaScript, `let`, `const` y `var` sirven para declarar variables, pero se comportan de forma diferente.

## 1. `let`

Se usa cuando el valor de una variable **puede cambiar** durante la ejecución del programa.

```js
let edad = 30;
edad = 31;

console.log(edad); // 31
```

### Características principales

Con `let`, no puedes declarar otra vez la misma variable dentro del mismo bloque.

```js
let nombre = "David";
let nombre = "Ana"; // Error
```

También tiene **alcance de bloque**, es decir, solo existe dentro de las llaves `{ }` donde se declara.

```js
if (true) {
  let mensaje = "Hola";
}

console.log(mensaje); // Error
```

---

## 2. `const`

Se usa cuando el valor **no debería reasignarse**.

```js
const PI = 3.1416;
PI = 3.15; // Error
```

Igual que `let`, `const` tiene **alcance de bloque**.

```js
if (true) {
  const usuario = "David";
}

console.log(usuario); // Error
```

### Importante: `const` no siempre significa inmutable

Cuando usamos `const` con objetos o arrays, no podemos reasignar la variable completa, pero sí podemos modificar su contenido interno.

Ejemplo con objeto:

```js
const persona = {
  nombre: "David"
};

persona.nombre = "Ana"; // Sí se puede

persona = {}; // Error
```

Ejemplo con array:

```js
const numeros = [1, 2, 3];

numeros.push(4); // Sí se puede

numeros = [5, 6]; // Error
```

Por tanto, `const` significa que la referencia no cambia, no que el contenido sea completamente inmutable.

---

## 3. `var`

`var` es la forma antigua de declarar variables en JavaScript. Hoy en día se recomienda evitarla en código moderno.

```js
var ciudad = "Bilbao";
ciudad = "Madrid";
```

El problema principal de `var` es que **no respeta el alcance de bloque**.

```js
if (true) {
  var saludo = "Hola";
}

console.log(saludo); // "Hola"
```

Aunque se declaró dentro del `if`, sigue existiendo fuera.

Con `let` esto no ocurre:

```js
if (true) {
  let saludo = "Hola";
}

console.log(saludo); // Error
```

---

## Tabla resumen

| Declaración | Se puede reasignar | Se puede redeclarar en el mismo bloque | Alcance |
|---|---:|---:|---|
| `let` | Sí | No | Bloque `{ }` |
| `const` | No | No | Bloque `{ }` |
| `var` | Sí | Sí | Función o global |

---

## Ejemplo de problema con `var`

```js
var x = 10;
var x = 20;

console.log(x); // 20
```

JavaScript permite redeclarar variables con `var`, lo que puede provocar errores difíciles de detectar.

Con `let`, JavaScript evita este problema:

```js
let x = 10;
let x = 20; // Error
```

---

## Regla práctica recomendada

Usa `const` por defecto.

Usa `let` solo cuando necesites cambiar el valor.

Evita `var`, salvo que estés leyendo o manteniendo código antiguo.

```js
const nombre = "David";
let puntos = 0;

puntos = puntos + 10;

console.log(nombre, puntos);
```

En este ejemplo:

- `nombre` usa `const` porque no cambia.
- `puntos` usa `let` porque sí cambia.
- No usamos `var` porque no es recomendable en JavaScript moderno.
