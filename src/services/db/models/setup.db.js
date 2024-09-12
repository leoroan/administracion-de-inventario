import { sequelize } from "../../../config/db/sequelize.config.js";
// import { User } from "../models/user.model.js";
// import { ActaCalibracion } from "./acta.calibracion.model.js";
// import { ActaConstatacion } from "./acta.constatacion.model.js";
// import { ActaInspeccion } from "./acta.inspeccion.model.js";
// import { ActaDestruccionObleas } from "./acta.destruccion.model.js";
// import { OrdenServicio } from "./orden.servicio.model.js";
// import { Matafuegos } from "./matafuegos.model.js"
// import { Oblea } from "./oblea.model.js";
// import { lineaDeInspeccion } from "./lineaDeInspeccion.model.js";
// import { ActaRequerimiento } from "./acta.requerimiento.model.js";
// import { ImagenesActas } from "./imagenActa.model.js"
// import { PlantaVerificadora } from "./plantaVerificadora.model.js";

// const establecerRelaciones = () => {
//   User.hasMany(OrdenServicio)
//   User.hasMany(ActaConstatacion)
//   User.hasMany(ActaInspeccion)
//   User.hasMany(ActaRequerimiento)
//   User.hasMany(ActaCalibracion)
//   User.hasMany(ActaDestruccionObleas)

//   OrdenServicio.belongsTo(User);
//   OrdenServicio.belongsTo(PlantaVerificadora);
//   OrdenServicio.hasOne(ActaInspeccion);
//   OrdenServicio.hasOne(ActaCalibracion);
//   OrdenServicio.hasOne(ActaDestruccionObleas);
//   OrdenServicio.hasOne(ActaRequerimiento);

//   ActaConstatacion.belongsTo(User);
//   ActaConstatacion.belongsTo(PlantaVerificadora);
//   ActaConstatacion.belongsTo(ActaInspeccion);
//   ActaConstatacion.hasMany(ImagenesActas);

//   ActaRequerimiento.belongsTo(User);
//   ActaRequerimiento.belongsTo(PlantaVerificadora);
//   ActaRequerimiento.hasMany(ImagenesActas);
//   ActaRequerimiento.belongsTo(OrdenServicio);

//   ActaInspeccion.belongsTo(User);
//   ActaInspeccion.belongsTo(OrdenServicio);
//   ActaInspeccion.belongsTo(PlantaVerificadora);
//   ActaInspeccion.hasMany(Matafuegos);
//   ActaInspeccion.hasMany(Oblea);
//   ActaInspeccion.hasMany(lineaDeInspeccion);
//   ActaInspeccion.hasMany(ImagenesActas);

//   PlantaVerificadora.hasMany(ActaInspeccion, { onDelete: 'SET NULL' });
//   PlantaVerificadora.hasMany(OrdenServicio, { onDelete: 'SET NULL' });
//   PlantaVerificadora.hasMany(ActaCalibracion, { onDelete: 'SET NULL' });
//   PlantaVerificadora.hasMany(ActaConstatacion, { onDelete: 'SET NULL' });
//   PlantaVerificadora.hasMany(ActaDestruccionObleas, { onDelete: 'SET NULL' });
//   PlantaVerificadora.hasMany(ActaRequerimiento, { onDelete: 'SET NULL' });

//   Matafuegos.belongsTo(ActaInspeccion);
//   Oblea.belongsTo(ActaInspeccion);
//   lineaDeInspeccion.belongsTo(ActaInspeccion);

//   ActaCalibracion.belongsTo(User);
//   ActaCalibracion.belongsTo(PlantaVerificadora);
//   ActaCalibracion.belongsTo(OrdenServicio);
//   ActaCalibracion.hasMany(ImagenesActas);

//   ActaDestruccionObleas.belongsTo(User);
//   ActaDestruccionObleas.belongsTo(OrdenServicio);
//   ActaDestruccionObleas.belongsTo(PlantaVerificadora);
//   ActaDestruccionObleas.hasMany(ImagenesActas);
//   ActaDestruccionObleas.hasMany(Oblea);

//   ImagenesActas.belongsTo(ActaConstatacion);
//   ImagenesActas.belongsTo(ActaRequerimiento);
//   ImagenesActas.belongsTo(ActaInspeccion);
//   ImagenesActas.belongsTo(ActaCalibracion);
//   ImagenesActas.belongsTo(ActaDestruccionObleas);
// }

// establecerRelaciones();
export { sequelize };