# JavaScript: patron Singleton

El patron Singleton sirve para asegurar que una clase tenga una sola instancia.

Dicho de forma simple:

> Aunque llames varias veces a `new`, siempre recibes el mismo objeto.

---

## 1. Ejemplo base

```js
class Singleton {
    static #instancia;

    nombre = "";

    constructor(nombre = "") {
        if (!!Singleton.#instancia) {
            return Singleton.#instancia;
        }

        Singleton.#instancia = this;
        this.nombre = nombre;
    }
}
```

Uso:

```js
const instancia1 = new Singleton("Fernando");
const instancia2 = new Singleton("Pepe");
const instancia3 = new Singleton("Juan");
```

Aunque parece que estamos creando tres objetos, en realidad solo se crea el primero.

---

## 2. Que pasa paso a paso

Primera llamada:

```js
const instancia1 = new Singleton("Fernando");
```

Como `Singleton.#instancia` todavia no existe, se guarda el objeto actual:

```js
Singleton.#instancia = this;
this.nombre = "Fernando";
```

Segunda llamada:

```js
const instancia2 = new Singleton("Pepe");
```

Ahora `Singleton.#instancia` ya existe.

Entonces el constructor devuelve la instancia anterior:

```js
return Singleton.#instancia;
```

Por eso `"Pepe"` no reemplaza el nombre inicial.

Tercera llamada:

```js
const instancia3 = new Singleton("Juan");
```

Vuelve a pasar lo mismo: se devuelve la primera instancia.

---

## 3. Comprobacion con `===`

Podemos comprobar que las variables apuntan al mismo objeto:

```js
console.log(instancia1 === instancia2); // true
console.log(instancia2 === instancia3); // true
```

`true` significa que no solo tienen los mismos datos.

Significa que son exactamente el mismo objeto en memoria.

---

## 4. Por que el nombre queda como Fernando

```js
const instancia1 = new Singleton("Fernando");
const instancia2 = new Singleton("Pepe");
const instancia3 = new Singleton("Juan");
```

El nombre queda como `"Fernando"` porque la primera instancia fue creada con ese valor.

Las siguientes llamadas no crean objetos nuevos.

Por eso:

```js
console.log(instancia1.nombre); // Fernando
console.log(instancia2.nombre); // Fernando
console.log(instancia3.nombre); // Fernando
```

Las tres variables apuntan al mismo objeto.

---

## 5. Que significa `static #instancia`

```js
static #instancia;
```

Aqui se combinan dos ideas:

- `static`: la propiedad pertenece a la clase, no a cada objeto.
- `#`: la propiedad es privada y solo se puede usar dentro de la clase.

Esto es importante porque la instancia unica debe estar guardada en la clase.

No tendria sentido guardarla dentro de cada objeto, porque precisamente queremos controlar cuantos objetos se crean.

---

## 6. Que significa `!!Singleton.#instancia`

En el codigo aparece:

```js
if (!!Singleton.#instancia) {
    return Singleton.#instancia;
}
```

El operador `!!` convierte un valor a booleano.

Ejemplos:

```js
!!undefined // false
!!null      // false
!!{}        // true
```

Al principio, `Singleton.#instancia` vale `undefined`, asi que:

```js
!!Singleton.#instancia // false
```

Despues de crear el primer objeto, `Singleton.#instancia` contiene un objeto, asi que:

```js
!!Singleton.#instancia // true
```

Tambien podria escribirse asi:

```js
if (Singleton.#instancia) {
    return Singleton.#instancia;
}
```

En este caso funcionaria igual.

---

## 7. Modificar una instancia modifica todas

Como todas las variables apuntan al mismo objeto, modificar una afecta a las demas.

```js
instancia2.nombre = "Carlos";

console.log(instancia1.nombre); // Carlos
console.log(instancia3.nombre); // Carlos
```

No hay tres objetos.

Hay un solo objeto con tres variables apuntando hacia el.

---

## 8. Metodo estatico para consultar la instancia

Podemos crear un metodo estatico publico:

```js
class Singleton {
    static #instancia;

    constructor(nombre = "") {
        if (Singleton.#instancia) {
            return Singleton.#instancia;
        }

        Singleton.#instancia = this;
        this.nombre = nombre;
    }

    static getInstancia() {
        return Singleton.#instancia;
    }
}
```

Uso:

```js
const instancia1 = new Singleton("Fernando");

console.log(Singleton.getInstancia() === instancia1); // true
```

El metodo `getInstancia()` permite consultar la instancia sin acceder directamente a `#instancia`, porque `#instancia` es privada.

---

## 9. Cuando usar Singleton

Puede ser util cuando necesitas una unica version compartida de algo:

- Configuracion global de una aplicacion.
- Servicio de logs.
- Estado compartido muy controlado.
- Conexion unica a un recurso.
- Cache centralizada.

Ejemplo conceptual:

```js
class ConfiguracionApp {
    static #instancia;

    constructor() {
        if (ConfiguracionApp.#instancia) {
            return ConfiguracionApp.#instancia;
        }

        this.modo = "desarrollo";
        this.idioma = "es";

        ConfiguracionApp.#instancia = this;
    }
}
```

---

## 10. Riesgos del Singleton

Singleton no siempre es la mejor solucion.

Puede traer problemas si se usa demasiado:

- Crea estado global compartido.
- Puede hacer mas dificil probar el codigo.
- Puede ocultar dependencias entre partes del programa.
- Si se modifica desde muchos sitios, puede ser dificil saber quien cambio el valor.

Por eso conviene usarlo solo cuando realmente necesitas una instancia unica.

---

## 11. Tabla resumen

| Concepto | Explicacion |
|---|---|
| Singleton | Patron que permite una unica instancia de una clase |
| `static #instancia` | Guarda la instancia unica dentro de la clase |
| `return Singleton.#instancia` | Devuelve el objeto ya creado |
| `instancia1 === instancia2` | Comprueba que ambas variables apuntan al mismo objeto |
| Riesgo principal | Estado global compartido |

---

## 12. Idea clave

En este ejemplo:

```js
const instancia1 = new Singleton("Fernando");
const instancia2 = new Singleton("Pepe");
const instancia3 = new Singleton("Juan");
```

solo se crea un objeto real.

Ese objeto se crea en la primera llamada.

Las siguientes llamadas devuelven el mismo objeto.

Por eso el Singleton debe usarse cuando tiene sentido que exista una unica instancia compartida.
