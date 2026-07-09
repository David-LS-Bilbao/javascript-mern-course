# JavaScript: tipos primitivos

En JavaScript, los **tipos primitivos** son valores básicos que no son objetos.

Son valores simples, inmutables y representan datos directos como textos, números, booleanos o valores especiales.

---

## Lista de tipos primitivos

JavaScript tiene **7 tipos primitivos**:

| Tipo | Ejemplo | Descripción |
|---|---|---|
| `string` | `"Hola"` | Texto o cadenas de caracteres |
| `number` | `42`, `3.14` | Números enteros y decimales |
| `bigint` | `123n` | Números enteros muy grandes |
| `boolean` | `true`, `false` | Valores lógicos verdadero/falso |
| `undefined` | `undefined` | Variable declarada sin valor asignado |
| `null` | `null` | Ausencia intencional de valor |
| `symbol` | `Symbol("id")` | Identificador único |

---

## 1. `string`

Representa texto.

```js
const nombre = "David";
const ciudad = 'Bilbao';
const mensaje = `Hola, ${nombre}`;
```

Se puede escribir con comillas dobles, comillas simples o template literals.

```js
const lenguaje = "JavaScript";

console.log(typeof lenguaje); // "string"
```

---

## 2. `number`

Representa números enteros y decimales.

```js
const edad = 30;
const precio = 19.99;
const temperatura = -5;

console.log(typeof edad); // "number"
```

En JavaScript, tanto los enteros como los decimales son del tipo `number`.

```js
const entero = 10;
const decimal = 10.5;

console.log(typeof entero);  // "number"
console.log(typeof decimal); // "number"
```

También existen valores especiales de tipo `number`:

```js
Infinity
-Infinity
NaN
```

Ejemplo:

```js
const resultado = "hola" / 2;

console.log(resultado);        // NaN
console.log(typeof resultado); // "number"
```

---

## 3. `bigint`

Representa números enteros muy grandes.

Se crea añadiendo una `n` al final del número.

```js
const numeroGrande = 9007199254740993n;

console.log(typeof numeroGrande); // "bigint"
```

Se usa cuando un número entero supera el límite seguro de `number`.

```js
const grande = 123456789012345678901234567890n;
```

Importante: no se deben mezclar directamente `bigint` y `number`.

```js
const numero = 10;
const grande = 20n;

// console.log(numero + grande); // Error
```

Para operar juntos habría que convertir uno de los dos tipos.

---

## 4. `boolean`

Representa un valor lógico: verdadero o falso.

```js
const activo = true;
const terminado = false;

console.log(typeof activo); // "boolean"
```

Se usa mucho en condiciones.

```js
const usuarioLogueado = true;

if (usuarioLogueado) {
  console.log("Bienvenido");
}
```

---

## 5. `undefined`

Representa una variable declarada pero sin valor asignado.

```js
let nombre;

console.log(nombre);        // undefined
console.log(typeof nombre); // "undefined"
```

También puede aparecer cuando una función no devuelve nada explícitamente.

```js
function saludar() {
  console.log("Hola");
}

const resultado = saludar();

console.log(resultado); // undefined
```

---

## 6. `null`

Representa una ausencia intencional de valor.

```js
const usuario = null;

console.log(usuario); // null
```

Se suele usar cuando queremos indicar que una variable está vacía a propósito.

```js
let cocheSeleccionado = null;

cocheSeleccionado = "Alfa Romeo";
```

Importante: `typeof null` devuelve `"object"` por un comportamiento histórico de JavaScript.

```js
console.log(typeof null); // "object"
```

Aunque `typeof null` devuelva `"object"`, `null` es un tipo primitivo.

---

## 7. `symbol`

Representa un identificador único.

```js
const id = Symbol("id");

console.log(typeof id); // "symbol"
```

Cada `Symbol` es único, aunque tenga la misma descripción.

```js
const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(id1 === id2); // false
```

Se usa menos al principio, pero puede ser útil para crear claves únicas en objetos.

```js
const clave = Symbol("clave");

const usuario = {
  nombre: "David",
  [clave]: 123
};

console.log(usuario[clave]); // 123
```

---

## Primitivos frente a objetos

Los primitivos no son objetos.

Ejemplos de primitivos:

```js
const texto = "Hola";
const numero = 25;
const activo = true;
```

Ejemplos de no primitivos:

```js
const persona = { nombre: "David" };
const numeros = [1, 2, 3];
const saludar = function () {};
```

Estos son objetos o estructuras basadas en objetos.

---

## Inmutabilidad de los primitivos

Los valores primitivos son **inmutables**.

Eso significa que no se puede modificar el valor original directamente.

```js
let nombre = "David";

nombre.toUpperCase();

console.log(nombre); // "David"
```

El método `toUpperCase()` no modifica el string original. Devuelve uno nuevo.

```js
let nombre = "David";

const nombreMayusculas = nombre.toUpperCase();

console.log(nombre);           // "David"
console.log(nombreMayusculas); // "DAVID"
```

---

## Comparación de primitivos

Los primitivos se comparan por valor.

```js
const a = 10;
const b = 10;

console.log(a === b); // true
```

```js
const texto1 = "Hola";
const texto2 = "Hola";

console.log(texto1 === texto2); // true
```

En cambio, los objetos se comparan por referencia.

```js
const persona1 = { nombre: "David" };
const persona2 = { nombre: "David" };

console.log(persona1 === persona2); // false
```

Aunque tienen el mismo contenido, son objetos diferentes en memoria.

---

## Uso de `typeof`

`typeof` permite saber el tipo de un valor.

```js
console.log(typeof "Hola");       // "string"
console.log(typeof 42);           // "number"
console.log(typeof 123n);         // "bigint"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof Symbol("id")); // "symbol"
```

Caso especial:

```js
console.log(typeof null); // "object"
```

Este resultado es una peculiaridad histórica de JavaScript.

---

## Resumen rápido

```js
const texto = "Hola";             // string
const numero = 42;                // number
const grande = 9007199254740991n; // bigint
const activo = true;              // boolean
let sinValor;                     // undefined
const vacio = null;               // null
const id = Symbol("id");          // symbol
```

---

## Recomendación para estudiar

Primero conviene dominar bien estos tipos:

1. `string`
2. `number`
3. `boolean`
4. `undefined`
5. `null`

Después puedes profundizar en:

1. `bigint`
2. `symbol`

En proyectos reales de JavaScript y React usarás constantemente `string`, `number`, `boolean`, `undefined` y `null`.
