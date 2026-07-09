# JavaScript: constructores multiples

En JavaScript una clase solo puede tener un constructor real.

Esto es valido:

```js
class Persona {
    constructor(nombre, apellido, pais) {
        this._nombre = nombre;
        this._apellido = apellido;
        this.pais = pais;
    }
}
```

Pero esto no es valido:

```js
class Persona {
    constructor(nombre, apellido, pais) {
        this._nombre = nombre;
        this._apellido = apellido;
        this.pais = pais;
    }

    constructor(objeto) {
        this._nombre = objeto.nombre;
        this._apellido = objeto.apellido;
        this.pais = objeto.pais;
    }
}
```

JavaScript daria error porque una clase no puede declarar dos metodos `constructor`.

---

## 1. Que es la sobrecarga de constructores

En otros lenguajes existe algo llamado sobrecarga de constructores.

Significa que una clase puede tener varios constructores con diferentes parametros.

Ejemplo conceptual:

```js
// Esto NO funciona en JavaScript.
constructor(nombre, apellido, pais)
constructor(objeto)
constructor(array)
```

La idea seria poder crear una persona de varias formas:

```js
new Persona("Fernando", "Herrera", "Colombia");
new Persona({ nombre: "Pepe", apellido: "Argento", pais: "Argentina" });
new Persona(["Maria", "Lopez", "Espana"]);
```

Pero JavaScript no permite varios constructores dentro de la misma clase.

---

## 2. Solucion en JavaScript

La forma habitual de simular constructores multiples es usar metodos estaticos.

```js
class Persona {
    constructor(nombre, apellido, pais) {
        this._nombre = nombre;
        this._apellido = apellido;
        this.pais = pais;
    }

    static fromObject({ nombre, apellido, pais }) {
        return new Persona(nombre, apellido, pais);
    }
}
```

Uso:

```js
const pepe = {
    nombre: "Pepe",
    apellido: "Argento",
    pais: "Argentina"
};

const persona = Persona.fromObject(pepe);
```

`fromObject` no es un constructor real.

Es un metodo estatico que crea una instancia llamando internamente a:

```js
new Persona(nombre, apellido, pais);
```

---

## 3. Constructor real vs constructor alternativo

El constructor real es este:

```js
constructor(nombre, apellido, pais) {
    this._nombre = nombre;
    this._apellido = apellido;
    this.pais = pais;
}
```

Se usa asi:

```js
const persona = new Persona("Fernando", "Herrera", "Colombia");
```

Un constructor alternativo puede ser este:

```js
static fromObject({ nombre, apellido, pais }) {
    return new Persona(nombre, apellido, pais);
}
```

Se usa asi:

```js
const persona = Persona.fromObject({
    nombre: "Pepe",
    apellido: "Argento",
    pais: "Argentina"
});
```

La diferencia es importante:

- `constructor(...)` pertenece al mecanismo interno de `new`.
- `fromObject(...)` es un metodo estatico normal.
- `fromObject(...)` devuelve una instancia creada con `new Persona(...)`.

---

## 4. Ejemplo con objeto

```js
class Persona {
    constructor(nombre, apellido, pais) {
        this._nombre = nombre;
        this._apellido = apellido;
        this.pais = pais;
    }

    static fromObject({ nombre, apellido, pais }) {
        return new Persona(nombre, apellido, pais);
    }
}
```

Uso:

```js
const pepe = {
    nombre: "Pepe",
    apellido: "Argento",
    pais: "Argentina"
};

const persona = Persona.fromObject(pepe);
```

Esta forma es util cuando los datos vienen en forma de objeto, por ejemplo desde una API.

---

## 5. Ejemplo con array

```js
class Persona {
    constructor(nombre, apellido, pais) {
        this._nombre = nombre;
        this._apellido = apellido;
        this.pais = pais;
    }

    static fromArray([nombre, apellido, pais]) {
        return new Persona(nombre, apellido, pais);
    }
}
```

Uso:

```js
const datos = ["Maria", "Lopez", "Espana"];

const persona = Persona.fromArray(datos);
```

Esta forma puede ser util si los datos vienen en una lista ordenada.

La desventaja es que el orden importa mucho:

```js
["Maria", "Lopez", "Espana"]
```

no significa lo mismo que:

```js
["Espana", "Maria", "Lopez"]
```

---

## 6. Ejemplo con string

```js
class Persona {
    constructor(nombre, apellido, pais) {
        this._nombre = nombre;
        this._apellido = apellido;
        this.pais = pais;
    }

    static fromString(texto) {
        const [nombre, apellido, pais] = texto.split(",");

        return new Persona(
            nombre.trim(),
            apellido.trim(),
            pais.trim()
        );
    }
}
```

Uso:

```js
const persona = Persona.fromString("Ana, Garcia, Mexico");
```

Aqui el metodo `fromString` convierte el texto en partes y luego crea una `Persona`.

---

## 7. Por que se usan metodos estaticos

Los metodos alternativos se declaran como `static` porque se llaman desde la clase.

```js
Persona.fromObject(pepe);
Persona.fromArray(datos);
Persona.fromString(texto);
```

No se llaman desde una instancia:

```js
const persona = new Persona("Luis", "Garcia", "Espana");

persona.fromObject(pepe); // Error
```

Esto tiene sentido porque esos metodos existen para crear objetos.

Antes de tener una instancia, necesitas llamar a la clase.

---

## 8. Nombres habituales

Para constructores alternativos se suelen usar nombres como:

- `fromObject`
- `fromArray`
- `fromString`
- `fromJSON`
- `create`
- `of`

Ejemplo:

```js
const persona = Persona.fromObject(datos);
```

El nombre `fromObject` deja claro que la instancia se crea desde un objeto.

---

## 9. Tabla resumen

| Forma | Ejemplo | Que hace |
|---|---|---|
| Constructor real | `new Persona("Ana", "Garcia", "Mexico")` | Crea la instancia directamente |
| Desde objeto | `Persona.fromObject(objeto)` | Lee propiedades de un objeto |
| Desde array | `Persona.fromArray(array)` | Lee valores por posicion |
| Desde string | `Persona.fromString(texto)` | Divide un texto y crea la instancia |

---

## 10. Idea clave

JavaScript no permite varios constructores reales en una clase.

Solo puede existir uno:

```js
constructor(...) {}
```

Si necesitas crear objetos de varias formas, usa metodos estaticos:

```js
static fromObject(...) {}
static fromArray(...) {}
static fromString(...) {}
```

Estos metodos no reemplazan al constructor.

Preparan los datos y llaman internamente a:

```js
new Persona(...);
```
