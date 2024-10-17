import { sequelize } from "../../../config/db/sequelize.config.js";
import { Empleado } from "./Empleado.model.js";
import { Session } from "./session.model.js";
import { Oficina } from "./oficina.model.js";
import { Edificio } from "./Edificio.model.js";
import { EquipoInformatico } from "./EquipoInformatico.model.js";
import { RegistroDeMantenimientoDeEquipo } from "./registroDeMantenimientoDeEquipo.model.js";
import { Modelo } from "./modelo.model.js";
import { Marca } from "./marca.model.js";
import { TipoEquipo } from "./tipoEquipo.model.js";
import { Rol } from "./rol.model.js";
import { Trazabilidad } from "./trazabilidad.model.js";

import { defineEquipoInformaticoScopes } from "../scopes/equipoInformatico.scope.js";
import { defineEmpleadoScope } from "../scopes/empleado.scope.js";
import { defineOficinaScope } from "../scopes/oficina.scope.js";
import { defineEdificioScope } from "../scopes/edificio.scope.js";
import { defineRegistroDeMantenimientoDeEquipoScope } from "../scopes/registroDeMantenimientoDeEquipo.model.scope.js";
import { defineTrazabilidadScope } from "../scopes/trazabilidad.scope.js";
import { defineTipoEquipoScope } from "../scopes/tipoEquipo.scope.js";

const establecerRelaciones = () => {
  // Empleado - Session
  Empleado.hasOne(Session, { onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: 'empleadoId' });
  Session.belongsTo(Empleado, { as: 'Empleado', foreignKey: 'empleadoId' });

  // Empleado - Oficina
  Empleado.belongsTo(Oficina, { as: 'Oficina', foreignKey: 'oficinaId' }); // Un Empleado pertenece a una Oficina
  Oficina.hasMany(Empleado, { onDelete: 'RESTRICT', onUpdate: 'CASCADE', foreignKey: 'oficinaId' }); // Una Oficina tiene varios Empleados

  // Oficina - EquipoInformatico
  Oficina.hasMany(EquipoInformatico, { onUpdate: 'CASCADE', foreignKey: 'oficinaId' });
  EquipoInformatico.belongsTo(Oficina, { as: 'Oficina', foreignKey: 'oficinaId', allowNull: true, onDelete: 'RESTRICT' });

  // Empleado - EquipoInformatico
  EquipoInformatico.belongsTo(Empleado, { as: 'Empleado', foreignKey: 'empleadoId', allowNull: true, onDelete: 'RESTRICT' });
  Empleado.hasMany(EquipoInformatico, { onUpdate: 'CASCADE', foreignKey: 'empleadoId' });

  // Oficina - Edificio
  Oficina.belongsTo(Edificio, { as: 'Edificio', foreignKey: 'edificioId', onDelete: 'RESTRICT' });
  Edificio.hasMany(Oficina, { onUpdate: 'CASCADE', foreignKey: 'edificioId' });

  // Oficina - Dependencias/Suboficinas
  Oficina.hasMany(Oficina, { as: 'Dependencias', foreignKey: 'oficinaPadreId', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
  Oficina.belongsTo(Oficina, { as: 'OficinaPadre', foreignKey: 'oficinaPadreId' });

  // EquipoInformatico - RegistroDeMantenimientoDeEquipo
  EquipoInformatico.hasMany(RegistroDeMantenimientoDeEquipo, { onUpdate: 'CASCADE', foreignKey: 'equipoId' });
  RegistroDeMantenimientoDeEquipo.belongsTo(EquipoInformatico, { as: 'RegistroDeMantenimientoDeEquipos', foreignKey: 'equipoId' });

  // Marca - Modelo
  Modelo.belongsTo(Marca, { as: 'Marca', foreignKey: 'marcaId', onDelete: 'RESTRICT' });
  Marca.hasMany(Modelo, { onUpdate: 'CASCADE', foreignKey: 'marcaId' });

  // Un EquipoInformatico tiene un tipo
  TipoEquipo.hasMany(EquipoInformatico, { onUpdate: 'CASCADE', foreignKey: 'tipoEquipoId' });
  EquipoInformatico.belongsTo(TipoEquipo, { as: 'TipoEquipo', foreignKey: 'tipoEquipoId', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });

  // Modelo - EquipoInformatico
  EquipoInformatico.belongsTo(Modelo, { as: 'Modelo', foreignKey: 'modeloId', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
  Modelo.hasMany(EquipoInformatico, { foreignKey: 'modeloId', onUpdate: 'CASCADE' });

  // Un modelo tiene un tipo de equipo
  TipoEquipo.hasMany(Modelo, { foreignKey: 'tipoEquipoId' });
  Modelo.belongsTo(TipoEquipo, { as: 'TipoEquipo', foreignKey: 'tipoEquipoId', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });

  // TipoEquipo - Marca
  TipoEquipo.belongsToMany(Marca, { through: 'MarcaTipoEquipo', foreignKey: 'tipoEquipoId', as: 'Marcas', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
  Marca.belongsToMany(TipoEquipo, { through: 'MarcaTipoEquipo', as: 'TiposEquipo', foreignKey: 'marcaId', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });

  // Un empleado tiene un rol
  Empleado.belongsTo(Rol, { as: 'Rol', foreignKey: 'rolId' });
  Rol.hasMany(Empleado, { foreignKey: 'rolId', onUpdate: 'CASCADE' });

  //un equipo tiene una trazabilidad
  EquipoInformatico.hasMany(Trazabilidad, { foreignKey: 'equipoId', onDelete: 'RESTRICT' });
  Trazabilidad.belongsTo(EquipoInformatico, { foreignKey: 'equipoId' });
}

const establecerScopes = () => {
  defineEmpleadoScope();
  defineEquipoInformaticoScopes();
  defineOficinaScope();
  defineEdificioScope();
  defineRegistroDeMantenimientoDeEquipoScope();
  defineTrazabilidadScope();
  defineTipoEquipoScope();

}

establecerRelaciones();
establecerScopes();

export { sequelize };


// CASCADE: Útil cuando quieres que las operaciones de eliminación o actualización en un registro se propaguen automáticamente
// a los registros relacionados.Ejemplo: Al eliminar una oficina, se eliminan automáticamente todos los empleados asociados.

// SET NULL: Adecuado cuando deseas que los registros hijos permanezcan pero con la clave foránea anulada.
// Ejemplo: Si se elimina el empleado que es dueño de un equipo informático, el equipo permanece pero sin dueño.

// RESTRICT: Se usa para impedir la eliminación o actualización del registro padre si hay registros hijos relacionados.
// Ejemplo: Evitar eliminar una oficina si hay empleados que dependen de ella.