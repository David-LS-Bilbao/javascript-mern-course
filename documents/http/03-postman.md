# Pruebas de endpoints con Postman

> Documento provisional. Se completará con las peticiones y resultados usados durante la lección.

## Para qué se utiliza Postman

Postman permite construir y enviar peticiones a una API sin tener que crear primero una interfaz web.

Resulta útil para:

- Comprobar que un endpoint existe.
- Explorar la estructura de la respuesta.
- Revisar códigos de estado y cabeceras.
- Probar identificadores válidos e inválidos.
- Guardar peticiones en colecciones.
- Separar un error de API de un error del código del navegador.

## Primera petición a PokéAPI

1. Crea una petición HTTP nueva.
2. Selecciona el método `GET`.
3. Introduce la URL:

```text
https://pokeapi.co/api/v2/pokemon/25
```

4. Pulsa **Send**.
5. Revisa el código de estado, el tiempo, las cabeceras y el cuerpo JSON.

## Qué revisar en la respuesta

Para la aplicación pueden resultar relevantes propiedades como:

```text
id
name
height
weight
sprites
types
```

La estructura real debe comprobarse en la respuesta y en la documentación de PokéAPI antes de escribir el renderizado.

## Casos mínimos de prueba

| Caso | Petición | Resultado esperado |
|---|---|---|
| ID existente | `/pokemon/25` | `200` y datos de Pikachu |
| Nombre existente | `/pokemon/pikachu` | `200` y datos de Pikachu |
| ID inexistente | `/pokemon/999999` | Respuesta de recurso no encontrado |
| Nombre inexistente | `/pokemon/no-existe` | Respuesta de recurso no encontrado |
| URL incompleta | `/pokemon/` | Devuelve el listado, no el detalle de un Pokémon |

## Guardar una colección

Una colección agrupa peticiones relacionadas. Para este módulo puede crearse una colección llamada:

```text
Pokémon HTTP App
```

Posibles peticiones:

```text
GET Pokémon por ID
GET Pokémon por nombre
GET Lista de Pokémon
GET Pokémon inexistente
```

## Variables

Las variables evitan repetir la URL base. Por ejemplo:

```text
baseUrl = https://pokeapi.co/api/v2
pokemonId = 25
```

La petición puede escribirse así:

```text
{{baseUrl}}/pokemon/{{pokemonId}}
```

No deben guardarse secretos reales en variables compartidas o archivos versionados. PokéAPI no requiere una clave para las consultas básicas de este módulo.

## Prueba sencilla de respuesta

Postman permite ejecutar comprobaciones después de recibir la respuesta:

```js
pm.test('La respuesta tiene estado 200', () => {
  pm.response.to.have.status(200);
});

pm.test('La respuesta contiene un nombre', () => {
  const pokemon = pm.response.json();
  pm.expect(pokemon.name).to.be.a('string');
});
```

Estas pruebas no sustituyen las pruebas del código de la aplicación, pero ayudan a documentar el contrato esperado del endpoint.

## Postman frente al navegador

Que una petición funcione en Postman confirma que el servidor responde, pero no garantiza que funcione igual desde el navegador. El navegador aplica políticas como CORS y ejecuta además nuestra lógica de JavaScript y renderizado.

Diagnóstico recomendado:

```text
¿Funciona en Postman?
├─ No → revisar URL, método, parámetros o disponibilidad de la API
└─ Sí → revisar Fetch, CORS, transformación de datos y renderizado
```

## Referencias

- [Crear y enviar peticiones — Postman Docs](https://learning.postman.com/docs/use/send-requests/create-requests/request-basics)
- [Trabajar con respuestas — Postman Docs](https://learning.postman.com/docs/use/send-requests/response-data/response-data)
- [Inicio rápido de Postman](https://learning.postman.com/docs/getting-started/quick-start)

