# Proyecto inventory management
---

## Custom Router*
*Clase para definir un router personalizado en Express.*

## Métodos
### constructor()
-Constructor de la clase que inicializa el router y llama al método init().

### getRouter()
- Devuelve el router configurado.

### init()
- Método de inicialización utilizado para las clases heredadas.

### get/post/put/delete(path, policies, ...callbacks)
- Método para manejar solicitudes GET/POST/PUT/DELETE. Aplica las políticas de acceso y los callbacks especificados.

### handlePolicies(policies)
- Middleware para manejar las políticas de acceso. Verifica si el usuario tiene permisos adecuados o un token válido.

### generateCustomResponses
- Middleware para generar respuestas personalizadas. Define funciones para enviar respuestas de éxito, error interno del servidor, error del cliente, error de autorización no autorizado y error de acceso prohibido.

### #applyCallbacks(callbacks)
- Función interna para procesar todos los callbacks especificados. Envía errores al cliente si ocurren durante la ejecución de los callbacks.

### Ejemplo con politica "PUBLIC"
```javascript
this.get('/:id', ["PUBLIC"], async (req, res) => {
      obtenerEmpleado(req, res);
    });
```
---

## Custom Error
*Clase para definir errores personalizados.*
- se utiliza para definir errores personalizados con un estado, un mensaje y la posibilidad de almacenar un error original que lo desencadenó. 

## Constructor
### constructor(status, message, originalError)
- `status`: Estado HTTP del error.
- `message`: Mensaje de error.
- `originalError`: Error original que desencadenó esta instancia de CustomError.

## Métodos estáticos
### handleSequelizeError(error, reason)
- `error`: Objeto de error que se recibe, generalmente un error de Sequelize.
- `reason`: Razón o descripción del error.

Este método estático se utiliza para manejar errores específicos de Sequelize. Dependiendo del tipo de error, se crea una nueva instancia de `CustomError` con un estado, un mensaje y un error original.

- Si el error es una `SequelizeUniqueConstraintError`, se crea un `CustomError` con estado 500 y el nombre del error como mensaje, y el detalle original del error como error original.
- Si el error no es de tipo `SequelizeUniqueConstraintError`, se crea un `CustomError` con estado 500, la razón recibida como mensaje y el mensaje de error del error original como error original.

---

## Dependencias del proyecto

- **commander** (`^12.0.0`): Para facilitar la creación de interfaces de línea de comandos.
- **cors** (`^2.8.5`): Middleware de Express para habilitar el intercambio de recursos entre diferentes orígenes (CORS) en aplicaciones web.
- **dotenv** (`^16.4.5`): Carga variables de entorno desde un archivo `.env` en aplicaciones Node.js.
- **express** (`^4.19.2`): Un marco web de Node.js minimalista y flexible.
- **express-handlebars** (`^7.1.2`): Motor de plantillas para Express.
- **express-session** (`^1.18.0`): Middleware de Express para manejar sesiones de usuario.
- **http-errors** (`^2.0.0`): Crear objetos de error HTTP para Express.
- **jsonwebtoken** (`^9.0.2`): Implementación de JSON Web Tokens (JWT) para Node.js.
- **nodemailer** (`^6.9.13`): Biblioteca para enviar correos electrónicos desde Node.js.
- **npm** (`^10.7.0`): Administrador de paquetes de Node.js.
- **pg** (`^8.11.5`): Cliente de PostgreSQL para Node.js.
- **reflect-metadata** (`^0.2.2`): Biblioteca para reflejar metadatos en TypeScript.
- **sequelize** (`^6.37.3`): ORM de Node.js para bases de datos SQL.
- **winston** (`^3.13.0`): Registrador de eventos para Node.js.

---

## version
v1.0.1
