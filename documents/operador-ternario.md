# JavaScript: operador ternario

El **operador ternario** es una forma corta de escribir una condición `if...else`.

Se llama ternario porque tiene **3 partes**:

```js
condicion ? valorSiEsTrue : valorSiEsFalse;
```

---

## 1. Sintaxis básica

```js
const resultado = condicion ? "sí" : "no";
```

Equivale a:

```js
let resultado;

if (condicion) {
  resultado = "sí";
} else {
  resultado = "no";
}
```

---

## 2. Ejemplo sencillo

```js
const edad = 18;

const mensaje = edad >= 18 ? "Eres mayor de edad" : "Eres menor de edad";

console.log(mensaje); // "Eres mayor de edad"
```

La condición es:

```js
edad >= 18
```

Si esa condición es `true`, se devuelve:

```js
"Eres mayor de edad"
```

Si es `false`, se devuelve:

```js
"Eres menor de edad"
```

---

## 3. Estructura del operador ternario

```js
condicion ? valorSiVerdadero : valorSiFalso;
```

| Parte | Significado |
|---|---|
| `condicion` | Expresión que se evalúa como `true` o `false` |
| `?` | Separa la condición del valor verdadero |
| `valorSiVerdadero` | Resultado si la condición se cumple |
| `:` | Separa el caso verdadero del caso falso |
| `valorSiFalso` | Resultado si la condición no se cumple |

---

## 4. Comparación con `if...else`

### Con `if...else`

```js
const edad = 20;
let acceso;

if (edad >= 18) {
  acceso = "Permitido";
} else {
  acceso = "Denegado";
}

console.log(acceso); // "Permitido"
```

### Con operador ternario

```js
const edad = 20;

const acceso = edad >= 18 ? "Permitido" : "Denegado";

console.log(acceso); // "Permitido"
```

El resultado es el mismo, pero el ternario es más corto.

---

## 5. Cuándo usar el operador ternario

Es recomendable usarlo cuando la condición es **simple** y devuelve un valor.

```js
const estaLogueado = true;

const textoBoton = estaLogueado ? "Cerrar sesión" : "Iniciar sesión";
```

Otro ejemplo:

```js
const stock = 0;

const mensaje = stock > 0 ? "Producto disponible" : "Producto agotado";
```

---

## 6. Cuándo evitarlo

Conviene evitar el operador ternario cuando la lógica es larga o difícil de leer.

Ejemplo poco recomendable:

```js
const mensaje = edad >= 18
  ? usuarioActivo
    ? "Acceso permitido"
    : "Usuario inactivo"
  : "Menor de edad";
```

Aunque funciona, puede ser difícil de entender.

En estos casos, suele ser mejor usar `if...else`.

```js
let mensaje;

if (edad < 18) {
  mensaje = "Menor de edad";
} else if (!usuarioActivo) {
  mensaje = "Usuario inactivo";
} else {
  mensaje = "Acceso permitido";
}
```

---

## 7. Operador ternario con booleanos

```js
const esAdmin = true;

const permiso = esAdmin ? "Tiene permisos" : "No tiene permisos";

console.log(permiso); // "Tiene permisos"
```

---

## 8. Operador ternario con números

```js
const nota = 7;

const resultado = nota >= 5 ? "Aprobado" : "Suspendido";

console.log(resultado); // "Aprobado"
```

---

## 9. Operador ternario con strings

```js
const nombre = "";

const saludo = nombre ? `Hola, ${nombre}` : "Hola, invitado";

console.log(saludo); // "Hola, invitado"
```

En este caso, un string vacío `""` se considera un valor `falsy`.

---

## 10. Valores truthy y falsy

El operador ternario no solo trabaja con `true` o `false`. También evalúa si un valor es **truthy** o **falsy**.

### Valores falsy habituales

```js
false
0
""
null
undefined
NaN
```

Ejemplo:

```js
const usuario = null;

const mensaje = usuario ? "Usuario encontrado" : "Usuario no encontrado";

console.log(mensaje); // "Usuario no encontrado"
```

### Valores truthy habituales

Casi todos los demás valores son `truthy`.

```js
"Hola"
1
[]
{}
```

Ejemplo:

```js
const lista = [];

const mensaje = lista ? "Hay una lista" : "No hay lista";

console.log(mensaje); // "Hay una lista"
```

Importante: un array vacío `[]` es `truthy`.

---

## 11. Ternario dentro de una función

```js
function comprobarEdad(edad) {
  return edad >= 18 ? "Mayor de edad" : "Menor de edad";
}

console.log(comprobarEdad(21)); // "Mayor de edad"
console.log(comprobarEdad(15)); // "Menor de edad"
```

---

## 12. Ternario en React

En React se usa mucho para mostrar contenido condicional.

```jsx
function Saludo({ estaLogueado }) {
  return (
    <div>
      {estaLogueado ? <p>Bienvenido</p> : <p>Inicia sesión</p>}
    </div>
  );
}
```

También se usa para cambiar textos, clases o botones.

```jsx
<button>
  {estaLogueado ? "Cerrar sesión" : "Iniciar sesión"}
</button>
```

---

## 13. Ternario para asignar clases CSS

```js
const activo = true;

const clase = activo ? "boton activo" : "boton";

console.log(clase); // "boton activo"
```

Ejemplo en React:

```jsx
<button className={activo ? "btn btn-activo" : "btn"}>
  Guardar
</button>
```

---

## 14. Ternarios encadenados

Se pueden encadenar, pero hay que usarlos con cuidado.

```js
const nota = 8;

const resultado = nota >= 9
  ? "Sobresaliente"
  : nota >= 7
    ? "Notable"
    : nota >= 5
      ? "Aprobado"
      : "Suspendido";

console.log(resultado); // "Notable"
```

Aunque es válido, si hay muchas condiciones suele ser más claro usar `if...else` o `switch`.

---

## 15. Error común: usarlo para demasiadas cosas

El operador ternario está pensado principalmente para **devolver valores**, no para ejecutar muchas instrucciones.

Poco recomendable:

```js
edad >= 18
  ? console.log("Mayor")
  : console.log("Menor");
```

Mejor:

```js
const mensaje = edad >= 18 ? "Mayor" : "Menor";

console.log(mensaje);
```

---

## 16. Regla práctica

Usa operador ternario cuando:

- La condición sea sencilla.
- Quieras asignar un valor.
- Mejore la legibilidad.
- Estés trabajando con renderizado condicional en React.

Evítalo cuando:

- La condición sea muy larga.
- Haya muchas condiciones encadenadas.
- El código sea menos claro que con `if...else`.

---

## 17. Ejemplos prácticos

### Comprobar si un usuario está activo

```js
const activo = true;

const estado = activo ? "Activo" : "Inactivo";

console.log(estado);
```

### Comprobar descuento

```js
const precio = 100;
const tieneDescuento = true;

const precioFinal = tieneDescuento ? precio * 0.8 : precio;

console.log(precioFinal); // 80
```

### Mensaje según cantidad

```js
const productos = 3;

const mensaje = productos > 0 ? "Hay productos" : "No hay productos";

console.log(mensaje);
```

### Texto de botón

```js
const cargando = false;

const textoBoton = cargando ? "Cargando..." : "Enviar";

console.log(textoBoton);
```

---

## Resumen rápido

```js
const edad = 18;

const mensaje = edad >= 18 ? "Mayor de edad" : "Menor de edad";

console.log(mensaje);
```

La estructura siempre es:

```js
condicion ? valorSiTrue : valorSiFalse;
```

El operador ternario es una alternativa corta a `if...else`, pero debe usarse solo cuando hace el código más claro.
