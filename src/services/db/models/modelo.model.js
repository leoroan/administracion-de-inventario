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

const Modelo = sequelize.define('Modelo', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  sitioWeb: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'SIN DEFINIR'
  },
  logoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'no_image.jpg'
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'SIN DEFINIR'
  }
}, {
  timestamps: true,
  paranoid: true,
  hooks: {
    beforeCreate: toUpperCaseFields,
    beforeUpdate: toUpperCaseFields,
  }
});

export { Modelo };
