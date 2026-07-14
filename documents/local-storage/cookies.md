# JavaScript: cookies

## Que son las cookies

Las cookies son pequenos datos que el navegador puede guardar asociados a una pagina web.

Se usan para recordar informacion entre visitas o entre peticiones al servidor.

Por ejemplo:

- Mantener una sesion iniciada.
- Recordar preferencias.
- Guardar un idioma seleccionado.
- Identificar una visita.
- Compartir informacion entre navegador y servidor.

Una cookie tiene siempre una estructura de clave y valor:

```text
nombre=valor
```

Ejemplo:

```text
theme=dark
```

## Donde se ven las cookies

En Chrome puedes verlas desde:

```text
DevTools -> Application -> Cookies
```

Alli veras las cookies asociadas a la pagina actual.

Igual que `localStorage`, las cookies dependen del origen o dominio de la pagina.

## Diferencia principal con localStorage

La diferencia mas importante es esta:

```text
localStorage -> lo usa principalmente JavaScript en el navegador
cookies      -> pueden viajar automaticamente al servidor
```

Cuando una pagina hace una peticion HTTP al mismo dominio, el navegador puede enviar las cookies en esa peticion.

Por eso las cookies se han usado mucho para sesiones de usuario.

## Crear una cookie desde JavaScript

Desde JavaScript se usa `document.cookie`.

```js
document.cookie = 'username=David';
```

Esto crea una cookie llamada `username` con el valor `David`.

Si miras `document.cookie`, veras las cookies accesibles desde JavaScript.

```js
console.log(document.cookie);
```

El resultado suele ser un string:

```text
username=David; theme=dark
```

## Crear una cookie con fecha de expiracion

Si no indicas expiracion, la cookie suele durar solo durante la sesion del navegador.

Para que dure mas tiempo, se puede usar `expires`.

```js
document.cookie = 'theme=dark; expires=Fri, 31 Dec 9999 23:59:59 GMT';
```

Tambien se puede usar `max-age`.

```js
document.cookie = 'theme=dark; max-age=3600';
```

`max-age=3600` significa que la cookie durara 3600 segundos, es decir, 1 hora.

## Indicar la ruta con path

Una cookie puede estar disponible solo para una ruta concreta.

```js
document.cookie = 'theme=dark; path=/';
```

`path=/` significa que la cookie estara disponible en toda la web.

Si no indicas `path`, puede quedar limitada a la ruta actual.

Por eso, en ejemplos sencillos suele usarse:

```js
document.cookie = 'theme=dark; path=/';
```

## Leer cookies

Leer cookies con JavaScript no es tan comodo como leer `localStorage`.

`document.cookie` devuelve todas las cookies accesibles como un unico string.

```js
console.log(document.cookie);
```

Ejemplo de resultado:

```text
username=David; theme=dark; language=es
```

Si quieres leer una cookie concreta, normalmente tienes que separar ese string.

Ejemplo sencillo:

```js
const cookies = document.cookie.split('; ');

console.log(cookies);
```

Esto podria devolver:

```js
['username=David', 'theme=dark', 'language=es']
```

Luego puedes buscar la cookie que necesitas:

```js
const themeCookie = cookies.find(cookie => cookie.startsWith('theme='));

console.log(themeCookie); // 'theme=dark'
```

## Eliminar una cookie

Para eliminar una cookie, se vuelve a escribir con una fecha de expiracion pasada.

```js
document.cookie = 'theme=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
```

Es importante usar el mismo `path` con el que fue creada.

Si la cookie fue creada con:

```js
document.cookie = 'theme=dark; path=/';
```

entonces para borrarla conviene usar tambien:

```js
document.cookie = 'theme=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
```

## Atributos importantes de una cookie

Las cookies pueden tener varios atributos.

### `expires`

Define una fecha exacta de expiracion.

```js
document.cookie = 'theme=dark; expires=Fri, 31 Dec 9999 23:59:59 GMT';
```

### `max-age`

Define cuanto tiempo dura la cookie en segundos.

```js
document.cookie = 'theme=dark; max-age=3600';
```

### `path`

Define en que ruta esta disponible la cookie.

```js
document.cookie = 'theme=dark; path=/';
```

### `Secure`

Indica que la cookie solo debe enviarse usando HTTPS.

```js
document.cookie = 'theme=dark; path=/; Secure';
```

En desarrollo local con `http://localhost`, este atributo puede comportarse de forma diferente segun el navegador y el entorno.

### `SameSite`

Controla cuando se envia una cookie en peticiones entre sitios.

Valores habituales:

- `Strict`: mas restrictivo.
- `Lax`: equilibrio comun para navegacion normal.
- `None`: permite envio en contextos de terceros, normalmente requiere `Secure`.

Ejemplo:

```js
document.cookie = 'theme=dark; path=/; SameSite=Lax';
```

### `HttpOnly`

`HttpOnly` impide que JavaScript lea la cookie.

Esto es util para cookies sensibles de sesion.

Importante: `HttpOnly` no se puede crear desde JavaScript del navegador. Debe crearla el servidor mediante cabeceras HTTP.

## Cookies creadas por servidor

Un servidor puede crear cookies usando la cabecera `Set-Cookie`.

Ejemplo conceptual:

```http
Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Lax; Path=/
```

Cuando el navegador recibe esa respuesta, guarda la cookie.

En futuras peticiones al mismo dominio, el navegador puede enviarla automaticamente.

## Cookies vs localStorage vs sessionStorage

| API | Duracion | Viaja al servidor | Uso comun |
|---|---|---|---|
| `localStorage` | Persiste hasta borrarlo | No automaticamente | Preferencias, datos de app |
| `sessionStorage` | Hasta cerrar la pestana | No automaticamente | Datos temporales de pestana |
| `cookies` | Depende de expiracion | Si, segun dominio/ruta | Sesiones, preferencias simples |

## Cuanto se puede guardar

Las cookies tienen poco espacio disponible comparadas con `localStorage`.

Como regla practica, no conviene guardar datos grandes en cookies.

Evita guardar:

- Arrays grandes.
- Objetos grandes.
- Listas completas de tareas.
- Datos que cambian constantemente.

Para una todo app, normalmente es mejor guardar las tareas en `localStorage`, no en cookies.

## Cuando usar cookies

Usa cookies cuando:

- El servidor necesita recibir el dato automaticamente.
- Estas trabajando con sesiones.
- Necesitas controlar expiracion, dominio, ruta o politicas como `SameSite`.

Usa `localStorage` cuando:

- Solo el frontend necesita leer y guardar el dato.
- Quieres persistir un estado sencillo de la app.
- No necesitas enviar el dato al servidor en cada peticion.

## Seguridad basica

No guardes informacion sensible en cookies accesibles por JavaScript.

Evita guardar:

- Passwords.
- Tokens privados sin proteccion.
- Datos bancarios.
- Informacion personal sensible.

Para sesiones reales, lo normal es que el servidor cree cookies con:

```text
HttpOnly
Secure
SameSite
```

Asi JavaScript no puede leer la cookie de sesion y se reduce el riesgo si hay un ataque XSS.

## Errores comunes

### Pensar que document.cookie devuelve un objeto

```js
console.log(document.cookie.theme); // Error conceptual
```

`document.cookie` devuelve un string, no un objeto.

### Olvidar el path al borrar

Si creaste una cookie con:

```js
document.cookie = 'theme=dark; path=/';
```

no la borres sin `path`:

```js
document.cookie = 'theme=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
```

Mejor:

```js
document.cookie = 'theme=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
```

### Guardar demasiada informacion

Las cookies viajan con peticiones HTTP cuando aplican.

Si guardas demasiado, puedes hacer mas pesadas las peticiones.

Para datos grandes de frontend, usa `localStorage` o una base de datos.

## Regla practica recomendada

Para este curso:

- Usa `localStorage` para guardar el estado de la todo app.
- Aprende cookies como mecanismo de persistencia pequeno y comunicacion con servidor.
- No guardes datos sensibles desde JavaScript.
- Recuerda que `document.cookie` trabaja con strings.
- Usa `path=/` si quieres que la cookie este disponible en toda la app.

Resumen mental:

```text
localStorage -> estado frontend
cookies      -> datos pequenos que pueden viajar al servidor
```
