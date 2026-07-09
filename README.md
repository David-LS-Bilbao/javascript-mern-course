# JavaScript Moderno - Apuntes y practicas

Este repositorio contiene apuntes, ejemplos y practicas de fundamentos de JavaScript moderno.

El proyecto esta basado en el curso de Udemy:

[JavaScript Moderno: Guia para dominar el lenguaje](https://www.udemy.com/course/javascript-fernando-herrera/)

La idea de este repositorio es servir como cuaderno de estudio: cada archivo contiene ejemplos pequenos, comentarios y explicaciones para repasar conceptos importantes del lenguaje.

---

## Objetivo del proyecto

El objetivo principal es aprender y practicar JavaScript desde sus bases hasta conceptos mas avanzados del lenguaje.

Este proyecto no busca ser una aplicacion final de produccion, sino un espacio de practica para:

- Entender la sintaxis de JavaScript.
- Practicar variables, tipos de datos y operadores.
- Trabajar con funciones, arrays y objetos.
- Aprender estructuras de control.
- Entender clases, herencia y caracteristicas modernas.
- Documentar conceptos importantes con apuntes en Markdown.

---

## Estructura general

```txt
.
├── 01-fundamentos/
│   ├── index.html
│   ├── assets/
│   └── js/
│       ├── bases/
│       ├── ciclos/
│       └── classes/
├── 02-blackjack/
│   ├── index.html
│   └── css/
└── documents/
    ├── README.md
    ├── clases/
    ├── fundamentos/
    └── github/
```

---

## 01-fundamentos

La carpeta `01-fundamentos` contiene ejemplos basicos y progresivos de JavaScript.

### Bases

Ubicacion:

```txt
01-fundamentos/js/bases/
```

Temas incluidos:

- Variables y constantes.
- Tipos primitivos.
- Alerts y prompts.
- Arrays.
- Objetos literales.
- Funciones.
- Retorno de funciones.
- Logica booleana.
- Operador ternario.
- Valor por referencia y valor por copia.

### Ciclos y estructuras de control

Ubicacion:

```txt
01-fundamentos/js/ciclos/
```

Temas incluidos:

- `if...else`
- `switch`
- `for`
- `while`

### Clases

Ubicacion:

```txt
01-fundamentos/js/classes/
```

Temas incluidos:

- Clases en JavaScript.
- Constructores.
- Getters y setters.
- Propiedades y metodos estaticos.
- Subclases y herencia.
- Propiedades y metodos privados.
- Singleton.
- Constructores multiples simulados con metodos estaticos.
- Diferencias entre clases y funciones creadoras de objetos.

---

## 02-blackjack

La carpeta `02-blackjack` contiene una practica de juego basada en Blackjack.

Ubicacion:

```txt
02-blackjack/
```

Esta seccion sirve para aplicar conceptos de JavaScript en un ejemplo mas practico, combinando logica del lenguaje con HTML y CSS.

---

## Documents

La carpeta `documents` contiene apuntes en formato Markdown.

Estos documentos complementan los archivos `.js` con explicaciones mas largas y organizadas.

### Fundamentos

Ubicacion:

```txt
documents/fundamentos/
```

Apuntes disponibles:

- `let-const-var.md`
- `tipos-primitivos.md`
- `operador-ternario.md`

### Clases

Ubicacion:

```txt
documents/clases/
```

Apuntes disponibles:

- `clases-vs-funciones-creadoras.md`
- `clases-estaticas.md`
- `propiedades-metodos-privados.md`
- `singleton.md`
- `constructores-multiples.md`

### Git y GitHub

Ubicacion:

```txt
documents/github/
```

Apuntes disponibles:

- `comandos-basicos.md`

---

## Como usar este proyecto

Para estudiar un tema concreto:

1. Abre el archivo JavaScript correspondiente.
2. Lee los comentarios del codigo.
3. Ejecuta o prueba el ejemplo en el navegador o con Node.js.
4. Consulta el documento Markdown relacionado en `documents`.

Por ejemplo, para estudiar Singleton:

```txt
01-fundamentos/js/classes/singleton.js
documents/clases/singleton.md
```

Para estudiar propiedades privadas:

```txt
01-fundamentos/js/classes/esnext.js
documents/clases/propiedades-metodos-privados.md
```

---

## Ejecutar ejemplos

Algunos archivos se pueden ejecutar directamente con Node.js:

```bash
node 01-fundamentos/js/classes/singleton.js
node 01-fundamentos/js/classes/esnext.js
node 01-fundamentos/js/classes/constructores-multiples.js
```

Otros ejemplos estan pensados para ejecutarse desde el navegador usando `index.html`.

En esos casos, se puede cambiar el script activo dentro de:

```txt
01-fundamentos/index.html
```

---

## Estado actual

Este README es una version preliminar.

El proyecto seguira creciendo a medida que se agreguen nuevos ejemplos, ejercicios y apuntes del curso.

Pendientes posibles:

- Completar la documentacion de todos los archivos de `bases`.
- Completar la documentacion de ciclos.
- Ampliar la documentacion del proyecto Blackjack.
- Anadir una guia de orden recomendado de estudio.
- Revisar y unificar estilos de comentarios en todos los ejemplos.

---

## Nota

Este repositorio es material personal de estudio basado en el curso mencionado.

Los ejemplos y apuntes estan escritos con fines educativos para reforzar los fundamentos de JavaScript moderno.
