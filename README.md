# WebVTV-BackEnd

### Libererias agregadas:
 - [http-errors](https://www.npmjs.com/package/http-errors) 
 - [sqids](https://sqids.org/javascript) 


# Especificaciones del Proyecto: Nueva Página Web de soporte-mintrp

---

## Funcionalidades Clave

### Gestión de Usuarios
- Registro y autenticación de usuarios.
- Roles diferenciados: Administrador y Usuario.
- Sistema de autorización basado en roles.

### Gestión de Quejas y Reclamos
- Recepción de quejas y reclamos.
- Envío de confirmación por correo electrónico (NodeMailer).
- Actualización y gestión del estado de las quejas/reclamos.

### Gestión de Contenido Dinámico
- FAQs administradas desde la base de datos, actualizables por los administradores o usuarios.
- Manejo de precios de la VTV desde la base de datos, actualizables por los administradores o usuarios.

---

## Infraestructura y Configuración

### Docker
*(Pendiente de implementación)*  
Contenerización de la aplicación para facilitar el despliegue y la gestión en diferentes entornos.

### API Documentation
*(Pendiente de implementación)*  
Documentación de las rutas y endpoints de la API utilizando herramientas como Swagger o Postman.

### Seguridad
*(Pendiente de implementación)*  
Implementar prácticas de seguridad para proteger la aplicación:
- Validación de datos.
- Cifrado de contraseñas.
- Protección contra inyecciones SQL.

---

## Configuración de Variables de Entorno

### ejemplo de ".env"
```
# Configuración estado de la aplicación
ENV_MODE=DESARROLLO

# Configuración del superusuario general
ADMIN_USER=
ADMIN_PASS=
ADMIN_EMAIL=

# Configuración de la base de datos
BDD_MODE=CPU-MINISTERIO
DB_DATABASE=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_DIALECT=
DB_ERASE=
DB_ALTER=

# Configuración del servidor express
PORT=

# Configuración de JWT
JWT_PRIVATE_KEY=
SESSION_COOKIE_VTO=
JWT_EXPIRES_IN=

# configuracion para el front
MAILING_BASE_URL=
FRONTEND_ORIGIN=

# configuracion del nombre del sitio
EMPRESA_NOMBRE=

# configuracion de la api del microservicio de mensajeria
URL_SERV_MAIL='http://localhost:7071'
```
---

## 🔄 Carga dinámica de servicios y rutas

Con el objetivo de reducir conflictos entre ramas y mejorar la escalabilidad del proyecto, se implementaron dos mejoras clave:

### ✅ 1. `servicesLoader.js` dinámico

Ya no es necesario editar manualmente el archivo `servicesLoader.js` cada vez que se agrega un nuevo DAO o Service.  
El sistema ahora:

- Escanea automáticamente todos los archivos en `/layers/daos` y `/layers/services`.
- Empareja los DAOs con sus Services por convención (ej. `usuario.dao.js` y `usuario.service.js`).
- Inyecta automáticamente el modelo de Sequelize correspondiente.
- Exporta una instancia lista del service (ej: `usuarioService`).

> 📦 Solo tenés que crear tus archivos DAO y Service, ¡y listo!

---

### 🚀 2. Rutas Express autoconfiguradas

Tampoco hace falta registrar las rutas manualmente en `express.config.js`.  
Ahora:

- El sistema escanea todos los archivos `*.router.js` dentro de `/routes`.
- Crea las rutas automáticamente en base al nombre del archivo (ej: `usuario.router.js` → `/api/usuarios`).
- Instancia cada router y lo monta con `app.use(...)`.

> 🔧 Cada uno solo créa su archivo `*.router.js`, y ya está disponible.

---

## Dependencias Principales
*(Pendiente de implementación)*  
Lista de las dependencias esenciales del proyecto (Express, Sequelize, NodeMailer, etc.).

---

## Licencia
Este proyecto está bajo la **TBA**. Consulta el archivo `LICENSE` para más detalles.

---

## Autores
Desarrollado por **Devs @ 2025**  
**Ministerio de Transporte, Provincia de Buenos Aires**

---

## Versión
**TBA**
