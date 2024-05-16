import { sequelize } from "../../../config/db/sequelize.config.js";

import { Empleado } from "./Empleado.model.js";
import { EquipoInformatico } from "./EquipoInformatico.model.js";
import { Lugar } from "./Lugar.model.js";
import { Oficina } from "./Oficina.model.js";
import { MantenimientoDeEquipo } from "./MantenimientoDeEquipo.model.js";

const establecerRelaciones = () => {
  Empleado.belongsTo(Oficina); // Cada Empleado pertenece a una Oficina
  Empleado.hasMany(EquipoInformatico); // Un empleado puede tener cero o varios equipos informáticos
  Empleado.hasMany(MantenimientoDeEquipo); // cada Empleado puede tener varios MantenimientoDeEquipo
  Lugar.hasMany(Oficina); 
  EquipoInformatico.belongsTo(Empleado, { unique: true }); // un equipo informático pertenece a un empleado
  EquipoInformatico.belongsToMany(Oficina, { through: 'EquipoOficina' }); // un equipo informático puede estar relacionado con una o varias oficinas
  EquipoInformatico.hasMany(MantenimientoDeEquipo); // Un equipo puede tener muchos registros de mantenimiento
  // MantenimientoDeEquipo.belongsTo(EquipoInformatico); // Cada registro de mantenimiento pertenece a un equipo
  MantenimientoDeEquipo.belongsTo(Empleado); // cada MantenimientoDeEquipo pertenece a un único Empleado
  Oficina.belongsTo(Lugar); // Una oficina pertenece a un lugar (calle 6, calle 3, Juzgado de La Plata...)
  Oficina.hasMany(Empleado); // Una oficina puede tener varios empleados.
  Oficina.belongsToMany(Oficina, { as: 'Dependencias', through: 'OficinaDependencia' }); // Una oficina puede estar relacionada con una o varias oficinas
  Oficina.belongsToMany(EquipoInformatico, { through: 'EquipoOficinaRelacion' }); // Una oficina puede tener varios equipos informáticos
}

establecerRelaciones();
export { sequelize };