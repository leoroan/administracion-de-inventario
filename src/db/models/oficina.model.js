import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";
import { oficinaScope } from "../scopes/oficina.scope.js";

const toUpperCaseFields = async (instance) => {
  const fieldsToUpper = ['nombre', 'descripcion', 'email'];

  fieldsToUpper.forEach((field) => {
    if (instance.dataValues[field]) {
      instance.dataValues[field] = instance.dataValues[field].toUpperCase();
    }
  });
};

const Oficina = sequelize.define('Oficina', {
  nombre: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'SIN DESCRIPCION'
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      isEmail: true
    }
  },
}, {
  timestamps: true,
  paranoid: true,
  hooks: {
    beforeCreate: toUpperCaseFields,
    beforeUpdate: toUpperCaseFields,
  },
  defaultScope: oficinaScope.defaultScope
});

export { Oficina };