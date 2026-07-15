# JavaScript: variables de entorno, dotenv y Vite

## Que son las variables de entorno

Las variables de entorno son valores de configuracion que una aplicacion puede leer sin escribirlos directamente dentro del codigo fuente.

Se usan para separar el codigo de la configuracion.

Por ejemplo:

```text
API_URL=https://api.example.com
APP_NAME=Mi aplicacion
DEBUG=true
```

La idea es que el codigo pueda usar esos valores, pero que puedan cambiar segun el entorno:

- Desarrollo local.
- Testing.
- Produccion.
- Despliegue en un servidor.

## Para que sirven

Las variables de entorno se usan mucho para:

- URLs de APIs.
- Modo desarrollo o produccion.
- Claves publicas de servicios externos.
- Configuracion de logs.
- Puertos del servidor.
- Nombre de la aplicacion.
- Activar o desactivar funcionalidades.

Ejemplo conceptual:

```js
const apiUrl = 'https://api.example.com';
```

Esto funciona, pero deja la URL fija en el codigo.

Con variable de entorno, la idea seria:

```js
const apiUrl = import.meta.env.VITE_API_URL;
```

Asi puedes cambiar la URL sin cambiar la logica de la aplicacion.

## Archivos `.env`

En muchos proyectos se usan archivos `.env` para definir variables de entorno.

Ejemplo:

```env
VITE_APP_NAME=Advanced JavaScript
VITE_API_URL=https://api.example.com
VITE_DEBUG=true
```

Cada linea tiene esta forma:

```text
NOMBRE=valor
```

No se usan espacios alrededor del `=`.

Correcto:

```env
VITE_API_URL=https://api.example.com
```

Evitar:

```env
VITE_API_URL = https://api.example.com
```

## Variables de entorno en Node.js

En Node.js, las variables de entorno se leen normalmente desde:

```js
process.env
```

Ejemplo:

```js
const port = process.env.PORT;
```

Si ejecutas una aplicacion Node y existe una variable `PORT`, puedes leerla desde `process.env.PORT`.

## Que es dotenv

`dotenv` es una libreria muy usada en Node.js para cargar variables desde un archivo `.env` y ponerlas dentro de `process.env`.

Instalacion:

```bash
npm install dotenv
```

Uso tipico en Node:

```js
import 'dotenv/config';

console.log(process.env.PORT);
console.log(process.env.DATABASE_URL);
```

O tambien:

```js
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.PORT);
```

`dotenv` es especialmente comun en backend con Node, Express, scripts, CLIs o herramientas que se ejecutan fuera del navegador.

## Importante: Vite no usa dotenv igual que Node

Vite ya trae soporte para archivos `.env`.

En una app frontend con Vite normalmente no necesitas instalar `dotenv` para leer variables en el navegador.

Vite carga los archivos `.env` y expone ciertas variables mediante:

```js
import.meta.env
```

Ejemplo:

```js
console.log(import.meta.env.VITE_APP_NAME);
```

## El prefijo `VITE_`

Esta es la regla mas importante en Vite:

```text
Solo las variables que empiezan por VITE_ estan disponibles en el codigo del navegador.
```

Ejemplo correcto:

```env
VITE_API_URL=https://api.example.com
```

Uso en JavaScript:

```js
const apiUrl = import.meta.env.VITE_API_URL;
```

Ejemplo que no estara disponible en el frontend:

```env
API_SECRET=abc123
```

Si intentas leerla desde el navegador:

```js
console.log(import.meta.env.API_SECRET); // undefined
```

Vite hace esto por seguridad: evita exponer por accidente cualquier variable del entorno.

## Variables integradas de Vite

Vite tambien proporciona algunas variables por defecto.

```js
console.log(import.meta.env.MODE);
console.log(import.meta.env.DEV);
console.log(import.meta.env.PROD);
console.log(import.meta.env.BASE_URL);
```

### `import.meta.env.MODE`

Indica el modo actual.

Normalmente puede ser:

```text
development
production
```

### `import.meta.env.DEV`

Vale `true` cuando estas en desarrollo.

```js
if (import.meta.env.DEV) {
  console.log('Estamos en desarrollo');
}
```

### `import.meta.env.PROD`

Vale `true` cuando la app esta compilada para produccion.

```js
if (import.meta.env.PROD) {
  console.log('Estamos en produccion');
}
```

### `import.meta.env.BASE_URL`

Indica la base publica desde la que se sirve la app.

Es util en despliegues donde la aplicacion no vive en la raiz del dominio.

## Archivos `.env` comunes en Vite

Vite puede leer varios archivos.

```text
.env
.env.local
.env.development
.env.production
```

### `.env`

Variables generales para todos los entornos.

```env
VITE_APP_NAME=Advanced JavaScript
```

### `.env.local`

Variables locales de tu maquina.

Normalmente no se sube a Git.

```env
VITE_API_URL=http://localhost:3000
```

### `.env.development`

Variables especificas para desarrollo.

```env
VITE_API_URL=http://localhost:3000/api
```

### `.env.production`

Variables especificas para produccion.

```env
VITE_API_URL=https://api.midominio.com
```

## Reiniciar el servidor de Vite

Cuando cambias un archivo `.env`, normalmente debes reiniciar el servidor de desarrollo.

Es decir:

```bash
Ctrl + C
npm run dev
```

Esto es importante porque las variables de entorno se cargan al iniciar Vite.

Si cambias `main.js`, Vite recarga automaticamente.

Si cambias `.env`, conviene reiniciar el servidor.

## Ejemplo completo en Vite

Archivo `.env`:

```env
VITE_APP_TITLE=Advanced JavaScript
VITE_AUTHOR=David Lopez
VITE_API_URL=https://api.example.com
```

Uso en `main.js`:

```js
const appTitle = import.meta.env.VITE_APP_TITLE;
const author = import.meta.env.VITE_AUTHOR;
const apiUrl = import.meta.env.VITE_API_URL;

console.log(appTitle);
console.log(author);
console.log(apiUrl);
```

## Variables de entorno y seguridad

Regla clave:

```text
Todo lo que uses en el frontend puede ser visto por el usuario.
```

Aunque una variable este en `.env`, si empieza por `VITE_` y la usas en la app, acabara dentro del codigo JavaScript enviado al navegador.

No guardes en variables `VITE_` datos secretos como:

- Passwords.
- Tokens privados.
- Claves privadas.
- Credenciales de base de datos.
- Secretos de backend.

Esto es peligroso:

```env
VITE_DATABASE_PASSWORD=super-secret
```

Porque al estar en frontend podria ser visible.

## Que variables si puedes usar en Vite

Puedes usar variables publicas o no sensibles:

```env
VITE_APP_NAME=Advanced JavaScript
VITE_API_URL=https://api.example.com
VITE_PUBLIC_MAP_KEY=clave-publica
VITE_FEATURE_COMMENTS=true
```

Incluso si se llaman "keys", algunas APIs usan claves publicas pensadas para navegador. Aun asi, hay que revisar siempre la documentacion del servicio.

## `.env` y Git

En proyectos reales, se suele evitar subir `.env` con datos sensibles.

Lo normal es tener:

```text
.env
.env.local
.env.example
```

### `.env.example`

Sirve como plantilla sin secretos.

Ejemplo:

```env
VITE_APP_NAME=
VITE_API_URL=
```

Este archivo si se puede subir al repositorio.

### `.env.local`

Suele contener valores reales de tu maquina.

Ejemplo:

```env
VITE_API_URL=http://localhost:3000/api
```

Normalmente se agrega al `.gitignore`.

## Diferencia entre frontend y backend

En backend con Node:

```js
process.env.DATABASE_URL
```

En frontend con Vite:

```js
import.meta.env.VITE_API_URL
```

Resumen:

| Entorno | Como se leen |
|---|---|
| Node.js | `process.env.NOMBRE` |
| Vite frontend | `import.meta.env.VITE_NOMBRE` |

## Errores comunes

### Usar `process.env` en Vite frontend

```js
console.log(process.env.VITE_API_URL);
```

En Vite frontend no es la forma correcta.

Usa:

```js
console.log(import.meta.env.VITE_API_URL);
```

### Olvidar el prefijo `VITE_`

```env
API_URL=https://api.example.com
```

Esto no estara disponible en el navegador.

Mejor:

```env
VITE_API_URL=https://api.example.com
```

### No reiniciar Vite despues de cambiar `.env`

Si cambias:

```env
VITE_APP_NAME=Nuevo nombre
```

y no ves el cambio, reinicia:

```bash
npm run dev
```

### Guardar secretos en variables del frontend

Evita esto:

```env
VITE_SECRET_TOKEN=abc123
```

Si empieza por `VITE_`, puede acabar visible en el navegador.

## Regla practica recomendada

Para proyectos Vite:

- Usa `.env` para configuracion.
- Usa nombres con prefijo `VITE_`.
- Lee variables con `import.meta.env`.
- Reinicia Vite al cambiar `.env`.
- No guardes secretos en variables que use el frontend.
- Usa `.env.example` como plantilla.
- Usa `.env.local` para valores propios de tu maquina.

Ejemplo final:

```env
VITE_APP_NAME=Advanced JavaScript
VITE_API_URL=http://localhost:3000/api
```

```js
const appName = import.meta.env.VITE_APP_NAME;
const apiUrl = import.meta.env.VITE_API_URL;

console.log(`${appName} usa la API ${apiUrl}`);
```

Resumen mental:

```text
dotenv en Node -> process.env
Vite frontend  -> import.meta.env.VITE_*
```
