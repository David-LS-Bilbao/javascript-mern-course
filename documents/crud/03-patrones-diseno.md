# Patrones de diseño básicos

> Documento provisional. Solo se aplicarán patrones que resulten útiles para el código final.

## Qué es un patrón de diseño

Un patrón es una solución reutilizable para un problema frecuente de organización o comunicación entre componentes. No es una librería ni una regla obligatoria.

## Module Pattern mediante ES Modules

Cada archivo puede exponer únicamente su API pública:

```js
const privateState = [];

export const getItems = () => [...privateState];
```

Esto permite ocultar detalles internos y evitar variables globales.

Posibles usos:

- Estado interno del store.
- URL base privada.
- Funciones auxiliares no exportadas.

## Mapper

Un mapper transforma datos entre dos representaciones.

El backend actual utiliza nombres como `first_name`, mientras que el modelo puede utilizar `firstName`:

```js
export const userToModel = (data) => ({
  id: Number(data.id),
  firstName: data.first_name,
  lastName: data.last_name,
  isActive: Boolean(data.isActive),
  balance: Number(data.balance),
});
```

También puede existir una transformación inversa para enviar datos al backend.

Ventajas:

- Aísla el formato externo.
- Centraliza conversiones.
- Evita repetir transformaciones en la presentación.

## Store central

El store conserva el estado compartido de la aplicación:

```js
const state = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
};
```

Su API puede ofrecer operaciones controladas:

```js
export const getState = () => structuredClone(state);
export const setUsers = (users) => { /* ... */ };
```

No conviene permitir que cualquier módulo modifique libremente el objeto interno.

## Observer o suscripción

Cuando cambia el store, la presentación puede necesitar renderizarse de nuevo.

```js
const listeners = new Set();

export const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
```

Este patrón desacopla el almacenamiento del estado de su representación visual.

Para una aplicación pequeña puede bastar con llamar explícitamente a `render()` después de cada actualización. No es obligatorio implementar suscripciones si añaden complejidad innecesaria.

## Caso de uso

Cada operación de la aplicación se expresa mediante una función concreta:

```js
export const deleteUser = async (id) => {
  await deleteUserRequest(id);
  removeUserFromStore(id);
};
```

El caso de uso coordina la infraestructura y el store sin manipular directamente el DOM.

## Repository

Un repositorio define una interfaz de acceso a datos:

```js
const userRepository = {
  findAll,
  findById,
  create,
  update,
  remove,
};
```

Puede ocultar si los datos vienen de Fetch API, memoria u otra fuente. Esta capa todavía no está identificada en la estructura actual y solo se añadirá si aporta claridad.

## Factory para elementos

Una función factory puede centralizar la creación de elementos repetidos:

```js
export const createButton = (text, className) => {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = className;
  return button;
};
```

Es útil cuando varios componentes necesitan la misma configuración.

## Modal como componente

Un modal puede encapsular:

- Creación o selección de elementos.
- Apertura y cierre.
- Lectura del formulario.
- Limpieza de valores.
- Confirmación o cancelación.
- Gestión básica del foco y teclado.

La lógica de guardar o eliminar debería delegarse a un caso de uso.

## Elegir patrones con intención

Antes de aplicar un patrón conviene preguntar:

- ¿Qué problema concreto resuelve?
- ¿Reduce duplicación o acoplamiento?
- ¿Hace el código más fácil de entender?
- ¿Es proporcional al tamaño del proyecto?

Un patrón innecesario puede dificultar más el código de lo que ayuda.

