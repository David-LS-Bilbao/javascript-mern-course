# Fundamentos de CRUD y API REST

> Documento provisional. Los endpoints y contratos se adaptarán al backend final.

## Qué significa CRUD

CRUD agrupa las cuatro operaciones básicas realizadas sobre datos persistentes:

| Operación | Significado | Método HTTP habitual |
|---|---|---|
| Create | Crear un recurso | `POST` |
| Read | Consultar recursos | `GET` |
| Update | Actualizar un recurso | `PUT` o `PATCH` |
| Delete | Eliminar un recurso | `DELETE` |

En este módulo, el recurso principal será `users`.

## Endpoints del backend de pruebas

Con `json-server` ejecutándose en el puerto `3001`, los endpoints básicos serán:

```text
GET    http://localhost:3001/users
GET    http://localhost:3001/users/1
POST   http://localhost:3001/users
PUT    http://localhost:3001/users/1
PATCH  http://localhost:3001/users/1
DELETE http://localhost:3001/users/1
```

`json-server` modifica `server/db.json` cuando se crean, actualizan o eliminan recursos.

## Create

Para crear un usuario se envía una petición `POST` con los datos en el cuerpo:

```js
const response = await fetch('http://localhost:3001/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),
});
```

El objeto debe convertirse a JSON porque el cuerpo HTTP se envía como texto.

## Read

Obtener todos los usuarios:

```js
const response = await fetch('http://localhost:3001/users');
const users = await response.json();
```

Obtener uno por ID:

```js
const response = await fetch('http://localhost:3001/users/1');
const user = await response.json();
```

## Update

`PUT` suele representar el reemplazo completo del recurso:

```js
await fetch('http://localhost:3001/users/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(user),
});
```

`PATCH` permite actualizar únicamente algunos campos:

```js
await fetch('http://localhost:3001/users/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ isActive: true }),
});
```

La diferencia exacta depende del contrato implementado por el backend.

## Delete

```js
await fetch('http://localhost:3001/users/1', {
  method: 'DELETE',
});
```

La interfaz debe confirmar una eliminación intencionada antes de enviar la petición.

## Validar la respuesta

Fetch no rechaza automáticamente la promesa por estados HTTP como `404` o `500`.

```js
if (!response.ok) {
  throw new Error(`Error HTTP: ${response.status}`);
}
```

La aplicación debe diferenciar entre:

- Operación correcta.
- Recurso inexistente.
- Datos inválidos.
- Error de red.
- Error del servidor.

## Códigos habituales

| Código | Significado habitual |
|---|---|
| `200` | Consulta o actualización correcta |
| `201` | Recurso creado |
| `204` | Operación correcta sin cuerpo de respuesta |
| `400` | Petición inválida |
| `404` | Recurso no encontrado |
| `500` | Error interno del servidor |

## Conversiones

Los formularios entregan normalmente texto, incluso cuando el dato representa un número o booleano.

```js
const id = Number(formData.get('id'));
const balance = Number(formData.get('balance'));
const isActive = formData.get('isActive') === 'on';
```

Las conversiones deben realizarse de forma explícita y validarse antes de llamar al backend.

## Flujo básico

```text
Evento del usuario
      ↓
Leer y validar datos
      ↓
Ejecutar caso de uso
      ↓
Realizar petición HTTP
      ↓
Validar y transformar respuesta
      ↓
Actualizar store
      ↓
Renderizar el nuevo estado
```

