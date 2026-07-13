# Manual rapido de Vite

## Que es Vite

Vite es una herramienta para crear y ejecutar proyectos frontend modernos. Sirve principalmente para:

- Levantar un servidor de desarrollo rapido.
- Usar modulos de JavaScript con `import` y `export`.
- Recargar cambios al instante con HMR.
- Preparar una version final optimizada para produccion.

En proyectos antiguos era normal enlazar muchos scripts directamente en el HTML:

```html
<script src="./assets/js/underscore-min.js"></script>
<script src="./assets/js/juego.js"></script>
```

Con Vite, lo normal es tener un archivo principal, por ejemplo `src/main.js`, y desde ahi importar otros archivos:

```js
import './style.css';
import { setupCounter } from './counter.js';
```

## Proyecto revisado

En esta carpeta:

```text
03-modulos-vite/
```

hay dos enfoques distintos:

- `index.html`: ejemplo clasico con scripts cargados desde el HTML.
- `vite-app/`: proyecto creado con Vite.

La app de Vite tiene esta estructura importante:

```text
vite-app/
  index.html
  package.json
  public/
  src/
    main.js
    counter.js
    style.css
    assets/
  dist/
```

## Instalacion

Para crear un proyecto nuevo con Vite:

```bash
npm create vite@latest
```

Despues eliges:

- nombre del proyecto
- framework, por ejemplo Vanilla, React, Vue, etc.
- variante, por ejemplo JavaScript o TypeScript

Luego entras en la carpeta e instalas dependencias:

```bash
cd nombre-del-proyecto
npm install
```

En el proyecto revisado, la carpeta es:

```bash
cd 03-modulos-vite/vite-app
```

## Scripts principales

En `package.json` aparecen estos scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Modo desarrollo

```bash
npm run dev
```

Esto levanta un servidor local. Vite mostrara una URL parecida a:

```text
http://localhost:5173/
```

Hay que abrir esa URL en el navegador. No conviene abrir `index.html` con doble click, porque los imports de modulos y paquetes necesitan el servidor de Vite.

### Compilar para produccion

```bash
npm run build
```

Esto genera la carpeta:

```text
dist/
```

Dentro de `dist` se colocan los archivos finales optimizados: HTML, CSS, JavaScript y assets procesados.

### Probar la build

```bash
npm run preview
```

Esto sirve la carpeta `dist` en local para comprobar como funcionaria la app ya compilada.

## Como funciona Vite

El archivo `index.html` es la entrada de la aplicacion. En el proyecto revisado tiene esta linea:

```html
<script type="module" src="/src/main.js"></script>
```

Eso le dice al navegador que cargue `src/main.js` como modulo.

Desde `main.js` se importan otros archivos:

```js
import './style.css';
import javascriptLogo from './assets/javascript.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import { setupCounter } from './counter.js';
```

Vite entiende esos imports y se encarga de:

- cargar CSS desde JavaScript
- resolver imagenes importadas
- resolver modulos propios
- resolver paquetes instalados desde `node_modules`
- actualizar el navegador cuando guardas cambios

## HMR

HMR significa Hot Module Replacement. Es la recarga rapida de modulos durante desarrollo.

Cuando editas un archivo como:

```text
src/main.js
src/style.css
```

Vite actualiza el navegador sin tener que recargar manualmente toda la pagina.

## Assets: `src/assets` vs `public`

Vite maneja los recursos de dos formas principales.

### Recursos importados desde `src`

Ejemplo:

```js
import heroImg from './assets/hero.png';
```

Estos archivos pasan por Vite. En produccion, Vite los copia a `dist/assets` con nombres optimizados, por ejemplo:

```text
hero-CLDdwZDr.png
```

Este enfoque es recomendable para imagenes, SVGs o archivos que usas desde JavaScript o CSS.

### Recursos publicos

Todo lo que este dentro de:

```text
public/
```

se copia directamente a `dist/`.

Por ejemplo:

```text
public/favicon.svg
public/icons.svg
```

se pueden usar desde el HTML o JS con rutas absolutas:

```html
<link rel="icon" href="/favicon.svg">
```

```js
document.querySelector('use').setAttribute('href', '/icons.svg#github-icon');
```

## Rutas importantes

En Vite, estas rutas son distintas:

```html
<script type="module" src="/src/main.js"></script>
```

y:

```html
<script type="module" src="./src/main.js"></script>
```

La primera usa una ruta desde la raiz del servidor de Vite. Es la forma habitual en proyectos Vite.

La segunda usa una ruta relativa al HTML actual. Puede funcionar en algunos casos, pero si el proyecto se sirve desde otra base o subcarpeta, puede causar problemas.

## Dependencias

Las dependencias se instalan con npm:

```bash
npm install nombre-del-paquete
```

Luego se importan desde JavaScript:

```js
import _ from 'underscore';
```

Con Vite no hace falta enlazar el archivo de la libreria manualmente en el HTML si esta instalada como dependencia.

## Errores comunes

### 1. Abrir el HTML directamente

Error comun:

```text
Failed to resolve module specifier
```

Solucion: usar siempre el servidor de Vite:

```bash
npm run dev
```

### 2. Ruta incorrecta al script principal

Si `index.html` esta dentro del proyecto, no hay que duplicar el nombre de la carpeta.

Incorrecto:

```html
<script type="module" src="./mi-proyecto/src/main.js"></script>
```

Correcto:

```html
<script type="module" src="/src/main.js"></script>
```

o, segun el caso:

```html
<script type="module" src="./src/main.js"></script>
```

### 3. Elementos HTML que no existen

Si JavaScript hace esto:

```js
document.querySelector('#btnPedir').addEventListener('click', fn);
```

pero en el HTML no existe:

```html
<button id="btnPedir">Pedir carta</button>
```

aparecera un error parecido a:

```text
Cannot read properties of null (reading 'addEventListener')
```

Solucion: crear el elemento en el HTML o comprobar que existe antes de usarlo.

### 4. Imagenes que funcionan en desarrollo pero no en produccion

Si cargas imagenes desde una carpeta fuera de `src` o `public`, puede que `npm run build` no las copie a `dist`.

Soluciones habituales:

- mover imagenes estaticas a `public/assets`
- importar imagenes desde `src/assets`
- comprobar que la ruta existe despues de ejecutar `npm run build`

## Flujo de trabajo recomendado

1. Crear o entrar al proyecto.
2. Ejecutar `npm install` si no existe `node_modules`.
3. Ejecutar `npm run dev`.
4. Abrir la URL de Vite en el navegador.
5. Editar archivos dentro de `src`.
6. Revisar la consola del navegador si algo falla.
7. Ejecutar `npm run build` antes de dar por terminado.
8. Ejecutar `npm run preview` si quieres comprobar la version final.

## Resumen rapido

Vite no reemplaza JavaScript, HTML o CSS. Vite organiza y sirve el proyecto para que puedas trabajar con modulos modernos, imports, assets y dependencias de npm de forma sencilla.

En desarrollo:

```bash
npm run dev
```

Para generar produccion:

```bash
npm run build
```

Para probar produccion:

```bash
npm run preview
```

La idea clave es: el navegador entra por `index.html`, Vite carga `src/main.js`, y desde ese archivo se importan los demas modulos, estilos e imagenes.
