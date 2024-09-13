import { sequelize } from "../../../config/db/sequelize.config.js";
import { Empleado } from "./Empleado.model.js";

const establecerRelaciones = () => {
  // Empleado - Oficina:
  // Empleado.belongsTo(Oficina); //Un Empleado pertenece a una Oficina
  // Oficina.hasMany(Empleado, { onDelete: 'RESTRICT' });   //Una Oficina tiene varios Empleados, No permite eliminar una oficina si tiene empleados asignados
  // // Oficina - EquipoInformatico:
  // Oficina.hasMany(EquipoInformatico); //Una Oficina tiene varios EquiposInformaticos
  // // Un EquipoInformatico puede pertenecer a una Oficina o a un Empleado (relación exclusiva):
  // EquipoInformatico.belongsTo(Oficina, { foreignKey: 'oficinaId', allowNull: true, unique: true, onDelete: 'RESTRICT' });
  // EquipoInformatico.belongsTo(Empleado, { foreignKey: 'empleadoId', allowNull: true, unique: true, onDelete: 'RESTRICT' });
  // // Oficina - Edificio:
  // Oficina.belongsTo(Edificio, { onDelete: 'RESTRICT' }); //Una Oficina pertenece a un Edificio
  // Edificio.hasMany(Oficina);  //Un Edificio tiene varias Oficinas
  // // Oficina - Dependencias/Suboficinas:
  // Oficina.hasMany(Oficina, { as: 'Dependencias', onDelete: 'RESTRICT' });
  // Oficina.belongsTo(Oficina, { as: 'OficinaPadre' });
  // // Empleado - EquipoInformatico:
  // Empleado.hasMany(EquipoInformatico); //Un Empleado puede tener varios EquiposInformaticos:
  // // EquipoInformatico - RegistroDeMantenimientoDeEquipo:
  // EquipoInformatico.hasMany(RegistroDeMantenimientoDeEquipo);
  // RegistroDeMantenimientoDeEquipo.belongsTo(EquipoInformatico);
  // // Marca - Modelo:
  // Marca.hasMany(Modelo); //Una Marca tiene varios Modelos
  // Modelo.belongsTo(Marca, { onDelete: 'RESTRICT' }); //Un Modelo pertenece a una Marca
}

establecerRelaciones();
export { sequelize };