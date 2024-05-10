import { sequelize } from "../../../config/db/sequelize.config.js";

// import { Empleado } from "./models/Empleado.model.js";
// import { EquipoInformatico } from "./models/EquipoInformatico.model.js";
// import { Lugar } from "./models/Lugar.model.js";
// import { Oficina } from "./models/Oficina.model.js";
// import { TipoEquipo } from "./models/TipoEquipo.model.js";

// al importar los modelos al "setupDB", se crean las tablas en la base de datos
// seguidamente se establecen las relaciones

// const establecerRelaciones = () => {
//   TipoEquipo.hasMany(EquipoInformatico); //un tipo de equipo tiene muchos equipos informáticos
//   Lugar.hasMany(Oficina); // Un empleado puede tener cero o varios equipos informáticos
//   EquipoInformatico.belongsTo(TipoEquipo); //un equipo informático pertenece a un tipo de equipo
//   EquipoInformatico.belongsTo(Empleado, { unique: true }); //un equipo informático pertenece a un empleado
//   EquipoInformatico.belongsToMany(Oficina, { through: 'EquipoOficina' }); //un equipo informático puede estar relacionado con una o varias oficinas
//   Oficina.belongsTo(Lugar); // Una oficina pertenece a un lugar (calle 6, calle 3, Juzgado de La Plata...)
//   Oficina.hasMany(Empleado); // Una oficina puede tener varios empleados.
//   Oficina.belongsToMany(Oficina, { as: 'Dependencias', through: 'OficinaDependencia' }); // Una oficina puede estar relacionada con una o varias oficinas
//   Oficina.belongsToMany(EquipoInformatico, { through: 'EquipoOficina' }); // Una oficina puede tener varios equipos informáticos
//   Empleado.belongsTo(Oficina); //Cada Empleado puede pertenecer a una Oficina
//   Empleado.hasMany(EquipoInformatico); // Un empleado puede tener cero o varios equipos informáticos
// }

// establecerRelaciones();
export { sequelize };