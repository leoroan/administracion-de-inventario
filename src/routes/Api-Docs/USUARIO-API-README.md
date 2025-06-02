# Documentación técnica para el endpoint `/api/usuarios`:

## Descripción
### 📘 API - Usuarios
Ruta base: `/api/usuarios`
Control de acceso por roles y autenticación JWT vía passport.
Todas las rutas usan controladores, servicios y DAOs (genéricos o no).

### 🔐 Autenticación
Las rutas que modifican datos (POST, PUT, DELETE) requieren token JWT válido.
Se usa passport.authenticate('jwt') como middleware.
Control de roles definido en el router personalizado (e.g., ['ADMIN', 'DIRECTOR']).

## 🛠 **Endpoints**
## `GET` /

**Descripción:**  
Obtiene una lista paginada de los usuarios.

**Acceso:**  
[ADMIN], [ADMINISTRATIVO], [DIRECTOR]

**Parámetros de consulta (query params) soportados:**
- `page`: Número de página (opcional, por defecto 1).
- `limit`: Cantidad de resultados por página (opcional, por defecto 10).
- `scope`: Scope de Sequelize a utilizar para la consulta.
          -`defaultScope` (por defecto)
          -`loginScope`
- Búsquedas avanzadas:
  - `<campo>__eq`: Filtra por igualdad exacta.
  - `<campo>__like`: Filtra usando `LIKE`.
  - `<campo>__null`: Filtra campos nulos (`true`) o no nulos (`false`).
  - `<campo>`: Si no se especifica sufijo, filtra usando `LIKE`.

**Respuesta:**
- `200 OK` con un array paginado de USUARIOS.

**Nota**
- Si no se pasa `page`, `limit` o `scope`, se usan los valores por defecto (`page=1`, `limit=10`, `scope=defaultScope`).
- Los filtros se aplican de forma combinada en la cláusula WHERE.

**Ejemplo de request:**
```http
GET /?page=2&limit=5&nombre__like=unUsuario o nombre=unUsuario

```
___

## `GET` /:id

**Descripción:**  
Obtiene un USUARIO por su ID.

**Acceso:**  
[ADMIN], [ADMINISTRATIVO], [DIRECTOR]

### Parámetros de ruta:
- `id`: ID del USUARIO a consultar (obligatorio).

### Respuesta:
- `200 OK` con el objeto del USUARIO.

---

## `POST` /

**Descripción:**  
Crea un nuevo USUARIO.

**Acceso:**  
[ADMIN], [ADMINISTRATIVO], [DIRECTOR]

**Autenticación:**  
Token JWT obligatorio.

### Body:
```json
{
  "nombre": "STRING(100)" /requerido,
  "apellido": "STRING(100)" /requerido,
  "username": "STRING(50)" /requerido - unico,
  "password": "STRING" /requerido,
  "email": "STRING" /opcional - unico,
  "dni": "STRING" /opcional - unico,
  "rolId": "INT" /opcional - ADMINISTRATIVO por defecto
}
```

*Respuesta exitosa:*
```json
{
  "status": "success",
  "message": "Nuevo registro creado con el ID:123"
}
```

___

## `PUT` /:id

**Descripción:**  
Actualiza un USUARIO.

**Acceso:**  
[ADMIN], [ADMINISTRATIVO], [DIRECTOR]

**Autenticación:**  
Token JWT obligatorio.

**Parámetros de la ruta:**
- `id` ID del USUARIO a actualizar (obligatorio).  

___

## `DELETE` /:id

**Descripción:**  
Elimina un USUARIO existente.

**Acceso:**  
[ADMIN], [ADMINISTRATIVO], [DIRECTOR]

**Autenticación:**  
Token JWT obligatorio.

**Parámetros de la ruta:**
- `id` ID del USUARIO a eliminar (obligatorio).  

___

### ⚠️ **Errores posibles**
- 400 BadRequest: el cliente envió una petición inválida o incompleta
- 401 Unauthorized: token inválido o ausente
- 403 Forbidden: rol insuficiente
- 404 NotFound: ruta inexistente al crear un usuario
- 409 Duplicate entry: Ya existe alguno de los campos con clave UNICA
- 500 Internal Server Error: error inesperado del servidor

---