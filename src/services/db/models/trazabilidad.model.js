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
  },
  dniEmpleado: {
    type: DataTypes.STRING,

    unique: true
  },
  nombreOficina: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.ENUM('ASIGNADO', 'DISPONIBLE', 'BAJA'),
    defaultValue: 'DISPONIBLE'
  }
}, {
  timestamps: true,
  paranoid: true,
  hooks: {
    beforeCreate: toUpperCaseFields,
  },
  defaultScope: trazabilidadScope.defaultScope
});

export { Trazabilidad };
