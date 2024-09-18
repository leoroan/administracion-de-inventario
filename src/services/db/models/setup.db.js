import { sequelize } from "../../../config/db/sequelize.config.js";
import { Empleado } from "./Empleado.model.js";
import { Session } from "./Session.model.js";
import { Oficina } from "./Oficina.model.js";
import { Edificio } from "./Edificio.model.js";
import { EquipoInformatico } from "./EquipoInformatico.model.js";
import { RegistroDeMantenimientoDeEquipo } from "./RegistroDeMantenimientoDeEquipo.model.js";
import { Marca } from "./Marca.model.js";
import { Modelo } from "./Modelo.model.js";
import { TipoEquipo } from "./tipoEquipo.model.js";

const establecerRelaciones = () => {
  // Empleado - Session
  Empleado.hasOne(Session, { onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: 'empleadoId' });
  Session.belongsTo(Empleado, { foreignKey: 'empleadoId' });

  // Empleado - Oficina
  Empleado.belongsTo(Oficina, { foreignKey: 'oficinaId' }); // Un Empleado pertenece a una Oficina
  Oficina.hasMany(Empleado, { onDelete: 'RESTRICT', onUpdate: 'CASCADE', foreignKey: 'oficinaId' }); // Una Oficina tiene varios Empleados

  // Oficina - EquipoInformatico
  Oficina.hasMany(EquipoInformatico, { onUpdate: 'CASCADE', foreignKey: 'oficinaId' });
  EquipoInformatico.belongsTo(Oficina, { foreignKey: 'oficinaId', allowNull: true, onDelete: 'RESTRICT' });

  // Empleado - EquipoInformatico
  EquipoInformatico.belongsTo(Empleado, { foreignKey: 'empleadoId', allowNull: true, onDelete: 'RESTRICT' });
  Empleado.hasMany(EquipoInformatico, { onUpdate: 'CASCADE', foreignKey: 'empleadoId' });

  // Oficina - Edificio
  Oficina.belongsTo(Edificio, { foreignKey: 'edificioId', onDelete: 'RESTRICT' });
  Edificio.hasMany(Oficina, { onUpdate: 'CASCADE', foreignKey: 'edificioId' });

  // Oficina - Dependencias/Suboficinas
  Oficina.hasMany(Oficina, { as: 'Dependencias', foreignKey: 'oficinaPadreId', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
  Oficina.belongsTo(Oficina, { as: 'OficinaPadre', foreignKey: 'oficinaPadreId' });

  // EquipoInformatico - RegistroDeMantenimientoDeEquipo
  EquipoInformatico.hasMany(RegistroDeMantenimientoDeEquipo, { onUpdate: 'CASCADE', foreignKey: 'equipoId' });
  RegistroDeMantenimientoDeEquipo.belongsTo(EquipoInformatico, { foreignKey: 'equipoId' });

  // Marca - Modelo
  Marca.hasMany(Modelo, { onUpdate: 'CASCADE', foreignKey: 'marcaId' });
  Modelo.belongsTo(Marca, { foreignKey: 'marcaId', onDelete: 'RESTRICT' });

  // Un EquipoInformatico tiene un tipo
  TipoEquipo.hasMany(EquipoInformatico, { onUpdate: 'CASCADE', foreignKey: 'tipoEquipoId' });
  EquipoInformatico.belongsTo(TipoEquipo, { foreignKey: 'tipoEquipoId', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });

  // Un modelo tiene un tipo de equipo
  TipoEquipo.hasMany(Modelo, { foreignKey: 'tipoEquipoId' });
  Modelo.belongsTo(TipoEquipo, { foreignKey: 'tipoEquipoId', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });

  // // Empleado - Session
  // Empleado.hasOne(Session, { onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: 'empleadoId' });
  // Session.belongsTo(Empleado, { foreignKey: 'empleadoId' });
  // // Empleado - Oficina:
  // Empleado.belongsTo(Oficina); //Un Empleado pertenece a una Oficina
  // Oficina.hasMany(Empleado, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' });   //Una Oficina tiene varios Empleados, No permite eliminar una oficina si tiene empleados asignados
  // // Oficina - EquipoInformatico:
  // Oficina.hasMany(EquipoInformatico, { onUpdate: 'CASCADE' }); //Una Oficina tiene varios EquiposInformaticos
  // // Un EquipoInformatico puede pertenecer a una Oficina o a un Empleado (relación exclusiva):
  // EquipoInformatico.belongsTo(Oficina, { foreignKey: 'oficinaId', allowNull: true, onDelete: 'RESTRICT' });
  // EquipoInformatico.belongsTo(Empleado, { foreignKey: 'empleadoId', allowNull: true, onDelete: 'RESTRICT' });
  // // Oficina - Edificio:
  // Oficina.belongsTo(Edificio, { onDelete: 'RESTRICT' }); //Una Oficina pertenece a un Edificio
  // Edificio.hasMany(Oficina, { onUpdate: 'CASCADE' });  //Un Edificio tiene varias Oficinas
  // // Oficina - Dependencias/Suboficinas:
  // Oficina.hasMany(Oficina, { as: 'Dependencias', foreignKey: 'oficinaPadreId', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
  // Oficina.belongsTo(Oficina, { as: 'OficinaPadre', foreignKey: 'oficinaPadreId' });
  // // Empleado - EquipoInformatico:
  // Empleado.hasMany(EquipoInformatico, { onUpdate: 'CASCADE' }); //Un Empleado puede tener varios EquiposInformaticos:
  // // EquipoInformatico - RegistroDeMantenimientoDeEquipo:
  // EquipoInformatico.hasMany(RegistroDeMantenimientoDeEquipo, { onUpdate: 'CASCADE' });
  // RegistroDeMantenimientoDeEquipo.belongsTo(EquipoInformatico);
  // // Marca - Modelo:
  // Marca.hasMany(Modelo, { onUpdate: 'CASCADE' }); //Una Marca tiene varios Modelos
  // Modelo.belongsTo(Marca, { onDelete: 'RESTRICT' }); //Un Modelo pertenece a una Marca
  // // Un EquipoInformatico tiene un tipo:
  // TipoEquipo.hasMany(EquipoInformatico, { onUpdate: 'CASCADE' });
  // EquipoInformatico.belongsTo(TipoEquipo, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
  // // Un modelo tiene un tipo de equipo:
  // TipoEquipo.hasMany(Modelo);
  // Modelo.belongsTo(TipoEquipo, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
}

establecerRelaciones();
export { sequelize };


// CASCADE: Útil cuando quieres que las operaciones de eliminación o actualización en un registro se propaguen automáticamente
// a los registros relacionados.Ejemplo: Al eliminar una oficina, se eliminan automáticamente todos los empleados asociados.

// SET NULL: Adecuado cuando deseas que los registros hijos permanezcan pero con la clave foránea anulada.
// Ejemplo: Si se elimina el empleado que es dueño de un equipo informático, el equipo permanece pero sin dueño.

// RESTRICT: Se usa para impedir la eliminación o actualización del registro padre si hay registros hijos relacionados.
// Ejemplo: Evitar eliminar una oficina si hay empleados que dependen de ella.