# Guia de optimizacion y refactorizacion: Blackjack con Vite

## Objetivo

El objetivo de esta refactorizacion fue pasar de un archivo grande con toda la logica del juego a una estructura modular con `useCases`.

La idea principal no fue cambiar el comportamiento del juego, sino mejorar:

- lectura del codigo
- separacion de responsabilidades
- reutilizacion de funciones
- facilidad para detectar errores
- mantenimiento futuro

## Punto de partida

Al inicio, `index.js` tenia muchas responsabilidades mezcladas:

- crear el deck
- pedir cartas
- calcular valores
- acumular puntos
- pintar cartas en pantalla
- decidir ganador
- ejecutar el turno de la computadora
- escuchar eventos de botones

Eso funciona en proyectos pequenos, pero cuando el codigo crece se vuelve mas dificil de leer y modificar.

## Estrategia usada

La estrategia fue extraer funciones una por una hacia archivos dentro de:

```text
src/blackjack/useCases/
```

Cada archivo se encarga de una accion concreta del juego.

## Regla importante

Un modulo no puede usar automaticamente variables de otro archivo.

Por ejemplo, si `index.js` tiene:

```js
let puntosJugadores = [];
const puntosHTML = document.querySelectorAll('small');
```

un archivo como `acumular-puntos.js` no puede usar esas variables directamente. Deben recibirse por parametros:

```js
acumularPuntos(carta, turno, puntosJugadores, puntosHTML);
```

Esta regla evita dependencias ocultas y hace que cada funcion sea mas clara.

## Orden recomendado de refactorizacion

### 1. Extraer funciones puras o simples

Primero conviene mover funciones con pocas dependencias:

```text
valor-carta.js
pedir-carta.js
crear-deck.js
```

Son buenas candidatas porque reciben datos simples y devuelven un resultado claro.

### 2. Extraer funciones con DOM controlado

Despues se pueden mover funciones que actualizan la pantalla:

```text
crear-carta.js
acumular-puntos.js
```

En vez de buscar elementos dentro de cada funcion, se pasan las referencias ya cacheadas desde `index.js`.

Ejemplo:

```js
crearCarta(carta, divCartasJugadores[0]);
```

Esto evita repetir busquedas con `document.querySelector` y deja mas claro que elemento se modifica.

### 3. Extraer inicializacion

La inicializacion se movio a:

```text
inicializar-juego.js
```

Este use case:

- crea un nuevo deck
- reinicia puntos
- limpia las cartas visibles
- habilita botones
- devuelve el deck nuevo

La funcion devuelve `deck` porque `index.js` sigue siendo quien conserva el estado principal de la partida.

### 4. Extraer resultado final

La decision del ganador se movio a:

```text
determinar-ganador.js
```

Solo necesita recibir:

```js
puntosJugadores
```

Esto reduce el codigo de `index.js` y deja la condicion de victoria en un lugar aislado.

### 5. Extraer turno de computadora

El ultimo paso fue mover:

```text
turno-computadora.js
```

Este es el caso mas delicado porque coordina varios use cases:

- `pedirCarta`
- `acumularPuntos`
- `crearCarta`
- `determinarGanador`

Por eso se hizo al final, cuando las piezas pequenas ya estaban separadas.

## Papel actual de `index.js`

Despues de la refactorizacion, `index.js` queda como archivo orquestador.

Sus responsabilidades principales son:

- mantener el estado compartido del juego
- cachear referencias del DOM
- conectar eventos de botones
- llamar a los use cases en el orden correcto

Esto es una mejora porque `index.js` ya no contiene todos los detalles internos de cada accion.

## Optimizaciones aplicadas

### Cachear referencias del DOM

En vez de buscar botones y contenedores muchas veces, se guardan una vez:

```js
const btnPedir = document.querySelector('#btnPedir');
const divCartasJugadores = document.querySelectorAll('.divCartas');
```

Esto mejora rendimiento y claridad.

### Pasar contenedores ya resueltos

`crearCarta` recibe directamente el contenedor:

```js
crearCarta(carta, divCartasJugadores[0]);
```

Asi la funcion no necesita saber como buscar elementos en el DOM.

### Reutilizar el arreglo de puntos

En `inicializarJuego`, se reinicia el arreglo asi:

```js
puntosJugadores.length = 0;
```

Esto conserva la misma referencia del arreglo, lo que es util cuando otras funciones reciben o usan esa misma referencia.

### Verificar despues de cada paso

Despues de cada refactorizacion se debe ejecutar:

```bash
npm run build
```

Si falla, sabes que el ultimo cambio introdujo el problema.

## Errores comunes durante este proceso

### Importar algo que no se exporta

Ejemplo de error:

```text
MISSING_EXPORT
```

Sucede cuando un archivo intenta importar una variable que no fue exportada por otro archivo.

Solucion: pasar esa variable por parametro o exportarla explicitamente si realmente debe compartirse.

### Usar variables que no existen en el modulo

Ejemplo:

```js
puntosJugadores[turno] += valorCarta(carta);
```

Si `puntosJugadores` no existe en ese archivo, fallara. Debe recibirse:

```js
export const acumularPuntos = (carta, turno, puntosJugadores, puntosHTML) => {};
```

### Dejar imports sobrantes

Cuando una funcion se mueve a otro archivo, hay que revisar si el import sigue siendo necesario.

Un import sobrante no siempre rompe el build, pero ensucia el codigo y puede confundir.

## Estado recomendado actual

La refactorizacion puede quedarse en este punto.

La estructura ya es suficientemente clara para un proyecto de curso:

```text
blackjack/
  index.js
  useCases/
    acumular-puntos.js
    crear-carta.js
    crear-deck.js
    determinar-ganador.js
    inicializar-juego.js
    pedir-carta.js
    turno-computadora.js
    valor-carta.js
```

## Mejoras futuras opcionales

Mas adelante se podria:

- mover las cartas a `public/assets/cartas`
- sacar la ruta de cartas a una constante
- reemplazar `alert` por un mensaje en pantalla
- cambiar `throw 'mensaje'` por `throw new Error('mensaje')`
- quitar el IIFE si se quiere depender solo del scope de modulos ES
- crear pruebas unitarias para `valorCarta`, `crearDeck` y `pedirCarta`

## Resumen

El flujo final queda asi:

1. `index.js` escucha los eventos.
2. El jugador pide una carta.
3. `pedirCarta` extrae una carta del deck.
4. `acumularPuntos` actualiza estado y marcador.
5. `crearCarta` pinta la carta.
6. Si el jugador termina, `turnoComputadora` ejecuta el turno automatico.
7. `determinarGanador` decide el resultado.

La mejora clave es que cada archivo tiene una responsabilidad concreta y los datos compartidos se pasan de forma explicita.
