# Módulo CRUD de usuarios

Esta carpeta contiene la documentación inicial y provisional de la sección CRUD. Se revisará al finalizar el módulo para adaptarla al código realmente implementado.

## Objetivos

- Comprender las operaciones `Create`, `Read`, `Update` y `Delete`.
- Consumir una API REST mediante Fetch API.
- Organizar el código por responsabilidades.
- Utilizar modelos, mappers, casos de uso y un store central.
- Crear interfaces mediante DOM, formularios y modales.
- Aplicar conversiones y validaciones básicas.
- Documentar funciones y contratos con JSDoc.

## Documentos

1. [Fundamentos de CRUD y API REST](./01-crud-y-rest.md)
2. [Fundamentos de Clean Architecture](./02-clean-architecture.md)
3. [Patrones de diseño básicos](./03-patrones-diseno.md)
4. [Estructura actual del módulo users](./04-estructura-users.md)

## Estado actual

La estructura implementada hasta este punto contiene:

```text
src/users/
├── mappers/localhost-user.mapper.js
├── models/users.js
├── presentation/
│   ├── render-add-buttons/
│   ├── render-buttons/
│   └── render-table/
├── store/users-store.js
├── use-cases/load-user-by-page.js
└── users-app.js
```

Ya están implementados el modelo `User`, el mapper del backend, la lectura paginada, el store central, la tabla y los controles de navegación.

Siguen pendientes:

- Validar `response.ok` y representar errores o carga en la interfaz.
- Crear, actualizar y eliminar usuarios.
- Implementar el modal y conectar el botón flotante de alta.
- Completar `onUserChanged` y `reloadPage` en el store.
- Añadir los listeners de las acciones `Select` y `Delete` de la tabla.
