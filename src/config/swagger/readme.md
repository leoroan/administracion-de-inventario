# Guía de Documentación de APIs con Swagger-Autogen (Swagger 2.0)

## Tabla de Contenidos
1. [Introducción](#introducción)
2. [Instalación](#instalación)
3. [Configuración Básica](#configuración-básica)
4. [Estructura de Documentación](#estructura-de-documentación)
5. [Documentación de Rutas](#documentación-de-rutas)
6. [Comentarios Especiales para Swagger](#comentarios-especiales-para-swagger)
7. [Ejemplos Prácticos](#ejemplos-prácticos)
8. [Consideraciones Importantes](#consideraciones-importantes)
9. [Flujo de Trabajo Recomendado](#flujo-de-trabajo-recomendado)

## Introducción

Swagger-Autogen es un módulo de Node.js que permite la construcción automática de documentación Swagger para APIs RESTful. En nuestro proyecto **TRANSP-PASAJEROS-DOC-API**, utilizamos esta herramienta para generar documentación completa y precisa de nuestras APIs, siguiendo el estándar Swagger 2.0.

### Características principales:
- Identificación automática de endpoints (get, post, put, delete, etc.)
- Captura de rutas, parámetros en path, query, headers y body
- Reconocimiento automático de códigos de estado de respuesta
- Soporte para documentación mediante comentarios en código
- Generación de archivo JSON compatible con Swagger UI

## Instalación

Swagger-Autogen se instala como dependencia de desarrollo en tu proyecto:

```bash
# npm
npm install --save-dev swagger-autogen
```

Para actualizar a la última versión:

```bash
# npm
npm install --save-dev swagger-autogen@latest
```

## Configuración Básica

Nuestra configuración principal se encuentra en el archivo `swagger-config.js` (o similar) en la raíz del proyecto:

```javascript
import swaggerAutogen from 'swagger-autogen';

const options = {
  openapi: null,     // Habilita/deshabilita OpenAPI (Swagger 2.0 en nuestro caso)
  language: 'en-US', // Idioma de la documentación (No hay en español)
  disableLogs: false, // Muestra logs durante la generación
  autoHeaders: true,  // Reconocimiento automático de headers
  autoQuery: true,    // Reconocimiento automático de query parameters
  autoBody: true,     // Reconocimiento automático del body
  writeOutputFile: true // Escribe el archivo de salida
};

const doc = {
  info: {
    version: '1.0.0',
    title: 'TRANSP-PASAJEROS-DOC-API',
    description: 'API documentation for the passenger transport system.'
  },
  host: process.env.ENV_MODE === 'PRODUCCION' ? 'api.transp-pasajeros.com' : 'localhost:8081',
  basePath: '/api',
  schemes: [process.env.ENV_MODE === 'PRODUCCION' ? 'https' : 'http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Pega tu JWT aquí con el formato: Bearer <token>'
    },
  },
  definitions: {}
};

const outputFile = './swagger-output.json';
const routes = [
  '../../rutas/some.ruter.js'
];

swaggerAutogen(options)(outputFile, routes, doc).then(async () => {
  await import('../../app.js');
});
```

### Parámetros Importantes:

| Parámetro | Descripción | Valor Recomendado |
|-----------|-------------|-------------------|
| `openapi` | Define si usar OpenAPI 3.0 o Swagger 2.0 | `null` para Swagger 2.0 |
| `autoHeaders` | Reconocimiento automático de headers | `true` |
| `autoQuery` | Reconocimiento automático de query params | `true` |
| `autoBody` | Reconocimiento automático del body | `true` |
| `securityDefinitions` | Configuración de seguridad (Bearer Auth) | Requerido para nuestro proyecto |

## Estructura de Documentación

La documentación sigue la estructura estándar de Swagger 2.0:

1. **Información General**: Título, versión, descripción
2. **Servidor**: Host, basePath, schemes (http/https)
3. **Seguridad**: Configuración de autenticación Bearer
4. **Rutas**: Endpoints organizados por tags
5. **Definiciones**: Esquemas de objetos reutilizables

## Documentación de Rutas

Todas nuestras APIs requieren autenticación Bearer, por lo que **cada endpoint debe incluir la configuración de seguridad**.

### Estructura Básica de un Endpoint:

```javascript
this.get('/:id', ['permiso.necesario'], passport.authenticate('jwt'), async (req, res, next) => {
  // Comentarios de Swagger
  this.controlador.findById(req, res, next);
});
```

## Comentarios Especiales para Swagger

Utilizamos comentarios especiales dentro del código para definir la documentación. Estos comentarios **deben colocarse justo antes de la llamada al controlador**.

### Comentarios Esenciales:

```javascript
// #swagger.tags = ['Nombre del Tag']
// #swagger.path = '/ruta/{parametro}' 
// #swagger.summary = 'Resumen corto de la operación'
// #swagger.description = 'Descripción detallada de lo que hace el endpoint'
/* 
  #swagger.security = [{
      "bearerAuth": []
  }] 
*/
```

### Parámetros:

```javascript
/* #swagger.parameters['nombre'] = { 
    in: 'path|query|header|body',
    description: 'Descripción del parámetro',
    required: true|false,
    type: 'string|integer|boolean|...'
} */
```

### Ejemplo Completo:

```javascript
this.get('/:id', ['usuario.read'], passport.authenticate('jwt'), async (req, res, next) => {
  // #swagger.tags = ['Usuarios']
  // #swagger.path = '/usuarios/{id}' 
  // #swagger.summary = 'Obtiene un usuario por ID'
  // #swagger.description = 'Obtiene los detalles de un usuario específico por su ID.'
  /* #swagger.parameters['id'] = { 
      in: 'path',
      description: 'ID del usuario a obtener',
      required: true,
      type: 'string'
    } */
  /* #swagger.parameters['scope'] = { 
      in: 'query',
      description: 'Scope para ver diferentes vistas del usuario',
      required: false,
      type: 'string',
      enum: ['defaultScope', 'configScope']
    } */
  /* 
    #swagger.security = [{
        "bearerAuth": []
    }] 
  */
  this.usuarioController.findById(req, res, next);
});
```

### Opciones Avanzadas:

- **Ignorar endpoint**: `// #swagger.ignore = true`
- **Deshabilitar reconocimiento automático**:
  ```javascript
  // #swagger.autoBody = false
  // #swagger.autoQuery = false
  // #swagger.autoHeaders = false
  ```

## Ejemplos Prácticos

### 1. GET con parámetros de ruta y query

```javascript
this.get('/:id', ['usuario.read'], passport.authenticate('jwt'), async (req, res, next) => {
  // #swagger.tags = ['Usuarios']
  // #swagger.path = '/usuarios/{id}' 
  // #swagger.summary = 'Obtiene un usuario por ID'
  // #swagger.description = 'Obtiene los detalles de un usuario específico por su ID.'
  /* #swagger.parameters['id'] = { 
      in: 'path',
      description: 'ID del usuario a obtener',
      required: true,
      type: 'string'
    } */
  /* #swagger.parameters['scope'] = { 
      in: 'query',
      description: 'Scope para ver diferentes vistas del usuario',
      required: false,
      type: 'string',
      enum: ['defaultScope', 'configScope']
    } */
  /* 
    #swagger.security = [{
        "bearerAuth": []
    }] 
  */
  this.usuarioController.findById(req, res, next);
});
```

### 2. POST con cuerpo definido

```javascript
this.post('/login', ['public'], async (req, res, next) => {
  // #swagger.tags = ['Sesión']
  // #swagger.path = '/usuarios/login' 
  // #swagger.summary = 'Inicia sesión de usuario'
  // #swagger.description = 'Permite a un usuario autenticarse y obtener un token JWT'
  /* #swagger.parameters['credenciales'] = {
      in: 'body',
      description: 'Credenciales de autenticación',
      required: true,
      schema: { $ref: '#/definitions/Credenciales' }
  } */
  /* 
    #swagger.responses[200] = {
      description: 'Autenticación exitosa',
      schema: { $ref: '#/definitions/TokenResponse' }
  } */
  this.usuarioController.login(req, res, next);
});
```

### 3. Endpoint que requiere autenticación pero sin parámetros adicionales

```javascript
this.get('/perfil', ['usuario.read'], passport.authenticate('jwt'), async (req, res, next) => {
  // #swagger.tags = ['Usuarios']
  // #swagger.path = '/usuarios/perfil' 
  // #swagger.summary = 'Obtiene el perfil del usuario autenticado'
  // #swagger.description = 'Devuelve los datos del usuario actualmente autenticado'
  /* 
    #swagger.security = [{
        "bearerAuth": []
    }] 
  */
  this.usuarioController.getProfile(req, res, next);
});
```

## Consideraciones Importantes

1. **Autenticación Bearer**: Todos los endpoints (excepto los públicos) deben incluir:
   ```javascript
   /* 
     #swagger.security = [{
         "bearerAuth": []
     }] 
   */
   ```

2. **Tags**: Organiza tus endpoints en tags lógicos (Usuarios, Sesión, Logs, etc.)

3. **Parámetros obligatorios**: Siempre especifica `required: true` para parámetros esenciales

4. **Tipos de datos**: Usa tipos correctos (string, integer, boolean, etc.)

5. **Ignorar endpoints**: Para endpoints internos o de prueba:
   ```javascript
   // #swagger.ignore = true
   ```

6. **Entornos**: La configuración del host y scheme cambia según el entorno:
   ```javascript
   host: process.env.ENV_MODE === 'PRODUCCION' ? 'api.transp-pasajeros.com' : 'localhost:8081',
   schemes: [process.env.ENV_MODE === 'PRODUCCION' ? 'https' : 'http']
   ```

## Flujo de Trabajo Recomendado

1. **Crear el endpoint** en el router con la lógica básica
2. **Agregar comentarios de Swagger** antes de llamar al controlador
3. **Especificar todos los parámetros** necesarios (path, query, body)
4. **Incluir configuración de seguridad** para endpoints protegidos
5. **Generar documentación** ejecutando el script de configuración
6. **Verificar** en Swagger UI que la documentación se vea correctamente
7. **Actualizar** la documentación cada vez que se modifique el endpoint

### Comando para generar documentación:
```bash
node swagger-config.js //config. por defecto
npm run swagger // actual
```

### Acceder a Swagger UI:
Después de iniciar tu aplicación, accede a:
```
http://localhost:8081/api-docs // o donde esté hosteado al momento de realizar la prueba 
```

## Recursos Adicionales

- [Documentación Oficial de Swagger-Autogen](https://swagger-autogen.github.io/docs)
- [Especificación Swagger 2.0](https://swagger.io/specification/v2/)
- [Guía de Referencia de Swagger Annotations](https://swagger.io/docs/specification/2-0/basic-structure/)

> **Nota Importante**: La documentación debe mantenerse siempre sincronizada con el código. Un endpoint documentado incorrectamente es peor que no tener documentación. ¡Siempre verifica que tu documentación refleje exactamente el comportamiento actual de la API!