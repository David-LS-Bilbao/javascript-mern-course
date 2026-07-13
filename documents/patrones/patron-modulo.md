# Patron Modulo en JavaScript

## Que es el patron modulo

El patron modulo es una forma de organizar codigo para separar:

- datos privados
- funciones internas
- API publica

Su objetivo principal es evitar que todo quede expuesto en el scope global.

En JavaScript, antes de los modulos ES (`import` / `export`), era muy comun usar este patron con una funcion autoejecutable, tambien llamada IIFE.

## Problema que resuelve

Sin patron modulo, podriamos terminar con muchas variables globales:

```js
let deck = [];
let puntosJugadores = [];

const pedirCarta = () => {};
const inicializarJuego = () => {};
const determinarGanador = () => {};
```

Esto puede causar problemas:

- otras partes del codigo pueden modificar variables internas
- aumenta el riesgo de nombres repetidos
- cuesta saber que funciones forman parte de la API publica
- el codigo crece sin estructura clara

El patron modulo encapsula esas variables y decide que se expone.

## Forma basica

La estructura clasica es:

```js
const miModulo = (() => {
    'use strict';

    const privado = 'solo existe dentro del modulo';

    const funcionPrivada = () => {
        console.log(privado);
    };

    return {
        funcionPublica: funcionPrivada
    };
})();
```

Partes importantes:

- `(() => {})()` crea una funcion y la ejecuta inmediatamente.
- Las variables dentro de la funcion quedan privadas.
- El `return` define que se expone hacia fuera.

## Ejemplo sencillo

```js
const contadorModulo = (() => {
    let contador = 0;

    const incrementar = () => {
        contador++;
        return contador;
    };

    const reiniciar = () => {
        contador = 0;
    };

    return {
        incrementar,
        reiniciar
    };
})();
```

Uso:

```js
contadorModulo.incrementar(); // 1
contadorModulo.incrementar(); // 2
contadorModulo.reiniciar();
```

No se puede acceder directamente a:

```js
contadorModulo.contador;
```

porque `contador` es privado.

## Aplicado al Blackjack

En el proyecto Blackjack, el modulo principal esta en:

```text
04-blackJack-vite/src/blackjack/index.js
```

La estructura es:

```js
const miModulo = (() => {
    'use strict';

    let deck = [];
    let puntosJugadores = [];

    const reiniciarJuego = () => {};

    btnNuevo.addEventListener('click', reiniciarJuego);

    return {
        nuevoJuego: reiniciarJuego
    };
})();
```

## Que queda privado

Dentro del modulo quedan privados:

```js
let deck = [];
let puntosJugadores = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];
```

Tambien quedan privadas las referencias del DOM:

```js
const btnPedir = document.querySelector('#btnPedir');
const divCartasJugadores = document.querySelectorAll('.divCartas');
```

Eso significa que el resto de la aplicacion no puede modificar directamente esos datos.

## Que se expone

Al final del modulo se devuelve un objeto:

```js
return {
    nuevoJuego: reiniciarJuego
};
```

Eso significa que desde fuera solo se podria usar:

```js
miModulo.nuevoJuego();
```

No se expone todo el estado interno, solo una accion controlada.

## Ventajas

### Encapsulacion

El estado interno no queda suelto en el scope global.

```js
deck
puntosJugadores
```

solo existen dentro del modulo.

### API publica clara

El `return` funciona como una lista de lo que el modulo permite usar desde fuera.

```js
return {
    nuevoJuego: reiniciarJuego
};
```

### Menos colisiones

Como las variables viven dentro del modulo, es menos probable que choquen con otros nombres del proyecto.

### Mejor organizacion

El archivo principal puede actuar como orquestador:

- escucha eventos
- mantiene estado
- llama a casos de uso
- decide que funciones expone

## Relacion con modulos ES

En proyectos modernos con Vite ya usamos modulos ES:

```js
import { pedirCarta } from './useCases/pedir-carta.js';
export const pedirCarta = () => {};
```

Los modulos ES ya tienen scope propio. Eso significa que cada archivo no contamina automaticamente el scope global.

Entonces, en Vite, el patron modulo no siempre es obligatorio.

Aun asi, puede seguir siendo util cuando quieres agrupar estado interno y exponer una API publica concreta:

```js
const miModulo = (() => {
    let deck = [];

    const reiniciarJuego = () => {};

    return {
        nuevoJuego: reiniciarJuego
    };
})();
```

## Diferencia entre modulo ES y patron modulo

### Modulo ES

Trabaja a nivel de archivo:

```js
export const crearCarta = () => {};
```

Se importa desde otro archivo:

```js
import { crearCarta } from './crear-carta.js';
```

### Patron modulo

Trabaja a nivel de objeto/funcion:

```js
const miModulo = (() => {
    return {
        nuevoJuego
    };
})();
```

Puede usarse dentro de un archivo para proteger estado interno.

## Pasos para implementar el patron modulo

### 1. Crear una funcion autoejecutable

```js
const miModulo = (() => {
})();
```

### 2. Activar modo estricto

```js
const miModulo = (() => {
    'use strict';
})();
```

### 3. Colocar estado privado dentro

```js
const miModulo = (() => {
    'use strict';

    let deck = [];
    let puntosJugadores = [];
})();
```

### 4. Definir funciones internas

```js
const miModulo = (() => {
    'use strict';

    let deck = [];

    const reiniciarJuego = () => {
        deck = [];
    };
})();
```

### 5. Devolver la API publica

```js
const miModulo = (() => {
    'use strict';

    let deck = [];

    const reiniciarJuego = () => {
        deck = [];
    };

    return {
        nuevoJuego: reiniciarJuego
    };
})();
```

## Buenas practicas

- Expone solo lo necesario.
- Mantiene el estado interno lo mas pequeno posible.
- Evita que el modulo haga demasiadas cosas.
- Usa nombres claros para la API publica.
- Si una funcion crece mucho, extraela a otro archivo.
- En proyectos con Vite, combina el patron modulo con `import` y `export`.

## Errores comunes

### Exponer demasiado

No conviene hacer esto:

```js
return {
    deck,
    puntosJugadores,
    btnPedir,
    btnDetener
};
```

Eso rompe parte del beneficio de encapsular.

### Usar variables internas desde otro archivo

Si una variable esta dentro del modulo:

```js
let puntosJugadores = [];
```

otro archivo no puede usarla directamente. Hay que pasarla por parametro o exponer una funcion controlada.

### Mezclar demasiada logica

El patron modulo ayuda, pero no sustituye una buena separacion de archivos.

Por eso el Blackjack usa tambien:

```text
useCases/
```

para separar acciones concretas.

## Resumen

El patron modulo permite agrupar codigo y proteger datos internos.

En el Blackjack:

- `index.js` mantiene el estado principal.
- los `useCases` contienen acciones concretas.
- el modulo expone solo `nuevoJuego`.

La idea clave es:

```text
lo interno queda privado, lo necesario se devuelve en el return
```

Este patron es una buena base para entender despues otros conceptos como arquitectura modular, principios SOLID y separacion de responsabilidades.
