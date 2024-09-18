import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/sequelize.config.js";

const toUpperCaseFields = async (instance) => {
  const fieldsToUpper = ['nombre', 'descripcion', 'email'];
  fieldsToUpper.forEach((field) => {
    if (instance.dataValues[field]) {
      instance.dataValues[field] = instance.dataValues[field].toUpperCase();
    }
  });
};

const Edificio = sequelize.define('Edificio', {
  nombre: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'SIN DIRECCION'
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
  coordenadas: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'SIN COORDENADAS'
  }
}, {
  timestamps: true,
  paranoid: true,
  hooks: {
    beforeCreate: toUpperCaseFields,
    beforeUpdate: toUpperCaseFields,
  }
});

export { Edificio };