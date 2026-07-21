# Fundamentos de HTTP y APIs

> Documento provisional. Se adaptará a los endpoints y decisiones finales de la aplicación.

## Qué es una API

Una API define una forma de comunicación entre programas. En una API HTTP, el cliente envía una petición a una URL y el servidor devuelve una respuesta.

En este módulo:

- El navegador es el cliente.
- PokéAPI es el servidor externo.
- Fetch API realiza las peticiones.
- La respuesta contiene datos que después se muestran en el DOM.

## Qué es un endpoint

Un endpoint es una combinación de método HTTP y URL que permite realizar una operación concreta.

Ejemplo de PokéAPI:

```text
GET https://pokeapi.co/api/v2/pokemon/25
```

Partes principales:

```text
https://pokeapi.co/api/v2  → URL base
/pokemon                   → recurso
/25                        → identificador
```

PokéAPI permite consultar un Pokémon por identificador o nombre:

```text
GET https://pokeapi.co/api/v2/pokemon/25
GET https://pokeapi.co/api/v2/pokemon/pikachu
```

## Métodos HTTP habituales

| Método | Uso habitual |
|---|---|
| `GET` | Obtener información |
| `POST` | Crear un recurso |
| `PUT` | Reemplazar un recurso completo |
| `PATCH` | Actualizar parte de un recurso |
| `DELETE` | Eliminar un recurso |

La aplicación inicial utilizará `GET` porque solo necesita consultar información.

## Petición y respuesta

Una petición HTTP puede incluir:

- Método.
- URL.
- Parámetros de ruta o consulta.
- Cabeceras.
- Cuerpo, cuando el método lo admite y la API lo requiere.
- Información de autenticación.

Una respuesta HTTP suele incluir:

- Código de estado.
- Cabeceras.
- Cuerpo de la respuesta.

En una API REST es frecuente recibir el cuerpo en formato JSON.

## Códigos de estado

Los códigos se agrupan por categorías:

| Rango | Significado general |
|---|---|
| `100–199` | Respuesta informativa |
| `200–299` | Operación correcta |
| `300–399` | Redirección |
| `400–499` | Error relacionado con la petición del cliente |
| `500–599` | Error del servidor |

Ejemplos frecuentes:

- `200 OK`: la petición se completó correctamente.
- `404 Not Found`: el recurso solicitado no existe.
- `429 Too Many Requests`: se superó un límite de peticiones.
- `500 Internal Server Error`: ocurrió un error en el servidor.

## JSON

JSON es un formato textual utilizado para intercambiar datos.

```json
{
  "id": 25,
  "name": "pikachu",
  "height": 4,
  "weight": 60
}
```

Después de convertir la respuesta con `response.json()`, JavaScript permite acceder a sus propiedades:

```js
console.log(pokemon.name);
console.log(pokemon.id);
```

## CORS

CORS es una política de seguridad aplicada por los navegadores a peticiones entre orígenes distintos. El servidor debe permitir el origen de la aplicación mediante sus cabeceras.

Una petición puede funcionar en Postman y fallar en el navegador por CORS, ya que Postman no ejecuta la petición dentro del contexto de seguridad de una página web.

No se debe intentar solucionar un problema de CORS desactivando permanentemente la seguridad del navegador. La solución correcta depende de la configuración del servidor o de un backend intermediario autorizado.

## Referencias

- [Códigos de estado HTTP — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
- [Documentación de PokéAPI](https://pokeapi.co/docs/v2)

