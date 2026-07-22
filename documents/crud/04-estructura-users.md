# Estructura inicial del módulo users

> Documento provisional basado en las carpetas existentes antes de implementar sus archivos.

## Árbol actual

```text
src/users/
├── mappers/
├── models/
├── presentation/
├── store/
└── use-cases/
```

## `models`

Responsabilidad prevista:

- Representar un usuario dentro de la aplicación.
- Normalizar valores iniciales.
- Definir propiedades y tipos esperados.
- Mantener reglas propias del modelo, si aparecen.

No debería realizar peticiones HTTP ni manipular el DOM.

## `mappers`

Responsabilidad prevista:

- Convertir el JSON del backend a un modelo interno.
- Convertir el modelo al formato requerido por el backend.
- Normalizar nombres como `first_name` y `firstName`.
- Convertir números y booleanos de forma explícita.

## `use-cases`

Responsabilidad prevista:

- Listar usuarios.
- Obtener un usuario.
- Crear un usuario.
- Actualizar un usuario.
- Eliminar un usuario.

Los casos de uso coordinan acciones, pero no deberían conocer botones o modales concretos.

## `store`

Responsabilidad prevista:

- Mantener la lista actual de usuarios.
- Conservar el usuario seleccionado.
- Representar carga y errores si el diseño final lo necesita.
- Exponer actualizaciones controladas.
- Notificar cambios a la presentación si se implementan suscripciones.

## `presentation`

Responsabilidad prevista:

- Crear la tabla o lista de usuarios.
- Crear botones de acciones.
- Registrar listeners.
- Mostrar formularios y modales.
- Renderizar carga, errores y estado vacío.
- Delegar las operaciones CRUD a los casos de uso.

## Acceso HTTP pendiente

Todavía no existe una carpeta o módulo explícito para las peticiones al backend.

Antes de implementarlo deberá decidirse si:

- Cada caso de uso utiliza una action HTTP pequeña.
- Se crea un repositorio de usuarios.
- Se crea un cliente HTTP compartido.

No es necesario aplicar todas las opciones. Debe elegirse la alternativa más clara para el alcance de la lección.

## Dependencias recomendadas

```text
presentation
    ↓
use-cases
    ↓
models / acceso a datos
    ↓
mappers
```

El store puede ser actualizado por los casos de uso o por un coordinador de aplicación, según el patrón que se adopte durante la lección.

## Convenciones iniciales

- Un archivo debe tener una responsabilidad principal.
- Los nombres deben indicar claramente la operación realizada.
- Las funciones exportadas deben tener JSDoc cuando su contrato no sea evidente.
- Las conversiones deben ser explícitas.
- Las respuestas HTTP deben validarse antes de usarse.
- Los errores no deben ocultarse silenciosamente.
- La presentación no debe conocer el formato completo del backend.

## Posibles nombres de archivos

Estos nombres son orientativos y no obligatorios:

```text
models/user.js
mappers/user.mapper.js
use-cases/load-users.js
use-cases/create-user.js
use-cases/update-user.js
use-cases/delete-user.js
store/user.store.js
presentation/users-app.js
presentation/render-users.js
presentation/user-modal.js
```

La lista se corregirá cuando existan los archivos reales.

