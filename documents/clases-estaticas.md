# JavaScript: propiedades y metodos estaticos

En JavaScript no se suele decir que una clase entera sea estatica.

Lo correcto es decir que una clase puede tener:

- Propiedades estaticas.
- Metodos estaticos.
- Propiedades de instancia.
- Metodos de instancia.

La diferencia principal es donde se usan:

- Lo estatico se usa desde la clase.
- Lo de instancia se usa desde un objeto creado con `new`.

---

## 1. Metodo de instancia

Un metodo normal dentro de una clase pertenece a los objetos creados con `new`.

Ejemplo:

```js
class Persona {
    constructor(nombre) {
        this.nombre = nombre;
    }

    saludar() {
        console.log(`Hola, soy ${this.nombre}`);
    }
}
```

Uso:

```js
const luis = new Persona("Luis");

luis.saludar(); // "Hola, soy Luis"
```

Aqui `saludar()` necesita una persona concreta, porque usa `this.nombre`.

Por eso tiene sentido que sea un metodo de instancia.

---

## 2. Metodo estatico

Un metodo estatico pertenece directamente a la clase.

Se define con la palabra `static`.

```js
class Persona {
    static descripcion() {
        console.log("La clase Persona sirve para crear personas");
    }
}
```

Uso:

```js
Persona.descripcion();
```

No hace falta crear un objeto con `new`.

Este metodo no depende de una persona concreta. Habla de la clase en general.

---

## 3. Propiedad estatica

Una propiedad estatica tambien pertenece directamente a la clase.

```js
class Persona {
    static especie = "Humano";
}
```

Uso:

```js
console.log(Persona.especie); // "Humano"
```

La propiedad `especie` pertenece a `Persona`, no a una instancia concreta.

---

## 4. Diferencia con una propiedad de instancia

Una propiedad de instancia pertenece a cada objeto creado con `new`.

```js
class Persona {
    static especie = "Humano";

    constructor(nombre) {
        this.nombre = nombre;
    }
}
```

Uso:

```js
const luis = new Persona("Luis");
const ana = new Persona("Ana");

console.log(Persona.especie); // "Humano"
console.log(luis.nombre);     // "Luis"
console.log(ana.nombre);      // "Ana"
```

`especie` es comun a la clase.

`nombre` cambia en cada instancia.

---

## 5. Error comun

Este es un error muy comun:

```js
class Ejemplo {
    saludar() {
        console.log("Hola");
    }
}

Ejemplo.saludar(); // Error
```

Falla porque `saludar()` no es estatico.

Como es un metodo normal, hay que crear una instancia:

```js
const ejemplo = new Ejemplo();

ejemplo.saludar(); // "Hola"
```

Si quieres llamarlo desde la clase, debes declararlo con `static`:

```js
class Ejemplo {
    static saludar() {
        console.log("Hola");
    }
}

Ejemplo.saludar(); // "Hola"
```

---

## 6. Otro error comun

Tambien puede pasar al reves:

```js
class Ejemplo {
    static saludar() {
        console.log("Hola");
    }
}

const ejemplo = new Ejemplo();

ejemplo.saludar(); // Error
```

Falla porque `saludar()` es estatico y pertenece a la clase, no a la instancia.

La forma correcta es:

```js
Ejemplo.saludar();
```

---

## 7. Cuando usar `static`

Usa `static` cuando el metodo o propiedad no necesita datos de un objeto concreto.

Buenos casos de uso:

- Valores generales de la clase.
- Funciones de ayuda.
- Validaciones.
- Crear objetos de una forma controlada.
- Contadores o configuraciones compartidas.

Ejemplo con validacion:

```js
class Usuario {
    static emailValido(email) {
        return email.includes("@");
    }
}

console.log(Usuario.emailValido("test@email.com")); // true
console.log(Usuario.emailValido("test"));           // false
```

No hace falta crear un usuario para comprobar si un email parece valido.

---

## 8. Ejemplo practico con clase `Persona`

```js
class Persona {
    static especie = "Humano";

    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar() {
        console.log(`Hola, soy ${this.nombre}`);
    }

    static crearAnonimo() {
        return new Persona("Anonimo", 0);
    }
}
```

Uso:

```js
console.log(Persona.especie); // "Humano"

const luis = new Persona("Luis", 30);
luis.saludar(); // "Hola, soy Luis"

const anonimo = Persona.crearAnonimo();
console.log(anonimo); // Persona { nombre: "Anonimo", edad: 0 }
```

Aqui hay tres ideas:

- `Persona.especie` es una propiedad estatica.
- `luis.saludar()` es un metodo de instancia.
- `Persona.crearAnonimo()` es un metodo estatico que crea una instancia.

---

## 9. Tabla resumen

| Tipo | Pertenece a | Se llama asi | Necesita `new` |
|---|---|---|---|
| Propiedad estatica | Clase | `Persona.especie` | No |
| Metodo estatico | Clase | `Persona.crearAnonimo()` | No |
| Propiedad de instancia | Objeto | `luis.nombre` | Si |
| Metodo de instancia | Objeto | `luis.saludar()` | Si |

---

## 10. Idea clave

No es lo mismo esto:

```js
ClaseEstatica.saludar();
```

que esto:

```js
const objeto = new ClaseEstatica();
objeto.saludarInstancia();
```

La primera llamada usa un metodo estatico.

La segunda llamada usa un metodo de instancia.

Usa `static` cuando algo pertenece a la clase en general.

Usa metodos normales cuando algo depende de los datos de un objeto concreto.
