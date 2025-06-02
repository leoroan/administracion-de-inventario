## 📝 Índice

- [Indices (en la base de datos)](#indexes)
- [Relaciones entre modelos, utilizando Sequelize](#relations)
___

## relations
# Relaciones entre modelos con Sequelize

Este proyecto define las relaciones entre modelos de base de datos utilizando Sequelize (el ORM para Node.js). Se adopta una arquitectura clara y mantenible, con relaciones bidireccionales y control explícito sobre el comportamiento de las claves foráneas (`foreignKey`) frente a actualizaciones y eliminaciones.

## ¿Por qué usamos `onDelete` y `onUpdate`?

Las opciones `onDelete` y `onUpdate` se utilizan para especificar el comportamiento que debe seguir la base de datos cuando se elimina o actualiza una fila referenciada por una clave foránea. Esto permite garantizar integridad referencial y comportamientos controlados ante modificaciones.

### Opciones disponibles

| Opción       | Descripción                                                                 |
|--------------|-----------------------------------------------------------------------------|
| `CASCADE`    | Si se elimina o actualiza el registro padre, se eliminan/actualizan también los hijos. Ideal para datos dependientes (ej: `Observaciones` de una `Solicitud`). |
| `RESTRICT`   | Impide la eliminación o actualización si hay registros hijos relacionados. Útil para prevenir pérdidas accidentales (ej: una `Normativa` no puede quedar sin `Empresa`). |
| `SET NULL`   | Si se elimina el registro padre, el campo en el hijo se establece en `NULL`. Necesita que `allowNull: true`. Ideal para relaciones opcionales (ej: un contacto puede estar o no asignado a una empresa). |
| `NO ACTION`  | Similar a `RESTRICT`, pero el chequeo lo hace la base de datos y puede postergarse. No se recomienda salvo que sepas exactamente lo que hacés. |

---

## Ejemplos de relaciones en el sistema

### Relaciones con `CASCADE`

Se aplican cuando el modelo hijo **no tiene sentido sin el padre**. Ejemplo:

```js
Solicitud.hasMany(Observacion, {
  as: 'observaciones',
  foreignKey: 'solicitudId',
  onDelete: 'CASCADE',
});
```
___

## indexes
En Sequelize, la opción `indexes` dentro de `super.init()` permite definir **índices en la base de datos** para mejorar el rendimiento de consultas y garantizar restricciones adicionales.  

### ¿Para qué sirven los índices?
1. **Acelerar búsquedas (`WHERE`, `ORDER BY`)**  
   - Evitan recorrer toda la tabla al buscar datos.  
2. **Asegurar unicidad (alternativa a `unique: true`)**  
   - Se puede definir un índice único para varias columnas.  
3. **Optimizar combinaciones de columnas en consultas frecuentes**  
   - Ejemplo: Un índice en (`email`, `status`) mejora búsquedas que usen ambas.  

### Ejemplo de uso en un modelo:
```javascript
export default class Usuario extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true, // Alternativa: definir un índice único en "indexes"
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuarios',
        timestamps: true, 
        paranoid: true,
        indexes: [
          {
            unique: true, // Índice único para evitar duplicados
            fields: ['email'],
          },
          {
            fields: ['status'], // Índice normal para búsquedas rápidas por estado
          },
          {
            fields: ['email', 'status'], // Índice compuesto (email + status)
          },
        ],
      }
    );
  }
}
```

### ¿Cuándo usar índices?
- Si haces muchas búsquedas con `WHERE email = ...`, un índice en `email` ayuda.  
- Si `status` se consulta frecuentemente, un índice en `status` mejora rendimiento.  
- Si consultas con `WHERE email = ... AND status = ...`, un índice combinado acelera aún más.  

📌 **Importante**: No abuses de los índices, ya que pueden ralentizar inserciones/actualizaciones.