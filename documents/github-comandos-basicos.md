# Git y GitHub: comandos básicos

Guía rápida de comandos habituales para trabajar con Git y GitHub desde la terminal.

---

## 1. Comprobar versión de Git

```bash
git --version
```

---

## 2. Configurar usuario de Git

Estos datos aparecerán asociados a tus commits.

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@example.com"
```

Comprobar configuración:

```bash
git config --global --list
```

---

## 3. Crear un repositorio Git en un proyecto local

Entra en la carpeta del proyecto:

```bash
cd ruta/de/tu/proyecto
```

Inicializa Git:

```bash
git init
```

---

## 4. Ver el estado del repositorio

```bash
git status
```

Sirve para ver archivos modificados, archivos nuevos, cambios preparados para commit, rama actual, etc.

---

## 5. Añadir archivos al área de preparación

Añadir todos los archivos:

```bash
git add .
```

Añadir un archivo concreto:

```bash
git add nombre-del-archivo.js
```

Añadir una carpeta concreta:

```bash
git add src/
```

---

## 6. Crear un commit

```bash
git commit -m "Mensaje del commit"
```

Ejemplo:

```bash
git commit -m "Initial commit"
```

---

## 7. Ver historial de commits

Historial completo:

```bash
git log
```

Historial resumido:

```bash
git log --oneline
```

---

## 8. Crear un repositorio en GitHub desde un proyecto local

Primero crea el repositorio vacío en GitHub.

Después, en tu proyecto local:

```bash
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repositorio.git
git push -u origin main
```

Con SSH sería:

```bash
git branch -M main
git remote add origin git@github.com:tu-usuario/tu-repositorio.git
git push -u origin main
```

---

## 9. Ver repositorios remotos configurados

```bash
git remote -v
```

---

## 10. Cambiar la URL del remoto

```bash
git remote set-url origin https://github.com/tu-usuario/tu-repositorio.git
```

O con SSH:

```bash
git remote set-url origin git@github.com:tu-usuario/tu-repositorio.git
```

---

## 11. Subir cambios a GitHub

Después del primer `push -u origin main`, normalmente basta con:

```bash
git push
```

Flujo habitual:

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

---

## 12. Descargar cambios desde GitHub

```bash
git pull
```

Trae los cambios remotos y los integra en tu rama actual.

---

## 13. Clonar un repositorio existente

Con HTTPS:

```bash
git clone https://github.com/usuario/repositorio.git
```

Con SSH:

```bash
git clone git@github.com:usuario/repositorio.git
```

---

## 14. Trabajar con ramas

Ver ramas:

```bash
git branch
```

Ver ramas locales y remotas:

```bash
git branch -a
```

Crear una rama:

```bash
git branch nombre-rama
```

Cambiar a una rama:

```bash
git checkout nombre-rama
```

Crear y cambiar a una rama en un solo paso:

```bash
git checkout -b nombre-rama
```

Forma moderna equivalente:

```bash
git switch -c nombre-rama
```

Cambiar de rama:

```bash
git switch nombre-rama
```

---

## 15. Subir una rama nueva a GitHub

```bash
git push -u origin nombre-rama
```

Después, para siguientes subidas:

```bash
git push
```

---

## 16. Fusionar una rama

Primero cambia a la rama destino, por ejemplo `main`:

```bash
git switch main
```

Fusiona la rama:

```bash
git merge nombre-rama
```

---

## 17. Borrar ramas

Borrar una rama local:

```bash
git branch -d nombre-rama
```

Forzar borrado si Git no deja borrarla:

```bash
git branch -D nombre-rama
```

Borrar una rama remota:

```bash
git push origin --delete nombre-rama
```

---

## 18. Ver diferencias

Ver cambios no preparados:

```bash
git diff
```

Ver cambios ya añadidos con `git add`:

```bash
git diff --staged
```

---

## 19. Deshacer cambios

Descartar cambios de un archivo antes de hacer `git add`:

```bash
git checkout -- archivo.js
```

Forma moderna:

```bash
git restore archivo.js
```

Quitar un archivo del área de preparación, pero mantener los cambios:

```bash
git restore --staged archivo.js
```

---

## 20. Crear un `.gitignore`

Archivo recomendado para proyectos JavaScript, React, Node o Next:

```gitignore
node_modules
.env
.env.local
dist
build
.next
coverage
.DS_Store
```

Si ya habías añadido archivos que ahora quieres ignorar:

```bash
git rm -r --cached .
git add .
git commit -m "Apply gitignore"
```

---

## 21. Flujo básico diario

```bash
git status
git pull
git add .
git commit -m "Descripción del cambio"
git push
```

---

## 22. Flujo para una nueva funcionalidad

```bash
git switch main
git pull
git switch -c feat/nueva-funcionalidad
```

Trabajas en el código y luego:

```bash
git add .
git commit -m "feat: add nueva funcionalidad"
git push -u origin feat/nueva-funcionalidad
```

Después puedes abrir una Pull Request en GitHub.

---

## 23. Comandos útiles de diagnóstico

Ver rama actual y estado resumido:

```bash
git status -sb
```

Ver últimos commits:

```bash
git log --oneline -5
```

Ver archivos modificados:

```bash
git diff --stat
```

Ver configuración de remotos:

```bash
git remote -v
```

---

## 24. Mensajes de commit recomendados

Algunos prefijos habituales:

```txt
feat: nueva funcionalidad
fix: corrección de error
docs: cambios en documentación
style: cambios de formato
refactor: mejora interna sin cambiar comportamiento
test: cambios en tests
chore: tareas de mantenimiento
```

Ejemplos:

```bash
git commit -m "feat: add login form"
git commit -m "fix: correct validation error"
git commit -m "docs: update README"
```

---

## Resumen rápido

Crear repo local y subirlo a GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repositorio.git
git push -u origin main
```

Flujo normal de trabajo:

```bash
git status
git add .
git commit -m "Descripción del cambio"
git push
```
