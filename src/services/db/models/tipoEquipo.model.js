import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";
import { tipoEquipoScope } from "../scopes/tipoEquipo.scope.js";

const toUpperCaseFields = async (instance) => {
  const fieldsToUpper = ['nombre', 'descripcion'];
  fieldsToUpper.forEach((field) => {
    if (instance.dataValues[field]) {
      instance.dataValues[field] = instance.dataValues[field].toUpperCase();
    }
  });
};

const TipoEquipo = sequelize.define('TipoEquipo', {
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'SIN ESPECIFICAR'
  },
}, {
  tableName: 'tiposDeEquipos',
  timestamps: true,
  paranoid: true,
  hooks: {
    beforeCreate: toUpperCaseFields,
    beforeUpdate: toUpperCaseFields,
  },
  defaultScope: tipoEquipoScope.defaultScope,
});

export { TipoEquipo };
