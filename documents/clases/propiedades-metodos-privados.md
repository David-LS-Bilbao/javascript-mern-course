# JavaScript: propiedades y metodos privados

En JavaScript moderno se pueden crear propiedades y metodos privados dentro de una clase usando `#`.

Ejemplo:

```js
class Rectangulo {
    #area = 0;
    #perimetro = 0;
}
```

`#area` y `#perimetro` son privados.

Eso significa que solo se pueden usar dentro de la clase `Rectangulo`.

---

## 1. Propiedades publicas

Una propiedad publica se puede leer y modificar desde fuera del objeto.

```js
class Rectangulo {
    constructor(base, altura) {
        this.base = base;
        this.altura = altura;
    }
}
```

Uso:

```js
const rectangulo = new Rectangulo(10, 20);

console.log(rectangulo.base);   // 10
console.log(rectangulo.altura); // 20

rectangulo.base = 50;
```

`base` y `altura` son publicas porque no tienen `#`.

---

## 2. Propiedades privadas

Una propiedad privada lleva `#` delante del nombre.

```js
class Rectangulo {
    #area = 0;

    constructor(base, altura) {
        this.base = base;
        this.altura = altura;
        this.#area = base * altura;
    }
}
```

Dentro de la clase si se puede usar:

```js
this.#area = base * altura;
```

Pero fuera de la clase no:

```js
const rectangulo = new Rectangulo(10, 20);

console.log(rectangulo.#area); // Error
```

Ese error ocurre porque `#area` es parte interna de la clase.

---

## 3. Metodos privados

Un metodo privado tambien lleva `#`.

```js
class Rectangulo {
    #area = 0;

    constructor(base, altura) {
        this.base = base;
        this.altura = altura;
        this.#area = this.#calcularArea();
    }

    #calcularArea() {
        return this.base * this.altura;
    }
}
```

El metodo `#calcularArea()` solo puede llamarse dentro de la clase.

```js
this.#calcularArea(); // Correcto dentro de la clase
```

Pero no desde fuera:

```js
rectangulo.#calcularArea(); // Error
```

---

## 4. Por que usar propiedades privadas

Las propiedades privadas sirven para proteger datos internos del objeto.

Por ejemplo, en un rectangulo el area se calcula a partir de la base y la altura.

No interesa que alguien haga esto desde fuera:

```js
rectangulo.area = 999999;
```

Porque ese valor podria no coincidir con la base y la altura reales.

Con una propiedad privada, la clase controla el calculo:

```js
class Rectangulo {
    #area = 0;

    constructor(base, altura) {
        this.base = base;
        this.altura = altura;
        this.#area = this.#calcularArea();
    }

    #calcularArea() {
        return this.base * this.altura;
    }
}
```

Asi el area queda protegida dentro de la clase.

---

## 5. Como leer un valor privado desde fuera

Si quieres permitir que el valor se pueda consultar, puedes usar un getter.

```js
class Rectangulo {
    #area = 0;

    constructor(base, altura) {
        this.base = base;
        this.altura = altura;
        this.#area = this.#calcularArea();
    }

    #calcularArea() {
        return this.base * this.altura;
    }

    get area() {
        return this.#area;
    }
}
```

Uso:

```js
const rectangulo = new Rectangulo(10, 20);

console.log(rectangulo.area); // 200
```

Importante:

```js
rectangulo.area
```

usa el getter publico.

```js
rectangulo.#area
```

intenta acceder directamente a la propiedad privada y no esta permitido.

---

## 6. Ejemplo completo

```js
class Rectangulo {
    #area = 0;
    #perimetro = 0;

    constructor(base = 0, altura = 0) {
        this.base = base;
        this.altura = altura;
        this.#area = this.#calcularArea();
        this.#perimetro = this.#calcularPerimetro();
    }

    #calcularArea() {
        return this.base * this.altura;
    }

    #calcularPerimetro() {
        return this.base * 2 + this.altura * 2;
    }

    get area() {
        return this.#area;
    }

    get perimetro() {
        return this.#perimetro;
    }
}
```

Uso:

```js
const rectangulo = new Rectangulo(10, 20);

console.log(rectangulo.base);      // 10
console.log(rectangulo.altura);    // 20
console.log(rectangulo.area);      // 200
console.log(rectangulo.perimetro); // 60
```

---

## 7. Diferencia entre `_area` y `#area`

A veces se ve codigo asi:

```js
class Rectangulo {
    _area = 0;
}
```

El guion bajo `_area` no hace que la propiedad sea privada.

Es solo una convencion entre programadores para decir:

> Esta propiedad deberia tratarse como interna.

Pero JavaScript permite acceder a ella:

```js
rectangulo._area = 999;
```

En cambio, con `#area` JavaScript si bloquea el acceso externo:

```js
rectangulo.#area; // Error
```

---

## 8. Tabla resumen

| Tipo | Ejemplo | Se puede usar fuera de la clase |
|---|---|---|
| Propiedad publica | `this.base` | Si |
| Metodo publico | `mostrarInfo()` | Si |
| Propiedad privada | `#area` | No |
| Metodo privado | `#calcularArea()` | No |
| Getter publico | `get area()` | Si |

---

## 9. Idea clave

Usa propiedades y metodos privados cuando quieras ocultar detalles internos de una clase.

En el ejemplo de `Rectangulo`:

- `base` y `altura` son publicas porque representan datos visibles del rectangulo.
- `#area` y `#perimetro` son privadas porque se calculan internamente.
- `#calcularArea()` y `#calcularPerimetro()` son privados porque son detalles internos del calculo.
- `get area()` y `get perimetro()` permiten consultar los resultados de forma controlada.
