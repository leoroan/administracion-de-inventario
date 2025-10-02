# 🔐 Sistema de Autorización (Permisos Directos)

Este proyecto implementa un **sistema de autorización basado exclusivamente en permisos asignados directamente a usuarios**, eliminando la dependencia de roles para la autorización. Los roles se mantienen solo como identificadores organizativos, mientras que **todos los permisos se gestionan mediante asignaciones directas a usuarios**.

La autenticación se maneja con **Passport + JWT**, y la autorización con un **middleware de políticas optimizado** que consulta permisos específicos por recurso.

---

## 🏗️ Arquitectura Actualizada (Simplificada)

### Relaciones en la base de datos

* **Usuario → Rol**  
  Cada usuario tiene un rol principal, pero **este rol NO otorga permisos**:
  ```js
  Usuario.belongsTo(Rol, { as: 'rolPrincipal', foreignKey: 'rolId' });
  ```

* **Usuario → Permiso**  
  Los permisos se asignan **directamente a usuarios** mediante `UsuarioPermiso`:
  ```js
  Usuario.belongsToMany(Permiso, { 
    through: 'UsuarioPermiso',
    as: 'permisos',
    foreignKey: 'usuarioId' 
  });
  ```

📌 **Cambios clave respecto a la versión anterior**:
- ❌ Eliminada la relación `Rol → Permiso` (ya no hay permisos heredados de roles)
- ✅ Los roles (ej: `ADMIN`, `DIRECTOR`) se manejan como **permisos directos** (ej: permiso con `accion = "ADMIN"`)
- ✅ Solo se consultan permisos relevantes para cada recurso (optimización)

---

## 🔑 Autenticación

La estrategia `login` con **Passport Local** ahora **NO incluye permisos en el token**:

```js
passport.use('login', new localStrategy({ ... }, async (req, username, password, done) => {
  // ...
  const userDTO = {
    id: user.id,
    username: user.username,
    email: user.email,
    rol: user.rolPrincipal.nombre, // Solo para info, NO para autorización
    bloqueado: user.bloqueado
  };
  done(null, userDTO);
}));
```

### JWT resultante
```json
{
  "id": 123,
  "username": "admin",
  "email": "admin@company.com",
  "rol": "Administrador", // Solo para mostrar
  "bloqueado": false,
  "iat": 1717023456
}
```

👉 **Importante**:  
El token **NO contiene permisos**. Estos se consultan en cada solicitud para evitar inconsistencias.

---

## 🛡️ Autorización (Nuevo Flujo)

El middleware `handlePolicies` implementa un enfoque **eficiente por recurso**:

```js
handlePolicies = (policies) => async (req, res, next) => {
  // 1. Validar token JWT
  const token = req.cookies?.jwtCookieToken || req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, PRIVATE_KEY);

  // 2. Determinar recurso desde URL (ej: /api/usuarios → "usuario")
  const recurso = req.baseUrl.split('/')[2].replace(/s$/, '');

  // 3. Consultar SOLO permisos relevantes para este recurso
  const user = await Usuario.findByPk(decoded.user.id, {
    include: [{
      association: "permisos",
      where: { accion: { [Op.like]: `${recurso}.%` } } // ¡Solo permisos del recurso!
    }]
  });

  // 4. Verificar políticas
  const permisosUsuario = user.permisos.map(p => p.accion);
  const autorizado = policies.some(p => permisosUsuario.includes(p));
  
  if (!autorizado) throw new Forbidden("Acceso denegado");
  next();
};
```

### Características clave:
- **Consulta optimizada**: Solo carga permisos relevantes para el recurso actual
- **Sin carga de rol**: Los roles no se usan para autorización
- **Flexibilidad**: Permite mezclar permisos de recurso y roles como permisos
- **Eficiencia**: Evita consultas innecesarias a la base de datos

---

## 📌 Uso en Endpoints

### Ejemplos reales
```js
// Solo usuarios con permiso "usuario.read" pueden acceder
this.get('/', ['usuario.read'], passport.authenticate('jwt'), ...);

// Permisos específicos del recurso (ej: /api/productos)
this.post('/', ['producto.create'], passport.authenticate('jwt'), ...);
```

### Cómo definir políticas:
| Política          | Significado                                                                 |
|------------------|-----------------------------------------------------------------------------|
| `['usuario.read']` | Requiere permiso directo con `accion = "usuario.read"`                     |

---

## 🚀 Flujo Completo

1. **Login**:  
   Passport emite JWT **sin permisos** (solo datos básicos).

2. **Solicitud a endpoint**:  
   Se envía el JWT en `Authorization` o cookie.

3. **Middleware de autorización**:  
   - Valida el JWT
   - Determina recurso desde URL (ej: `usuarios` → `usuario`)
   - Consulta **solo permisos relevantes** para ese recurso
   - Verifica si el usuario tiene al menos uno de los permisos requeridos

4. **Controller**:  
   Ejecuta la lógica solo si pasó la validación.

---

## ⚠️ Notas Críticas

1. **Los roles NO otorgan permisos**:  
   Para que un usuario tenga acceso como "ADMIN", **debe tener asignado el permiso directo** con `accion = "ADMIN"`.

2. **Nunca almacenes permisos en el token**:  
   El token **solo contiene datos básicos**. Los permisos siempre se consultan en tiempo real.

3. **Convención de permisos**:  
   - Permisos de recurso: `recurso.accion` (ej: `producto.create`)

4. **Optimización clave**:  
   Se asegura que solo se carguen permisos relevantes para la operación actual.

---

## 🛠️ Cómo Asignar Permisos

### Ejemplo para un usuario con acceso a usuarios:
1. Crear permisos:  
   `usuario.read`, `usuario.create`, etc.
2. Asignar al usuario (no al rol)
3. En endpoints usar: `['usuario.read']`, etc.
