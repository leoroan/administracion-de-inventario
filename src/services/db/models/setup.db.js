import { sequelize } from "../../../config/db/sequelize.config.js";

import { Empleado } from "./Empleado.model.js";
import { EquipoInformatico } from "./EquipoInformatico.model.js";
import { Lugar } from "./Lugar.model.js";
import { Oficina } from "./Oficina.model.js";
import { TipoEquipo } from "./TipoEquipo.model.js";
import { MarcaEquipo } from "./MarcaEquipo.model.js";
import { ModeloEquipo } from "./ModeloEquipo.model.js";
import { MantenimientoDeEquipo } from "./MantenimientoDeEquipo.model.js";

const establecerRelaciones = () => {
  Empleado.belongsTo(Oficina); //Cada Empleado pertenece a una Oficina
  Empleado.hasMany(EquipoInformatico); // Un empleado puede tener cero o varios equipos informáticos
  TipoEquipo.hasMany(EquipoInformatico); //un tipo de equipo tiene muchos equipos informáticos
  Lugar.hasMany(Oficina); // Un empleado puede tener cero o varios equipos informáticos
  EquipoInformatico.belongsTo(TipoEquipo); //un equipo informático pertenece a un tipo de equipo
  EquipoInformatico.belongsTo(Empleado, { unique: true }); //un equipo informático pertenece a un empleado
  EquipoInformatico.belongsToMany(Oficina, { through: 'EquipoOficina' }); //un equipo informático puede estar relacionado con una o varias oficinas
  EquipoInformatico.belongsTo(MarcaEquipo); // Un equipo pertenece a una marca
  EquipoInformatico.belongsTo(ModeloEquipo); // Un equipo pertenece a un modelo
  EquipoInformatico.hasMany(MantenimientoDeEquipo); // Un equipo puede tener muchos registros de mantenimiento
  MantenimientoDeEquipo.belongsTo(EquipoInformatico); // Cada registro de mantenimiento pertenece a un equipo
  MarcaEquipo.hasMany(EquipoInformatico); // Una marca puede tener muchos equipos
  ModeloEquipo.hasMany(EquipoInformatico); // Un modelo puede tener muchos equipos
  Oficina.belongsTo(Lugar); // Una oficina pertenece a un lugar (calle 6, calle 3, Juzgado de La Plata...)
  Oficina.hasMany(Empleado); // Una oficina puede tener varios empleados.
  Oficina.belongsToMany(Oficina, { as: 'Dependencias', through: 'OficinaDependencia' }); // Una oficina puede estar relacionada con una o varias oficinas
  Oficina.belongsToMany(EquipoInformatico, { through: 'EquipoOficina' }); // Una oficina puede tener varios equipos informáticos
}

establecerRelaciones();
export { sequelize };