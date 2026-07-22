# Fundamentos de Clean Architecture

> Documento provisional. La arquitectura final dependerá de las dependencias que realmente tenga el módulo.

## Objetivo

Clean Architecture busca separar el código según sus responsabilidades. La lógica principal de la aplicación no debería depender directamente del DOM, de Fetch API o de una herramienta concreta de backend.

La idea central es:

```text
Las capas externas pueden depender de las internas.
Las capas internas no deberían depender de detalles externos.
```

## Capas simplificadas

### Dominio

Contiene los conceptos principales del negocio:

- Modelo `User`.
- Reglas y conversiones esenciales del usuario.
- Datos que representan una entidad válida.

No debería conocer botones, modales ni URLs.

### Aplicación

Contiene los casos de uso:

- Obtener usuarios.
- Crear un usuario.
- Actualizar un usuario.
- Eliminar un usuario.

Un caso de uso expresa una intención de la aplicación y coordina las operaciones necesarias.

### Infraestructura

Contiene detalles externos:

- Peticiones con `fetch`.
- URL del backend.
- Formato JSON recibido.
- Persistencia proporcionada por `json-server`.

La estructura actual todavía no tiene una carpeta explícita para esta responsabilidad. Se decidirá cuando se implemente el acceso HTTP.

### Presentación

Se ocupa de la interacción con el usuario:

- Crear elementos del DOM.
- Registrar listeners.
- Abrir y cerrar modales.
- Leer formularios.
- Mostrar estados de carga y error.
- Renderizar el estado almacenado.

## Regla de dependencias

Ejemplo de dependencia deseada:

```text
presentation
    ↓
use-cases
    ↓
models
```

Los datos externos pueden pasar por un mapper antes de convertirse en modelos:

```text
Respuesta de la API
       ↓
mapper
       ↓
modelo User
```

## Separar responsabilidades

Una función de presentación no debería contener toda la petición:

```js
// Mezcla DOM, red y transformación.
button.addEventListener('click', async () => {
  const response = await fetch(url);
  const data = await response.json();
  table.innerHTML = data.map(/* ... */);
});
```

Una separación más clara sería:

```text
listener → caso de uso → acceso HTTP → mapper → store → render
```

## Dependencia frente a dirección de datos

La dirección en la que viajan los datos no siempre coincide con la dirección de las dependencias.

Los datos pueden venir desde el backend hacia la presentación, pero el dominio no necesita importar la presentación.

## Ventajas

- Archivos con responsabilidades más claras.
- Menor acoplamiento con el backend o el DOM.
- Funciones más pequeñas y fáciles de probar.
- Reutilización de casos de uso.
- Cambios localizados cuando varía el formato de la API.

## Riesgo de sobrearquitectura

Clean Architecture no significa crear muchas carpetas sin necesidad. Cada capa debe resolver un problema real.

Para este proyecto didáctico se aplicará una versión sencilla:

- Un modelo claro.
- Un mapper para datos externos.
- Casos de uso CRUD.
- Un store central.
- Presentación separada.
- Una ubicación definida para el acceso HTTP.

## Preguntas para revisar al final

- ¿Cada archivo tiene una responsabilidad principal?
- ¿El modelo conoce el DOM o Fetch API?
- ¿La presentación transforma respuestas externas directamente?
- ¿Los casos de uso pueden ejecutarse sin conocer elementos HTML?
- ¿Las URLs están centralizadas?
- ¿Los errores llegan a la capa que puede mostrarlos correctamente?

