# JavaScript: clases vs funciones creadoras de objetos

En el archivo `01-fundamentos/js/classes/problema.js` aparecen dos formas de crear objetos parecidos:

```js
class Persona {
    constructor(nombre, apellido, edad, genero) {
        this._nombre = nombre;
        this._apellido = apellido;
        this.edad = edad;
        this.genero = genero;
    }
}
```

Y también:

```js
function crearPersona(nombre, apellido, edad, genero) {
    return {
        _nombre: nombre,
        _apellido: apellido,
        edad: edad,
        genero: genero
    }
}
```

A simple vista parecen hacer lo mismo porque ambas formas crean un objeto con estas propiedades:

```js
{
    _nombre: "Fernando",
    _apellido: "Herrera",
    edad: 40,
    genero: "Masculino"
}
```

Pero internamente no son exactamente iguales.

---

## 1. Similitud principal

Las dos formas sirven para construir objetos con la misma estructura.

Con la clase:

```js
const persona3 = new Persona("Fernando", "Herrera", 40, "Masculino");
```

Con la funcion:

```js
const persona4 = crearPersona("Fernando", "Herrera", 40, "Masculino");
```

En ambos casos se obtiene un objeto que guarda informacion de una persona.

La similitud importante es esta:

> Ambas formas ayudan a evitar repetir manualmente el mismo objeto muchas veces.

Sin ellas, habria que escribir algo asi cada vez:

```js
const persona = {
    _nombre: "Fernando",
    _apellido: "Herrera",
    edad: 40,
    genero: "Masculino"
};
```

---

## 2. Diferencia principal

La clase `Persona` crea instancias de un tipo llamado `Persona`.

```js
const persona3 = new Persona("Fernando", "Herrera", 40, "Masculino");

console.log(persona3 instanceof Persona); // true
```

Eso significa que JavaScript sabe que `persona3` fue creada a partir de la clase `Persona`.

En cambio, la funcion `crearPersona` devuelve un objeto normal:

```js
const persona4 = crearPersona("Fernando", "Herrera", 40, "Masculino");

console.log(persona4 instanceof Persona); // false
```

Aunque tenga las mismas propiedades, `persona4` no es una instancia de la clase `Persona`.

---

## 3. La clase necesita `new`

Para usar una clase normalmente se necesita la palabra `new`:

```js
const persona = new Persona("Luis", "Garcia", 30, "Masculino");
```

Cuando escribes `new Persona(...)`, JavaScript hace varias cosas:

1. Crea un objeto nuevo.
2. Ejecuta el `constructor`.
3. Asigna las propiedades usando `this`.
4. Devuelve el objeto creado.

Por eso dentro de la clase se usa `this`:

```js
this._nombre = nombre;
```

`this` representa el objeto nuevo que se esta creando.

La funcion `crearPersona` no necesita `new`:

```js
const persona = crearPersona("Luis", "Garcia", 30, "Masculino");
```

Simplemente crea y devuelve un objeto literal con `return`.

---

## 4. La clase puede compartir metodos

Una ventaja importante de las clases aparece cuando agregamos metodos.

Ejemplo:

```js
class Persona {
    constructor(nombre, apellido, edad, genero) {
        this._nombre = nombre;
        this._apellido = apellido;
        this.edad = edad;
        this.genero = genero;
    }

    nombreCompleto() {
        return `${this._nombre} ${this._apellido}`;
    }
}
```

Ahora cada persona puede usar el metodo:

```js
const persona = new Persona("Luis", "Garcia", 30, "Masculino");

console.log(persona.nombreCompleto()); // "Luis Garcia"
```

Ese metodo vive en el prototipo de la clase. Dicho de forma simple: JavaScript no necesita copiar una nueva funcion dentro de cada objeto.

Con una funcion creadora tambien se podria hacer esto:

```js
function crearPersona(nombre, apellido, edad, genero) {
    return {
        _nombre: nombre,
        _apellido: apellido,
        edad: edad,
        genero: genero,
        nombreCompleto() {
            return `${this._nombre} ${this._apellido}`;
        }
    };
}
```

Pero en este caso cada objeto creado tendria su propia copia del metodo `nombreCompleto`.

Para pocos objetos no importa demasiado. Para muchos objetos, una clase suele ser mas adecuada.

---

## 5. Funcion creadora: mas simple y directa

La funcion `crearPersona` es una funcion fabrica o factory function.

Se llama asi porque fabrica objetos y los devuelve.

```js
function crearPersona(nombre, apellido, edad, genero) {
    return {
        _nombre: nombre,
        _apellido: apellido,
        edad: edad,
        genero: genero
    };
}
```

Ventajas:

- Es facil de entender.
- No necesita `new`.
- Devuelve directamente el objeto.
- Es util para objetos simples.
- Es flexible si solo necesitas agrupar datos.

Ejemplo de uso adecuado:

```js
const usuario = crearPersona("Ana", "Lopez", 25, "Femenino");
```

Si solo quieres crear objetos de datos, esta forma esta bien.

---

## 6. Clase: mas estructurada

La clase `Persona` es mas adecuada cuando quieres representar un concepto del programa.

Por ejemplo, una persona puede tener datos y comportamientos:

```js
class Persona {
    constructor(nombre, apellido, edad, genero) {
        this._nombre = nombre;
        this._apellido = apellido;
        this.edad = edad;
        this.genero = genero;
    }

    saludar() {
        return `Hola, soy ${this._nombre}`;
    }
}
```

Aqui `Persona` no solo guarda datos. Tambien puede tener acciones relacionadas con esos datos.

Ventajas:

- Permite crear instancias con `new`.
- Permite comprobar si un objeto viene de esa clase con `instanceof`.
- Organiza datos y metodos juntos.
- Los metodos se comparten mediante el prototipo.
- Es mas clara cuando el objeto tiene comportamiento propio.
- Puede usar herencia con `extends`.

Ejemplo:

```js
const persona = new Persona("Luis", "Garcia", 30, "Masculino");

console.log(persona instanceof Persona); // true
```

---

## 7. Tabla resumen

| Caracteristica | Clase `Persona` | Funcion `crearPersona` |
|---|---|---|
| Crea objetos | Si | Si |
| Necesita `new` | Si | No |
| Usa `constructor` | Si | No |
| Usa `this` para asignar propiedades | Si | No necesariamente |
| Devuelve objeto con `return` | No de forma manual | Si |
| Permite `instanceof Persona` | Si | No |
| Buena para objetos con metodos | Si | Puede, pero no siempre conviene |
| Buena para objetos simples de datos | Si, aunque puede ser excesiva | Si |
| Permite herencia con `extends` | Si | No de forma directa |

---

## 8. Entonces, ¿cual conviene usar?

Usa una funcion creadora cuando:

- El objeto es simple.
- Solo quieres agrupar datos.
- No necesitas metodos compartidos.
- No necesitas comprobar de que clase viene el objeto.
- Quieres una solucion rapida y directa.

Ejemplo:

```js
const persona = crearPersona("Luis", "Garcia", 30, "Masculino");
```

Usa una clase cuando:

- Quieres representar una entidad importante del programa.
- El objeto tendra metodos.
- Vas a crear muchas instancias parecidas.
- Quieres usar `instanceof`.
- Quieres organizar mejor datos y comportamiento.
- Mas adelante podrias necesitar herencia.

Ejemplo:

```js
const persona = new Persona("Luis", "Garcia", 30, "Masculino");
```

---

## 9. diferencias



> Las clases sirven para crear objetos con una estructura y comportamiento definidos. Las funciones creadoras tambien pueden crear objetos, pero devuelven objetos normales y no crean instancias de una clase concreta.

Por tanto, no es correcto decir que las funciones solo se usan para crear funciones. En JavaScript, una funcion puede servir para muchas cosas:

- Ejecutar una accion.
- Calcular y devolver un valor.
- Crear objetos.
- Recibir datos y transformarlos.
- Ser pasada como argumento a otra funcion.

---

## 10. Idea clave

En este ejemplo, ambas formas crean objetos parecidos.

La diferencia es que:

- `new Persona(...)` crea una instancia de la clase `Persona`.
- `crearPersona(...)` crea y devuelve un objeto normal.

Si el objeto solo contiene datos simples, la funcion creadora puede ser suficiente.

Si el objeto representa algo importante del programa y puede tener metodos o comportamiento, una clase suele ser mejor opcion.
