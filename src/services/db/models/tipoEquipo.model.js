import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";

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
  timestamps: true,
  paranoid: true,
  hooks: {
    beforeCreate: toUpperCaseFields,
    beforeUpdate: toUpperCaseFields,
  }
});

export { TipoEquipo };
