import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;

import _Usuario from "./usuario.model.js";
import _Rol from "./rol.model.js";
import _Sesion from "./session.model.js";
import _Oficina from "./oficina.model.js";
import _Edificio from "./edificio.model.js";
import _Equipoinformatico from "./equipoinformatico.model.js";
import _Registromantenimiento from "./registromantenimiento.model.js";
import _Trazabilidad from "./trazabilidad.model.js";
import _Modelo from "./modeloEquipo.model.js";
import _Marca from "./marca.model.js";
import _Tipoequipo from "./tipoequipo.model.js";

export default function initModels(sequelize) {
  const Usuario = _Usuario.init(sequelize, DataTypes);
  const Rol = _Rol.init(sequelize, DataTypes);
  const Sesion = _Sesion.init(sequelize, DataTypes);
  const Edificio = _Edificio.init(sequelize, DataTypes);
  const Equipoinformatico = _Equipoinformatico.init(sequelize, DataTypes);
  const Registromantenimiento = _Registromantenimiento.init(sequelize, DataTypes);
  const Trazabilidad = _Trazabilidad.init(sequelize, DataTypes);
  const Modelo = _Modelo.init(sequelize, DataTypes);
  const Marca = _Marca.init(sequelize, DataTypes);
  const Tipoequipo = _Tipoequipo.init(sequelize, DataTypes);
  const Oficina = _Oficina.init(sequelize, DataTypes);

  // Usuario -> Rol
  Rol.hasMany(Usuario, { as: 'usuarios', foreignKey: { name: 'rolId', allowNull: false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' } });
  Usuario.belongsTo(Rol, { as: 'rolPrincipal', foreignKey: { name: 'rolId', allowNull: false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' } });

  // Usuario -> Sesion
  Usuario.hasMany(Sesion, { as: 'sesiones', foreignKey: { name: 'usuarioId', allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' } });
  Sesion.belongsTo(Usuario, { as: 'usuario', foreignKey: { name: 'usuarioId', allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' } });

  // Usuario -> Oficina
  Oficina.hasMany(Usuario, { as: 'empleados', foreignKey: { name: 'oficinaId', allowNull: true, onDelete: 'RESTRICT', onUpdate: 'CASCADE' } });
  Usuario.belongsTo(Oficina, { as: 'oficina', foreignKey: { name: 'oficinaId', allowNull: true, onDelete: 'RESTRICT', onUpdate: 'CASCADE' } });

  // Oficina -> Oficina (jerarquía)
  Oficina.hasMany(Oficina, { as: 'suboficinas', foreignKey: { name: 'oficinaPadreId', allowNull: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' } });
  Oficina.belongsTo(Oficina, { as: 'oficinaPadre', foreignKey: { name: 'oficinaPadreId', allowNull: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' } });

  // Edificio -> Oficina
  Edificio.hasMany(Oficina, { as: 'oficinas', foreignKey: { name: 'edificioId', allowNull: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' } });
  Oficina.belongsTo(Edificio, { as: 'edificio', foreignKey: { name: 'edificioId', allowNull: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' } });

  // Oficina -> Equipoinformatico
  Oficina.hasMany(Equipoinformatico, { as: 'equipos', foreignKey: { name: 'oficinaId', allowNull: true, onDelete: 'RESTRICT', onUpdate: 'CASCADE' } });
  Equipoinformatico.belongsTo(Oficina, { as: 'oficina', foreignKey: { name: 'oficinaId', allowNull: true, onDelete: 'RESTRICT', onUpdate: 'CASCADE' } });

  // Usuario -> Equipoinformatico
  Usuario.hasMany(Equipoinformatico, { as: 'equiposAsignados', foreignKey: { name: 'empleadoId', allowNull: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' } });
  Equipoinformatico.belongsTo(Usuario, { as: 'empleadoAsignado', foreignKey: { name: 'empleadoId', allowNull: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' } });

  // Equipoinformatico -> Registromantenimiento
  Equipoinformatico.hasMany(Registromantenimiento, { as: 'registrosMantenimiento', foreignKey: { name: 'equipoId', allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' } });
  Registromantenimiento.belongsTo(Equipoinformatico, { as: 'equipo', foreignKey: { name: 'equipoId', allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' } });

  // Equipoinformatico -> Trazabilidad
  Equipoinformatico.hasMany(Trazabilidad, { as: 'trazabilidades', foreignKey: { name: 'equipoId', allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' } });
  Trazabilidad.belongsTo(Equipoinformatico, { as: 'equipo', foreignKey: { name: 'equipoId', allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' } });

  // Modelo -> Marca
  Marca.hasMany(Modelo, { as: 'modelos', foreignKey: { name: 'marcaId', allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' } });
  Modelo.belongsTo(Marca, { as: 'marca', foreignKey: { name: 'marcaId', allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' } });

  // Tipoequipo -> Modelo
  Tipoequipo.hasMany(Modelo, { as: 'modelos', foreignKey: { name: 'tipoequipoId', allowNull: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' } });
  Modelo.belongsTo(Tipoequipo, { as: 'tipoequipo', foreignKey: { name: 'tipoequipoId', allowNull: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' } });

  // Tipoequipo -> Equipoinformatico
  Tipoequipo.hasMany(Equipoinformatico, { as: 'equipos', foreignKey: { name: 'tipoequipoId', allowNull: false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' } });
  Equipoinformatico.belongsTo(Tipoequipo, { as: 'tipoequipo', foreignKey: { name: 'tipoequipoId', allowNull: false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' } });

  // Modelo -> Equipoinformatico
  Modelo.hasMany(Equipoinformatico, { as: 'equipos', foreignKey: { name: 'modeloId', allowNull: false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' } });
  Equipoinformatico.belongsTo(Modelo, { as: 'modelo', foreignKey: { name: 'modeloId', allowNull: false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' } });

  return {
    Usuario,
    Rol,
    Sesion,
    Oficina,
    Edificio,
    Equipoinformatico,
    Registromantenimiento,
    Trazabilidad,
    Modelo,
    Marca,
    Tipoequipo,
  };
}