import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";
import { trazabilidadScope } from "../scopes/trazabilidad.scope.js";

const toUpperCaseFields = async (instance) => {
  const fieldsToUpper = ['nombreEmpleado', 'nombreOficina'];

  fieldsToUpper.forEach((field) => {
    if (instance.dataValues[field]) {
      instance.dataValues[field] = instance.dataValues[field].toUpperCase();
    }
  });
};

const Trazabilidad = sequelize.define('Trazabilidad', {
  nombreEmpleado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dniEmpleado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mtEquipo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idEquipo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombreOficina: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  registroDeMantenimientoDeEquipoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'trazabilidades',
  timestamps: true,
  paranoid: true,
  hooks: {
    beforeCreate: toUpperCaseFields,
  },
  defaultScope: trazabilidadScope.defaultScope
});

export { Trazabilidad };
